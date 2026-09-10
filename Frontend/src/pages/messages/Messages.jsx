import {
  MessageSquare,
  RefreshCw,
} from "lucide-react";

import {
  useMemo,
} from "react";

import {
  useParams,
} from "react-router-dom";

import ConversationList from "../../components/chat/ConversationList.jsx";
import ConversationEmptyState from "../../components/chat/ConversationEmptyState.jsx";
import ChatRoom from "../../components/chat/ChatRoom.jsx";

import useConversations from "../../hooks/useConversations.js";
import useConversationSocket from "../../hooks/useConversationSocket.js";
import useAuth from "../../hooks/useAuth.js";

export default function Messages() {
  const {
    conversationId,
  } = useParams();

  const { user } =
    useAuth();

  const {
    conversations,
    loading,
    error,
    refresh,
    upsertConversation,
    applyMessageToConversation,
  } = useConversations();

  useConversationSocket({
    onConversationUpdate:
      upsertConversation,

    onMessage:
      applyMessageToConversation,
  });

  const activeConversation =
    useMemo(
      () =>
        conversations.find(
          (conversation) =>
            conversation._id ===
            conversationId
        ) || null,
      [
        conversations,
        conversationId,
      ]
    );

  const conversationMissing =
    Boolean(
      conversationId &&
      !loading &&
      !error &&
      !activeConversation
    );

  return (
    <div className="space-y-5">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-brand-400">
            <MessageSquare
              size={18}
            />

            <p className="text-sm font-medium">
              Communication
            </p>
          </div>

          <h1 className="mt-2 text-3xl font-bold text-heading">
            Messages
          </h1>

          <p className="mt-2 text-sm text-muted">
            Chat and collaborate with
            developers in realtime.
          </p>
        </div>

        <button
          type="button"
          onClick={refresh}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-medium text-heading hover:bg-surface disabled:opacity-50"
        >
          <RefreshCw size={16} />
          Refresh
        </button>
      </header>

      <section className="overflow-hidden rounded-2xl border border-border bg-background">
        <div className="lg:grid lg:grid-cols-[340px_1fr]">
          <aside
            className={`
              border-border
              lg:block lg:border-r
              ${
                conversationId
                  ? "hidden"
                  : "block"
              }
            `}
          >
            <div className="border-b border-border px-5 py-4">
              <h2 className="font-semibold text-heading">
                Conversations
              </h2>

              <p className="mt-1 text-xs text-muted">
                {conversations.length}{" "}
                conversation
                {conversations.length ===
                1
                  ? ""
                  : "s"}
              </p>
            </div>

            <div className="h-162.5 overflow-y-auto">
              <ConversationList
                conversations={
                  conversations
                }
                loading={loading}
                error={error}
                currentUserId={
                  user?._id
                }
                activeConversationId={
                  conversationId
                }
                onRetry={refresh}
              />
            </div>
          </aside>

          <div
            className={
              conversationId
                ? "block"
                : "hidden lg:block"
            }
          >
            {!conversationId ? (
              <ConversationEmptyState />
            ) : loading ? (
              <div className="flex h-162.5 items-center justify-center">
                <p className="text-sm text-muted">
                  Opening conversation...
                </p>
              </div>
            ) : conversationMissing ? (
              <div className="flex h-162.5 flex-col items-center justify-center px-6 text-center">
                <h2 className="font-semibold text-heading">
                  Conversation unavailable
                </h2>

                <p className="mt-2 max-w-sm text-sm leading-6 text-muted">
                  This conversation does
                  not exist or you don't
                  have permission to
                  access it.
                </p>
              </div>
            ) : activeConversation ? (
              <ChatRoom
                key={
                  activeConversation._id
                }
                conversation={
                  activeConversation
                }
                currentUserId={
                  user?._id
                }
              />
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
}