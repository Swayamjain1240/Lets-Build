import api from "./api.js";

const RECOMMENDATIONS_URL =
  "/recommendations";

export const getDeveloperRecommendations =
  async (projectId, config = {}) => {
    const response = await api.get(
      `${RECOMMENDATIONS_URL}/developers/${projectId}`,
      config
    );

    return response.data;
  };

export const getOpportunityRecommendations =
  async (config = {}) => {
    const response = await api.get(
      `${RECOMMENDATIONS_URL}/opportunities`,
      config
    );

    return response.data;
  };