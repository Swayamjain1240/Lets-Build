import {
  ArrowLeft,
  MessageCircle,
} from "lucide-react";

import {
  Link,
} from "react-router-dom";

import Avatar from "../user/Avatar.jsx";

import {
  getOtherParticipant,
} from "../../utils/chatUtils.js";

export default function ConversationPreview({
  conversation,
  currentUserId,
}) {
  if (!conversation) {
    return null;
  }

  const otherUser =
    getOtherParticipant(
      conversation,
      currentUserId
    );

  const project =
    typeof conversation.project ===
    "object"
      ? conversation.project
      : null;

  return (
    <div className="flex h-full min-h-125 flex-col">
      <header className="flex items-center gap-3 border-b border-border px-5 py-4">
        <Link
          to="/messages"
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted hover:bg-surface-soft hover:text-heading lg:hidden"
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

          {project?.title && (
            <p className="truncate text-xs text-muted">
              {project.title}
            </p>
          )}
        </div>
      </header>

      <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-surface-soft">
          <MessageCircle
            size={24}
            className="text-brand-400"
          />
        </div>

        <h3 className="mt-5 font-semibold text-heading">
          Conversation ready
        </h3>

        <p className="mt-2 max-w-sm text-sm leading-6 text-muted">
          You can now communicate with{" "}
          {otherUser?.name ||
            "this developer"}.
          Realtime chat messages will be
          connected in the next part.
        </p>
      </div>
    </div>
  );
}