import api from "./api.js";

const COMMUNICATION_URL = "/communication";

export const getConversations = async (
  config = {}
) => {
  const response = await api.get(
    `${COMMUNICATION_URL}/conversations`,
    config
  );

  return response.data;
};

export const getConversationById = async (
  conversationId,
  config = {}
) => {
  const response = await api.get(
    `${COMMUNICATION_URL}/conversations/${conversationId}`,
    config
  );

  return response.data;
};

export const createConversation = async (
  conversationData
) => {
  const response = await api.post(
    `${COMMUNICATION_URL}/conversations`,
    conversationData
  );

  return response.data;
};

export const getMessages = async (
  conversationId,
  config = {}
) => {
  const response = await api.get(
    `${COMMUNICATION_URL}/conversations/${conversationId}/messages`,
    config
  );

  return response.data;
};

export const sendMessage = async (
  conversationId,
  content
) => {
  const response = await api.post(
    `${COMMUNICATION_URL}/conversations/${conversationId}/messages`,
    {
      content: content.trim(),
    }
  );

  return response.data;
};