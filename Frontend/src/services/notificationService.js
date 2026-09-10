import api from "./api.js";

const NOTIFICATIONS_URL = "/notifications";

export const getNotifications = async (
  config = {}
) => {
  const response = await api.get(
    NOTIFICATIONS_URL,
    config
  );

  return response.data;
};

export const markNotificationAsRead = async (notificationId) => {
    const response = await api.put(
      `${NOTIFICATIONS_URL}/${notificationId}/read`
    );

    return response.data;
};

export const markAllNotificationsAsRead = async () => {
    const response = await api.put(
      `${NOTIFICATIONS_URL}/read-all`
    );

    return response.data;
};