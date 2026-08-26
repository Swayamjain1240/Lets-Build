import * as recruitmentService from "../services/recruitmentService.js"

export const createRecruitment = async (req, res, next) => {
  try {
    const { projectId, title, publicSummary } = req.body;
    if (!projectId || !title || !publicSummary) {
      res.status(400);
      throw new Error('Please provide projectId, title, and publicSummary');
    }

    const recruitment = await recruitmentService.createRecruitmentPost(
      req.user._id,
      req.body
    );

    res.status(201).json({
      success: true,
      message: 'Recruitment post created successfully',
      data: recruitment,
    });
  } catch (error) {
    next(error);
  }
};

export const getRecruitments = async (req, res, next) => {
  try {
    const recruitments = await recruitmentService.getPublicRecruitments(req.query);

    res.status(200).json({
      success: true,
      count: recruitments.length,
      data: recruitments,
    });
  } catch (error) {
    next(error);
  }
};