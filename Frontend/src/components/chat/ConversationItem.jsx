import {
  MessageCircle,
} from "lucide-react";

import {
  Link,
} from "react-router-dom";

import Avatar from "../user/Avatar.jsx";

import {
  formatConversationDate,
  getOtherParticipant,
} from "../../utils/chatUtils.js";

export default function ConversationItem({
  conversation,
  currentUserId,
  active = false,
}) {
  if (!conversation?._id) {
    return null;
  }

  const otherUser =
    getOtherParticipant(
      conversation,
      currentUserId
    );

  const lastMessage =
    typeof conversation.lastMessage ===
    "object"
      ? conversation.lastMessage
      : null;

  const project =
    typeof conversation.project ===
    "object"
      ? conversation.project
      : null;

  const timestamp =
    lastMessage?.createdAt ||
    conversation.updatedAt;

  return (
    <Link
      to={`/messages/${conversation._id}`}
      className={`
        block rounded-xl border
        p-4 transition-colors
        ${
          active
            ? "border-brand-500/30 bg-brand-500/5"
            : "border-transparent hover:border-border hover:bg-surface"
        }
      `}
    >
      <div className="flex items-start gap-3">
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

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="truncate text-sm font-semibold text-heading">
              {otherUser?.name ||
                "Developer"}
            </h3>

            <span className="shrink-0 text-[11px] text-muted">
              {formatConversationDate(
                timestamp
              )}
            </span>
          </div>

          <p className="mt-1 truncate text-xs text-muted">
            {lastMessage?.content ||
              "Start a conversation"}
          </p>

          {project?.title && (
            <div className="mt-2 flex items-center gap-1.5">
              <MessageCircle
                size={12}
                className="text-brand-400"
              />

              <span className="truncate text-[11px] text-muted">
                {project.title}
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}