import * as requestService from "../services/requestService.js"

export const createRequest = async (req, res, next) => {
  try {
    const { projectId, receiverId, type } = req.body;
    if (!projectId || !receiverId || !type) {
      res.status(400);
      throw new Error('Please provide projectId, receiverId, and request type');
    }

    const request = await requestService.createRequest(req.user._id, req.body);

    res.status(201).json({
      success: true,
      message: 'Request/Invitation sent successfully',
      data: request,
    });
  } catch (error) {
    next(error);
  }
};

export const respondToRequest = async (req, res, next) => {
  try {
    const { status } = req.body;
    const updated = await requestService.respondToRequest(
      req.user._id,
      req.params.id,
      status
    );

    res.status(200).json({
      success: true,
      message: `Request status updated to ${status}`,
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

export const getMyRequests = async (req, res, next) => {
  try {
    const requests = await requestService.getUserRequests(req.user._id);

    res.status(200).json({
      success: true,
      count: requests.length,
      data: requests,
    });
  } catch (error) {
    next(error);
  }
};