import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  getMessages,
} from "../services/communicationService.js";

const extractMessages = (
  response
) => {
  if (
    Array.isArray(response?.data)
  ) {
    return response.data;
  }

  if (
    Array.isArray(
      response?.data?.messages
    )
  ) {
    return response.data.messages;
  }

  return [];
};

const sortMessages = (
  messages
) => {
  return [...messages].sort(
    (a, b) =>
      (new Date(
        a.createdAt
      ).getTime() || 0) -
      (new Date(
        b.createdAt
      ).getTime() || 0)
  );
};

export default function useMessages(
  conversationId
) {
  const [messages, setMessages] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const requestRef =
    useRef(null);

  const refresh =
    useCallback(async () => {
      if (!conversationId) {
        setMessages([]);
        setError("");
        setLoading(false);
        return;
      }

      requestRef.current?.abort();

      const controller =
        new AbortController();

      requestRef.current =
        controller;

      setLoading(true);
      setError("");

      try {
        const response =
          await getMessages(
            conversationId,
            {
              signal:
                controller.signal,
            }
          );

        if (
          controller.signal.aborted
        ) {
          return;
        }

        setMessages(
          sortMessages(
            extractMessages(
              response
            )
          )
        );
      } catch (err) {
        if (
          controller.signal.aborted
        ) {
          return;
        }

        console.error(
          "Failed to load messages:",
          err
        );

        setError(
          err.response?.data?.message ||
            "Unable to load messages."
        );

        setMessages([]);
      } finally {
        if (
          !controller.signal.aborted
        ) {
          setLoading(false);
        }
      }
    }, [conversationId]);

  useEffect(() => {
    refresh();

    return () => {
      requestRef.current?.abort();
    };
  }, [refresh]);

  const appendMessage =
    useCallback((message) => {
      if (!message?._id) {
        return;
      }

      setMessages((previous) => {
        const exists =
          previous.some(
            (item) =>
              item._id ===
              message._id
          );

        if (exists) {
          return previous;
        }

        return [
          ...previous,
          message,
        ];
      });
    }, []);

  const clearMessages =
    useCallback(() => {
      setMessages([]);
    }, []);

  return {
    messages,
    loading,
    error,
    refresh,
    appendMessage,
    clearMessages,
  };
}