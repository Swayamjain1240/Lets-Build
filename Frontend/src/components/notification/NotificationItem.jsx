import {
  Bell,
  CheckCircle2,
  UserPlus,
  XCircle,
} from "lucide-react";

import Avatar from "../user/Avatar.jsx";

const getNotificationMeta = (
  type
) => {
  switch (type) {
    case "JOIN_REQUEST":
      return {
        Icon: UserPlus,
        text: "requested to join your project",
      };

    case "INVITATION":
      return {
        Icon: UserPlus,
        text: "invited you to a project",
      };

    case "REQUEST_ACCEPTED":
    case "INVITATION_ACCEPTED":
      return {
        Icon: CheckCircle2,
        text: "accepted your request",
      };

    case "REQUEST_REJECTED":
    case "INVITATION_REJECTED":
      return {
        Icon: XCircle,
        text: "rejected your request",
      };

    default:
      return {
        Icon: Bell,
        text: "sent you a notification",
      };
  }
};

const formatDate = (value) => {
  if (!value) return "";

  const date = new Date(value);

  if (
    Number.isNaN(date.getTime())
  ) {
    return "";
  }

  return date.toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );
};

export default function NotificationItem({
  notification,
  onRead,
}) {
  if (!notification) {
    return null;
  }

  const sender =
    notification.sender;

  const project =
    typeof notification.project ===
    "object"
      ? notification.project
      : null;

  const { Icon, text } =
    getNotificationMeta(
      notification.type
    );

  return (
    <button
      type="button"
      onClick={() =>
        !notification.isRead &&
        onRead?.(notification._id)
      }
      className={`
        flex w-full gap-4 rounded-xl
        border p-4 text-left
        transition-colors
        ${
          notification.isRead
            ? "border-border bg-surface"
            : "border-brand-500/20 bg-brand-500/5"
        }
      `}
    >
      <Avatar
        src={
          sender?.profilePicture
        }
        name={
          sender?.name ||
          "Developer"
        }
        size="sm"
      />

      <div className="min-w-0 flex-1">
        <div className="flex gap-2">
          <Icon
            size={16}
            className="mt-0.5 shrink-0 text-brand-400"
          />

          <p className="text-sm leading-6 text-muted">
            <span className="font-medium text-heading">
              {sender?.name ||
                "Someone"}
            </span>{" "}
            {text}
          </p>
        </div>

        {project?.title && (
          <p className="mt-1 truncate text-xs text-muted">
            {project.title}
          </p>
        )}

        <p className="mt-2 text-xs text-muted">
          {formatDate(
            notification.createdAt
          )}
        </p>
      </div>

      {!notification.isRead && (
        <span
          aria-label="Unread"
          className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-500"
        />
      )}
    </button>
  );
}