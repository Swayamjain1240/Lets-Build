import {
  formatChatTime,
  getEntityId,
} from "../../utils/chatUtils.js";

export default function MessageBubble({
  message,
  currentUserId,
}) {
  if (!message) {
    return null;
  }

  const senderId =
    getEntityId(
      message.sender
    );

  const isMine =
    senderId ===
    getEntityId(
      currentUserId
    );

  const sender =
    typeof message.sender ===
    "object"
      ? message.sender
      : null;

  return (
    <div
      className={`flex ${
        isMine
          ? "justify-end"
          : "justify-start"
      }`}
    >
      <div
        className={`
          max-w-[80%]
          rounded-2xl px-4 py-3
          sm:max-w-[70%]
          ${
            isMine
              ? "rounded-br-md bg-brand-500 text-white"
              : "rounded-bl-md border border-border bg-surface text-heading"
          }
        `}
      >
        {!isMine &&
          sender?.name && (
            <p className="mb-1 text-xs font-medium text-brand-400">
              {sender.name}
            </p>
          )}

        <p className="whitespace-pre-wrap wrap-break-word text-sm leading-6">
          {message.content}
        </p>

        <p
          className={`
            mt-1 text-right text-[10px]
            ${
              isMine
                ? "text-white/70"
                : "text-muted"
            }
          `}
        >
          {formatChatTime(
            message.createdAt
          )}
        </p>
      </div>
    </div>
  );
}