import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import useAuth from "../hooks/useAuth.js";

import {
  getNotifications,
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from "../services/notificationService.js";

import {
  connectSocket,
  disconnectSocket,
} from "../services/socketService.js";

export const NotificationContext =
  createContext(null);

const extractNotifications = (
  response
) => {
  if (
    Array.isArray(response?.data)
  ) {
    return response.data;
  }

  if (
    Array.isArray(
      response?.data?.notifications
    )
  ) {
    return response.data.notifications;
  }

  return [];
};

export default function NotificationProvider({
  children,
}) {
  const { user } = useAuth();

  const [
    notifications,
    setNotifications,
  ] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const refresh =
    useCallback(async () => {
      setLoading(true);
      setError("");

      try {
        const response =
          await getNotifications();

        setNotifications(
          extractNotifications(
            response
          )
        );
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Unable to load notifications."
        );
      } finally {
        setLoading(false);
      }
    }, []);

  useEffect(() => {
    if (!user) {
      setNotifications([]);
      setLoading(false);
      return;
    }

    refresh();
  }, [user, refresh]);

  useEffect(() => {
    if (!user) return;

    const token =
      localStorage.getItem("token");

    if (!token) return;

    const socket =
      connectSocket(token);

    if (!socket) return;

    const handleNotification = (
      notification
    ) => {
      if (!notification?._id) {
        return;
      }

      setNotifications(
        (previous) => {
          const exists =
            previous.some(
              (item) =>
                item._id ===
                notification._id
            );

          if (exists) {
            return previous;
          }

          return [
            notification,
            ...previous,
          ];
        }
      );
    };

    socket.on(
      "notification",
      handleNotification
    );

    return () => {
      socket.off(
        "notification",
        handleNotification
      );

      disconnectSocket();
    };
  }, [user]);

  const unreadCount =
    useMemo(
      () =>
        notifications.filter(
          (notification) =>
            !notification.isRead
        ).length,
      [notifications]
    );

  const markAsRead =
    async (notificationId) => {
      if (!notificationId) return;

      await markNotificationAsRead(
        notificationId
      );

      setNotifications(
        (previous) =>
          previous.map(
            (notification) =>
              notification._id ===
              notificationId
                ? {
                    ...notification,
                    isRead: true,
                  }
                : notification
          )
      );
    };

  const markAllAsRead =
    async () => {
      if (unreadCount === 0) {
        return;
      }

      await markAllNotificationsAsRead();

      setNotifications(
        (previous) =>
          previous.map(
            (notification) => ({
              ...notification,
              isRead: true,
            })
          )
      );
    };

  const value = {
    notifications,
    unreadCount,
    loading,
    error,
    refresh,
    markAsRead,
    markAllAsRead,
  };

  return (
    <NotificationContext.Provider
      value={value}
    >
      {children}
    </NotificationContext.Provider>
  );
}