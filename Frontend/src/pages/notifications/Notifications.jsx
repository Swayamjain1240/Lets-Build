import {
  Bell,
  CheckCheck,
  RefreshCw,
} from "lucide-react";

import {
  useMemo,
  useState,
} from "react";

import NotificationItem from "../../components/notification/NotificationItem.jsx";
import NotificationSkeleton from "../../components/notification/NotificationSkeleton.jsx";

import useNotifications from "../../hooks/useNotifications.js";

export default function Notifications() {
  const {
    notifications,
    unreadCount,
    loading,
    error,
    refresh,
    markAsRead,
    markAllAsRead,
  } = useNotifications();

  const [actionError, setActionError] =
    useState("");

  const [markingAll, setMarkingAll] =
    useState(false);

  const sortedNotifications =
    useMemo(
      () =>
        [...notifications].sort(
          (a, b) =>
            (new Date(
              b.createdAt
            ).getTime() || 0) -
            (new Date(
              a.createdAt
            ).getTime() || 0)
        ),
      [notifications]
    );

  const handleMarkRead =
    async (notificationId) => {
      try {
        setActionError("");

        await markAsRead(
          notificationId
        );
      } catch (err) {
        setActionError(
          err.response?.data?.message ||
            "Unable to update notification."
        );
      }
    };

  const handleMarkAll =
    async () => {
      if (
        markingAll ||
        unreadCount === 0
      ) {
        return;
      }

      setMarkingAll(true);
      setActionError("");

      try {
        await markAllAsRead();
      } catch (err) {
        setActionError(
          err.response?.data?.message ||
            "Unable to mark notifications as read."
        );
      } finally {
        setMarkingAll(false);
      }
    };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-brand-400">
            <Bell size={18} />

            <p className="text-sm font-medium">
              Activity
            </p>
          </div>

          <h1 className="mt-2 text-3xl font-bold text-heading">
            Notifications
          </h1>

          <p className="mt-3 text-sm text-muted">
            {unreadCount > 0
              ? `${unreadCount} unread notification${unreadCount === 1 ? "" : "s"}.`
              : "You're all caught up."}
          </p>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={refresh}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-medium text-heading hover:bg-surface disabled:opacity-50"
          >
            <RefreshCw size={16} />
            Refresh
          </button>

          <button
            type="button"
            onClick={handleMarkAll}
            disabled={
              markingAll ||
              unreadCount === 0
            }
            className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-medium text-white disabled:opacity-50"
          >
            <CheckCheck size={16} />

            {markingAll
              ? "Updating..."
              : "Mark all read"}
          </button>
        </div>
      </header>

      {actionError && (
        <div
          role="alert"
          className="rounded-xl border border-red-500/20 bg-red-500/5 p-3 text-sm text-red-400"
        >
          {actionError}
        </div>
      )}

      {loading ? (
        <NotificationSkeleton
          items={6}
        />
      ) : error ? (
        <div className="rounded-2xl border border-border bg-surface p-10 text-center">
          <h2 className="font-semibold text-heading">
            Unable to load notifications
          </h2>

          <p className="mt-2 text-sm text-muted">
            {error}
          </p>

          <button
            type="button"
            onClick={refresh}
            className="mt-5 rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-medium text-white"
          >
            Try again
          </button>
        </div>
      ) : sortedNotifications.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-surface/50 p-10 text-center">
          <Bell
            size={30}
            className="mx-auto text-muted"
          />

          <h2 className="mt-4 font-semibold text-heading">
            No notifications
          </h2>

          <p className="mt-2 text-sm text-muted">
            Collaboration activity will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {sortedNotifications.map(
            (notification) => (
              <NotificationItem
                key={
                  notification._id
                }
                notification={
                  notification
                }
                onRead={
                  handleMarkRead
                }
              />
            )
          )}
        </div>
      )}
    </div>
  );
}