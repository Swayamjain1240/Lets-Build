import {
  useEffect,
} from "react";

import {
  connectSocket,
  getSocket,
} from "../services/socketService.js";

const CONVERSATION_EVENT =
  "conversation:updated";

const MESSAGE_EVENT =
  "message:new";

const extractConversation = (
  payload
) => {
  return (
    payload?.conversation ||
    payload?.data?.conversation ||
    payload
  );
};

const extractMessage = (
  payload
) => {
  return (
    payload?.message ||
    payload?.data?.message ||
    payload
  );
};

export default function useConversationSocket({
  onConversationUpdate,
  onMessage,
}) {
  useEffect(() => {
    const token =
      localStorage.getItem(
        "token"
      );

    let socket =
      getSocket();

    if (!socket && token) {
      socket =
        connectSocket(token);
    }

    if (!socket) {
      return;
    }

    const handleConversationUpdate =
      (payload) => {
        const conversation =
          extractConversation(
            payload
          );

        if (
          !conversation?._id
        ) {
          return;
        }

        onConversationUpdate?.(
          conversation
        );
      };

    const handleMessage = (
      payload
    ) => {
      const message =
        extractMessage(
          payload
        );

      if (!message?._id) {
        return;
      }

      onMessage?.(message);
    };

    socket.on(
      CONVERSATION_EVENT,
      handleConversationUpdate
    );

    socket.on(
      MESSAGE_EVENT,
      handleMessage
    );

    return () => {
      socket.off(
        CONVERSATION_EVENT,
        handleConversationUpdate
      );

      socket.off(
        MESSAGE_EVENT,
        handleMessage
      );
    };
  }, [
    onConversationUpdate,
    onMessage,
  ]);
}