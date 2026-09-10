import {
  useEffect,
  useState,
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
  const [connected, setConnected] =
    useState(false);

  useEffect(() => {
    if (!conversationId) {
      setConnected(false);
      return;
    }

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
      setConnected(false);
      return;
    }

    const joinRoom = () => {
      socket.emit(
        JOIN_EVENT,
        {
          conversationId,
        }
      );
    };

    const handleConnect = () => {
      setConnected(true);

      joinRoom();
    };

    const handleDisconnect = () => {
      setConnected(false);
    };

    const handleNewMessage = (
      payload
    ) => {
      const message =
        extractMessage(
          payload
        );

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

    socket.on(
      "connect",
      handleConnect
    );

    socket.on(
      "disconnect",
      handleDisconnect
    );

    socket.on(
      MESSAGE_EVENT,
      handleNewMessage
    );

    if (socket.connected) {
      setConnected(true);
      joinRoom();
    }

    return () => {
      socket.off(
        "connect",
        handleConnect
      );

      socket.off(
        "disconnect",
        handleDisconnect
      );

      socket.off(
        MESSAGE_EVENT,
        handleNewMessage
      );

      if (socket.connected) {
        socket.emit(
          LEAVE_EVENT,
          {
            conversationId,
          }
        );
      }
    };
  }, [
    conversationId,
    onMessage,
  ]);

  return {
    connected,
  };
}