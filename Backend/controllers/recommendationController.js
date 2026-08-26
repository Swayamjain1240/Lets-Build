import * as recommendationService from "../services/recommendationService.js"

export const getProjectRecommendations = async (req, res, next) => {
  try {
    const recommendations = await recommendationService.getRecommendedProjectsForUser(
      req.user._id
    );

    res.status(200).json({
      success: true,
      count: recommendations.length,
      data: recommendations,
    });
  } catch (error) {
    next(error);
  }
};

export const getDeveloperRecommendations = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const recommendations = await recommendationService.getRecommendedDevelopersForProject(
      projectId,
      req.user._id
    );

    res.status(200).json({
      success: true,
      count: recommendations.length,
      data: recommendations,
    });
  } catch (error) {
    next(error);
  }
};