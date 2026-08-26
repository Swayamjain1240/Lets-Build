import Request from "../model/requestModel.js"
import Project from "../model/projectModel.js"
import Notification from "../model/notificationModel.js"

export const createRequest = async (senderId, requestData) => {
    const { projectId, receiverId, type, message } = requestData;

    const project = await Project.findById(projectId);
    if (!project) {
        const error = new Error('Project not found');
        error.statusCode = 404;
        throw error;
    }


    const isAlreadyMember = project.teamMembers.some(
        (member) => member.user.toString() === (type === 'JOIN_REQUEST' ? senderId : receiverId).toString()
    );

    if (isAlreadyMember) {
        const error = new Error('User is already a team member of this project');
        error.statusCode = 400;
        throw error;
    }


    const existingRequest = await Request.findOne({
        project: projectId,
        sender: senderId,
        receiver: receiverId,
        status: 'PENDING',
    });

    if (existingRequest) {
        const error = new Error('A pending request/invitation already exists');
        error.statusCode = 400;
        throw error;
    }

    const newRequest = await Request.create({
        project: projectId,
        sender: senderId,
        receiver: receiverId,
        type,
        message,
        status: 'PENDING',
    });


    await Notification.create({
        recipient: receiverId,
        sender: senderId,
        type: type === 'JOIN_REQUEST' ? 'JOIN_REQUEST_RECEIVED' : 'INVITATION_RECEIVED',
        project: projectId,
        request: newRequest._id,
    });

    return await Request.findById(newRequest._id)
        .populate('sender', 'name email profilePicture')
        .populate('receiver', 'name email profilePicture')
        .populate('project', 'title owner');
};

export const respondToRequest = async (userId, requestId, status) => {
  if (!['ACCEPTED', 'REJECTED'].includes(status)) {
    const error = new Error('Status must be ACCEPTED or REJECTED');
    error.statusCode = 400;
    throw error;
  }

  const request = await Request.findById(requestId).populate('project');
  if (!request) {
    const error = new Error('Request not found');
    error.statusCode = 404;
    throw error;
  }

  if (request.receiver.toString() !== userId.toString()) {
    const error = new Error('Not authorized to respond to this request');
    error.statusCode = 403;
    throw error;
  }

  if (request.status !== 'PENDING') {
    const error = new Error(`Request has already been ${request.status.toLowerCase()}`);
    error.statusCode = 400;
    throw error;
  }

  request.status = status;
  await request.save();

  if (status === 'ACCEPTED') {
    const memberToAdd = request.type === 'JOIN_REQUEST' ? request.sender : request.receiver;
    
    await Project.findByIdAndUpdate(request.project._id, {
      $addToSet: {
        teamMembers: { user: memberToAdd, role: 'Collaborator', joinedAt: new Date() },
      },
    });
  }


  await Notification.create({
    recipient: request.sender,
    sender: userId,
    type: status === 'ACCEPTED' ? 'REQUEST_ACCEPTED' : 'REQUEST_REJECTED',
    project: request.project._id,
    request: request._id,
  });

  return request;
};

export const getUserRequests = async (userId) => {
  return await Request.find({
    $or: [{ sender: userId }, { receiver: userId }],
  })
    .populate('sender', 'name email profilePicture skills')
    .populate('receiver', 'name email profilePicture skills')
    .populate('project', 'title status owner')
    .sort({ createdAt: -1 });
};