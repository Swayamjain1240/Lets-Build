import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  getNotifications,
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from "../services/notificationService.js";

const extractNotifications = (
  response
) => {
  if (Array.isArray(response?.data)) {
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

export default function useNotifications() {
  const [
    notifications,
    setNotifications,
  ] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const requestRef =
    useRef(null);

  const refresh =
    useCallback(async () => {
      requestRef.current?.abort();

      const controller =
        new AbortController();

      requestRef.current =
        controller;

      setLoading(true);
      setError("");

      try {
        const response =
          await getNotifications({
            signal:
              controller.signal,
          });

        if (
          controller.signal.aborted
        ) {
          return;
        }

        setNotifications(
          extractNotifications(
            response
          )
        );
      } catch (err) {
        if (
          controller.signal.aborted
        ) {
          return;
        }

        setError(
          err.response?.data?.message ||
            "Unable to load notifications."
        );
      } finally {
        if (
          !controller.signal.aborted
        ) {
          setLoading(false);
        }
      }
    }, []);

  useEffect(() => {
    refresh();

    return () => {
      requestRef.current?.abort();
    };
  }, [refresh]);

  const unreadCount = useMemo(
    () =>
      notifications.filter(
        (notification) =>
          !notification.isRead
      ).length,
    [notifications]
  );

  const markAsRead =
    async (notificationId) => {
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

  return {
    notifications,
    unreadCount,
    loading,
    error,
    refresh,
    markAsRead,
    markAllAsRead,
  };
}