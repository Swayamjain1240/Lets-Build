import {
  MessageCircle,
  Users,
} from "lucide-react";

import {
  Link,
} from "react-router-dom";

export default function ConversationEmptyState({
  type = "selection",
}) {
  if (type === "list") {
    return (
      <div className="flex min-h-72 flex-col items-center justify-center px-6 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-surface-soft">
          <Users
            size={22}
            className="text-brand-400"
          />
        </div>

        <h2 className="mt-4 font-semibold text-heading">
          No conversations yet
        </h2>

        <p className="mt-2 max-w-xs text-sm leading-6 text-muted">
          Discover developers and start
          a conversation with someone
          you want to collaborate with.
        </p>

        <Link
          to="/developers"
          className="mt-5 rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-medium text-white"
        >
          Browse Developers
        </Link>
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-125 flex-col items-center justify-center px-6 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-surface">
        <MessageCircle
          size={25}
          className="text-brand-400"
        />
      </div>

      <h2 className="mt-5 text-lg font-semibold text-heading">
        Select a conversation
      </h2>

      <p className="mt-2 max-w-sm text-sm leading-6 text-muted">
        Choose a developer from your
        conversations to open the chat.
      </p>
    </div>
  );
}