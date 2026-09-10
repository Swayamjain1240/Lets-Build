import {
  useCallback,
  useState,
} from "react";

import ChatHeader from "./ChatHeader.jsx";
import MessageList from "./MessageList.jsx";
import MessageInput from "./MessageInput.jsx";

import useMessages from "../../hooks/useMessages.js";
import useChatSocket from "../../hooks/useChatSocket.js";

import {
  sendMessage,
} from "../../services/communicationService.js";

const extractMessage = (
  response
) => {
  return (
    response?.data?.message ||
    response?.data ||
    null
  );
};

export default function ChatRoom({
  conversation,
  currentUserId,
}) {
  const conversationId =
    conversation?._id;

  const {
    messages,
    loading,
    error,
    refresh,
    appendMessage,
  } = useMessages(
    conversationId
  );

  const [sending, setSending] =
    useState(false);

  const [sendError, setSendError] =
    useState("");

  const handleSocketMessage =
    useCallback(
      (message) => {
        appendMessage(message);
      },
      [appendMessage]
    );

  useChatSocket({
    conversationId,
    onMessage:
      handleSocketMessage,
  });

  const handleSend =
    async (content) => {
      if (
        sending ||
        !conversationId
      ) {
        return false;
      }

      const cleanContent =
        content.trim();

      if (!cleanContent) {
        return false;
      }

      setSending(true);
      setSendError("");

      try {
        const response =
          await sendMessage(
            conversationId,
            cleanContent
          );

        const message =
          extractMessage(
            response
          );

        if (!message?._id) {
          throw new Error(
            "Message could not be sent."
          );
        }

        appendMessage(message);

        return true;
      } catch (err) {
        console.error(
          "Failed to send message:",
          err
        );

        setSendError(
          err.response?.data?.message ||
            err.message ||
            "Unable to send message."
        );

        return false;
      } finally {
        setSending(false);
      }
    };

  return (
    <div className="flex h-162.5 flex-col">
      <ChatHeader
        conversation={
          conversation
        }
        currentUserId={
          currentUserId
        }
      />

      <div className="min-h-0 flex-1 overflow-y-auto">
        <MessageList
          messages={messages}
          loading={loading}
          error={error}
          currentUserId={
            currentUserId
          }
          onRetry={refresh}
        />
      </div>

      {sendError && (
        <div
          role="alert"
          className="border-t border-red-500/20 bg-red-500/5 px-4 py-2 text-xs text-red-400"
        >
          {sendError}
        </div>
      )}

      <MessageInput
        onSend={handleSend}
        sending={sending}
        disabled={
          loading ||
          Boolean(error)
        }
      />
    </div>
  );
}