import {
  ArrowUpRight,
  Mail,
  Send,
} from "lucide-react";

import {
  Link,
} from "react-router-dom";

import Avatar from "../user/Avatar.jsx";
import RequestStatusBadge from "./RequestStatusBadge.jsx";

const getPerson = (
  request,
  mode
) => {
  return mode === "sent"
    ? request.receiver
    : request.sender;
};

const getTypeLabel = (
  type
) => {
  const normalized =
    String(type || "")
      .toUpperCase();

  if (
    normalized ===
    "JOIN_REQUEST"
  ) {
    return "Join Request";
  }

  if (
    normalized ===
    "INVITATION"
  ) {
    return "Project Invitation";
  }

  return "Request";
};

export default function RequestCard({
  request,
  mode = "received",
  children,
}) {
  if (!request) return null;

  const person =
    getPerson(request, mode);

  const project =
    typeof request.project ===
    "object"
      ? request.project
      : null;

  const Icon =
    mode === "sent"
      ? Send
      : Mail;

  return (
    <article className="rounded-2xl border border-border bg-surface p-5">
      <div className="flex items-start gap-4">
        <Avatar
          src={
            person?.profilePicture
          }
          name={
            person?.name ||
            "Developer"
          }
          size="md"
        />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-semibold text-heading">
              {person?.name ||
                "Developer"}
            </p>

            <RequestStatusBadge
              status={request.status}
            />
          </div>

          <div className="mt-2 flex items-center gap-2 text-xs text-muted">
            <Icon size={14} />

            {getTypeLabel(
              request.type
            )}
          </div>
        </div>
      </div>

      {project?.title && (
        <div className="mt-5 rounded-xl border border-border-soft bg-background/40 p-3">
          <p className="text-xs text-muted">
            Project
          </p>

          <p className="mt-1 text-sm font-medium text-heading">
            {project.title}
          </p>
        </div>
      )}

      {request.message && (
        <div className="mt-4">
          <p className="text-xs font-medium text-muted">
            Message
          </p>

          <p className="mt-2 whitespace-pre-line text-sm leading-6 text-muted">
            {request.message}
          </p>
        </div>
      )}

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border-soft pt-4">
        {person?._id ? (
          <Link
            to={`/developers/${person._id}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-heading"
          >
            View profile
            <ArrowUpRight size={15} />
          </Link>
        ) : (
          <span />
        )}

        {children}
      </div>
    </article>
  );
}