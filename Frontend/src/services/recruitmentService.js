import api from "./api.js";

const RECRUITMENTS_URL = "/recruitments";

export const getRecruitments = async (config = {}) => {
  const response = await api.get(
    RECRUITMENTS_URL,
    config
  );

  return response.data;
};

export const getRecruitmentById = async (
  recruitmentId
) => {
  const response = await api.get(
    `${RECRUITMENTS_URL}/${recruitmentId}`
  );

  return response.data;
};

export const createRecruitment = async (
  recruitmentData
) => {
  const response = await api.post(
    RECRUITMENTS_URL,
    recruitmentData
  );

  return response.data;
};

export const updateRecruitment = async (
  recruitmentId,
  recruitmentData
) => {
  const response = await api.put(
    `${RECRUITMENTS_URL}/${recruitmentId}`,
    recruitmentData
  );

  return response.data;
};

export const deleteRecruitment = async (
  recruitmentId
) => {
  const response = await api.delete(
    `${RECRUITMENTS_URL}/${recruitmentId}`
  );

  return response.data;
};