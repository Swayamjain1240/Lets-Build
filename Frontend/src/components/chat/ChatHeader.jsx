import {
  ArrowLeft,
  UserRound,
} from "lucide-react";

import {
  Link,
} from "react-router-dom";

import Avatar from "../user/Avatar.jsx";

import {
  getOtherParticipant,
} from "../../utils/chatUtils.js";

export default function ChatHeader({
  conversation,
  currentUserId,
  connected = false,
}) {
  const otherUser =
    getOtherParticipant(
      conversation,
      currentUserId
    );

  const project =
    typeof conversation?.project ===
    "object"
      ? conversation.project
      : null;

  return (
    <header className="flex min-h-18 items-center justify-between gap-4 border-b border-border px-4 py-3 sm:px-5">
      <div className="flex min-w-0 items-center gap-3">
        <Link
          to="/messages"
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted hover:bg-surface-soft hover:text-heading lg:hidden"
          aria-label="Back to conversations"
        >
          <ArrowLeft size={18} />
        </Link>

        <Avatar
          src={
            otherUser?.profilePicture
          }
          name={
            otherUser?.name ||
            "Developer"
          }
          size="md"
        />

        <div className="min-w-0">
          <h2 className="truncate font-semibold text-heading">
            {otherUser?.name ||
              "Developer"}
          </h2>

          <div className="mt-0.5 flex items-center gap-2">
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                connected
                  ? "bg-emerald-400"
                  : "bg-amber-400"
              }`}
            />

            <p className="truncate text-xs text-muted">
              {connected
                ? "Realtime connected"
                : "Reconnecting..."}
            </p>
          </div>

          {project?.title && (
            <p className="mt-0.5 truncate text-[11px] text-muted">
              {project.title}
            </p>
          )}
        </div>
      </div>

      {otherUser?._id && (
        <Link
          to={`/developers/${otherUser._id}`}
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border text-muted hover:bg-surface-soft hover:text-heading"
          aria-label="View developer profile"
        >
          <UserRound size={17} />
        </Link>
      )}
    </header>
  );
}