import api from "./api.js"

const REQUESTS_URL = "/requests";

export const getReceivedRequests = async (
  config = {}
) => {
  const response = await api.get(
    `${REQUESTS_URL}/received`,
    config
  );

  return response.data;
};

export const getSentRequests = async (
  config = {}
) => {
  const response = await api.get(
    `${REQUESTS_URL}/sent`,
    config
  );

  return response.data;
};

export const createRequest = async (
  requestData
) => {
  const response = await api.post(
    REQUESTS_URL,
    requestData
  );

  return response.data;
};

export const acceptRequest = async (
  requestId
) => {
  const response = await api.put(
    `${REQUESTS_URL}/${requestId}/accept`
  );

  return response.data;
};

export const rejectRequest = async (
  requestId
) => {
  const response = await api.put(
    `${REQUESTS_URL}/${requestId}/reject`
  );

  return response.data;
};