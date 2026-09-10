import {
  MessageCircle,
  RefreshCw,
} from "lucide-react";

import MessageBubble from "./MessageBubble.jsx";
import ChatSkeleton from "./ChatSkeleton.jsx";

export default function MessageList({
  messages = [],
  loading = false,
  error = "",
  currentUserId,
  onRetry,
}) {
  if (loading) {
    return (
      <ChatSkeleton />
    );
  }

  if (error) {
    return (
      <div className="flex h-full min-h-80 flex-col items-center justify-center p-6 text-center">
        <p className="text-sm text-muted">
          {error}
        </p>

        <button
          type="button"
          onClick={onRetry}
          className="mt-4 inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm font-medium text-heading hover:bg-surface-soft"
        >
          <RefreshCw size={15} />
          Try again
        </button>
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="flex h-full min-h-80 flex-col items-center justify-center p-6 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-surface">
          <MessageCircle
            size={22}
            className="text-brand-400"
          />
        </div>

        <h3 className="mt-4 font-semibold text-heading">
          Start the conversation
        </h3>

        <p className="mt-2 max-w-sm text-sm leading-6 text-muted">
          Send the first message and
          start collaborating.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 px-4 py-5 sm:px-5">
      {messages.map(
        (message) => (
          <MessageBubble
            key={message._id}
            message={message}
            currentUserId={
              currentUserId
            }
          />
        )
      )}
    </div>
  );
}