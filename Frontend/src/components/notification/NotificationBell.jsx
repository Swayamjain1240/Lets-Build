import {
  Bell,
} from "lucide-react";

import {
  Link,
} from "react-router-dom";

import useNotifications from "../../hooks/useNotifications.js";

export default function NotificationBell() {
  const {
    unreadCount,
  } = useNotifications();

  const badge =
    unreadCount > 99
      ? "99+"
      : unreadCount;

  return (
    <Link
      to="/notifications"
      aria-label={
        unreadCount > 0
          ? `${unreadCount} unread notifications`
          : "Notifications"
      }
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border text-muted transition-colors hover:bg-surface hover:text-heading"
    >
      <Bell size={19} />

      {unreadCount > 0 && (
        <span className="absolute -right-1.5 -top-1.5 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-brand-500 px-1 text-[10px] font-semibold text-white">
          {badge}
        </span>
      )}
    </Link>
  );
}