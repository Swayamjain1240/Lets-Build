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
} from "../services/socketService.js";

export const NotificationContext =
    createContext(null);

const extractNotifications = (response) => {
    if (Array.isArray(response)) {
        return response;
    }

    if (Array.isArray(response?.data)) {
        return response.data;
    }

    if (
        Array.isArray(
            response?.data?.data
        )
    ) {
        return response.data.data;
    }

    if (
        Array.isArray(
            response?.notifications
        )
    ) {
        return response.notifications;
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

    const userId = user?._id || "";

    const [
        notifications,
        setNotifications,
    ] = useState([]);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const refresh = useCallback(
        async () => {
            if (!userId) {
                setNotifications([]);
                return;
            }

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
                    err.response?.data
                        ?.message ||
                        "Unable to load notifications."
                );
            } finally {
                setLoading(false);
            }
        },
        [userId]
    );

    useEffect(() => {
        if (!userId) {
            setNotifications([]);
            setLoading(false);
            return;
        }

        refresh();
    }, [userId, refresh]);

    useEffect(() => {
        if (!userId) {
            return;
        }

        const token =
            localStorage.getItem(
                "token"
            );

        if (!token) {
            return;
        }

        const socket =
            connectSocket(token);

        if (!socket) {
            return;
        }

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

            // IMPORTANT:
            // Do NOT disconnect shared socket here.
        };
    }, [userId]);

    const unreadCount = useMemo(
        () =>
            notifications.filter(
                (notification) =>
                    !notification.isRead
            ).length,
        [notifications]
    );

    const markAsRead = async (
        notificationId
    ) => {
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
            if (
                unreadCount === 0
            ) {
                return;
            }

            await markAllNotificationsAsRead();

            setNotifications(
                (previous) =>
                    previous.map(
                        (
                            notification
                        ) => ({
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