import {
  Bell,
  CheckCircle2,
  ExternalLink,
  UserPlus,
  XCircle,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import Avatar from "../user/Avatar.jsx";

const getMeta = (type) => {
  const value =
    String(type || "")
      .toUpperCase();

  switch (value) {
    case "JOIN_REQUEST":
      return {
        Icon: UserPlus,
        text:
          "requested to join your project",
      };

    case "INVITATION":
      return {
        Icon: UserPlus,
        text:
          "invited you to a project",
      };

    case "REQUEST_ACCEPTED":
    case "INVITATION_ACCEPTED":
      return {
        Icon: CheckCircle2,
        text:
          "accepted your request",
      };

    case "REQUEST_REJECTED":
    case "INVITATION_REJECTED":
      return {
        Icon: XCircle,
        text:
          "rejected your request",
      };

    default:
      return {
        Icon: Bell,
        text:
          "sent you a notification",
      };
  }
};

const formatDate = (value) => {
  if (!value) return "";

  const date =
    new Date(value);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return "";
  }

  return date.toLocaleString(
    "en-IN",
    {
      day: "numeric",
      month: "short",
      hour: "numeric",
      minute: "2-digit",
    }
  );
};

export default function NotificationItem({
  notification,
  onRead,
}) {
  const navigate =
    useNavigate();

  if (!notification) {
    return null;
  }

  const sender =
    typeof notification.sender ===
    "object"
      ? notification.sender
      : null;

  const project =
    typeof notification.project ===
    "object"
      ? notification.project
      : null;

  const { Icon, text } =
    getMeta(notification.type);

  const handleOpen =
    async () => {
      try {
        if (
          !notification.isRead
        ) {
          await onRead?.(
            notification._id
          );
        }
      } catch {
        // Opening should still work
      }

      if (notification.request) {
        navigate("/requests");
        return;
      }

      if (project?._id) {
        navigate(
          `/projects/${project._id}`
        );
      }
    };

  return (
    <article
      className={`
        rounded-xl border p-4
        transition-colors
        ${
          notification.isRead
            ? "border-border bg-surface"
            : "border-brand-500/20 bg-brand-500/5"
        }
      `}
    >
      <div className="flex gap-4">
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
              className="mt-1 shrink-0 text-brand-400"
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
      </div>

      <div className="mt-3 flex justify-end border-t border-border-soft pt-3">
        <button
          type="button"
          onClick={handleOpen}
          className="inline-flex items-center gap-2 text-xs font-medium text-heading"
        >
          View
          <ExternalLink size={13} />
        </button>
      </div>
    </article>
  );
}