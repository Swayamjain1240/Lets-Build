import {
  useEffect,
} from "react";

import {
  connectSocket,
  getSocket,
} from "../services/socketService.js";

import {
  getEntityId,
} from "../utils/chatUtils.js";

const JOIN_EVENT =
  "conversation:join";

const LEAVE_EVENT =
  "conversation:leave";

const MESSAGE_EVENT =
  "message:new";

const extractMessage = (
  payload
) => {
  return (
    payload?.message ||
    payload?.data?.message ||
    payload
  );
};

export default function useChatSocket({
  conversationId,
  onMessage,
}) {
  useEffect(() => {
    if (!conversationId) {
      return;
    }

    const token =
      localStorage.getItem("token");

    let socket =
      getSocket();

    if (!socket && token) {
      socket =
        connectSocket(token);
    }

    if (!socket) {
      return;
    }

    const handleNewMessage = (
      payload
    ) => {
      const message =
        extractMessage(payload);

      if (!message?._id) {
        return;
      }

      const messageConversationId =
        getEntityId(
          message.conversation
        );

      if (
        messageConversationId &&
        messageConversationId !==
          getEntityId(
            conversationId
          )
      ) {
        return;
      }

      onMessage?.(message);
    };

    socket.emit(
      JOIN_EVENT,
      {
        conversationId,
      }
    );

    socket.on(
      MESSAGE_EVENT,
      handleNewMessage
    );

    return () => {
      socket.off(
        MESSAGE_EVENT,
        handleNewMessage
      );

      socket.emit(
        LEAVE_EVENT,
        {
          conversationId,
        }
      );
    };
  }, [
    conversationId,
    onMessage,
  ]);
}