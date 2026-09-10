import {
  RefreshCw,
} from "lucide-react";

import ConversationItem from "./ConversationItem.jsx";
import ConversationSkeleton from "./ConversationSkeleton.jsx";
import ConversationEmptyState from "./ConversationEmptyState.jsx";

export default function ConversationList({
  conversations = [],
  loading = false,
  error = "",
  currentUserId,
  activeConversationId = "",
  onRetry,
}) {
  if (loading) {
    return (
      <ConversationSkeleton
        items={6}
      />
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <p className="text-sm text-muted">
          {error}
        </p>

        <button
          type="button"
          onClick={onRetry}
          className="mx-auto mt-4 inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm font-medium text-heading hover:bg-surface"
        >
          <RefreshCw size={15} />
          Try again
        </button>
      </div>
    );
  }

  if (conversations.length === 0) {
    return (
      <ConversationEmptyState
        type="list"
      />
    );
  }

  return (
    <div className="space-y-1 p-2">
      {conversations.map(
        (conversation) => (
          <ConversationItem
            key={conversation._id}
            conversation={
              conversation
            }
            currentUserId={
              currentUserId
            }
            active={
              conversation._id ===
              activeConversationId
            }
          />
        )
      )}
    </div>
  );
}