import Recruitment from "../model/recruitmentModel.js"
import Project from "../model/projectModel.js"

export const createRecruitmentPost = async (userId, postData) => {
  const { projectId, title, publicSummary } = postData;

  const project = await Project.findById(projectId);
  if (!project) {
    const error = new Error('Project not found');
    error.statusCode = 404;
    throw error;
  }

  if (project.owner.toString() !== userId.toString()) {
    const error = new Error('Only project owners can post recruitment listings');
    error.statusCode = 403;
    throw error;
  }

  const recruitment = await Recruitment.create({
    project: projectId,
    title,
    publicSummary,
    requiredSkills: project.requiredSkills,
  });

  return await Recruitment.findById(recruitment._id)
    .populate('project', 'title status owner')
    .populate('requiredSkills', 'name displayName ');
};

export const getPublicRecruitments = async (query = {}) => {
  const filter = { isOpen: true };

  return await Recruitment.find(filter)
    .populate({
      path: 'project',
      select: 'status owner',
      populate: { path: 'owner', select: 'name profilePicture' },
    })
    .populate('requiredSkills', 'name displayName ')
    .sort({ createdAt: -1 });
};