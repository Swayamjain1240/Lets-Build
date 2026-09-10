import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  getConversations,
} from "../services/communicationService.js";

import {
  getEntityId,
} from "../utils/chatUtils.js";

const extractConversations = (
  response
) => {
  if (
    Array.isArray(response?.data)
  ) {
    return response.data;
  }

  if (
    Array.isArray(
      response?.data
        ?.conversations
    )
  ) {
    return response.data
      .conversations;
  }

  return [];
};

const getActivityTime = (
  conversation
) => {
  return (
    conversation
      ?.lastMessage
      ?.createdAt ||
    conversation?.updatedAt ||
    conversation?.createdAt
  );
};

const sortConversations = (
  conversations
) => {
  return [
    ...conversations,
  ].sort(
    (a, b) =>
      (new Date(
        getActivityTime(b)
      ).getTime() || 0) -
      (new Date(
        getActivityTime(a)
      ).getTime() || 0)
  );
};

export default function useConversations() {
  const [
    conversations,
    setConversations,
  ] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const requestRef =
    useRef(null);

  const refresh =
    useCallback(async () => {
      requestRef.current?.abort();

      const controller =
        new AbortController();

      requestRef.current =
        controller;

      setLoading(true);
      setError("");

      try {
        const response =
          await getConversations({
            signal:
              controller.signal,
          });

        if (
          controller.signal.aborted
        ) {
          return;
        }

        setConversations(
          sortConversations(
            extractConversations(
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
          "Failed to load conversations:",
          err
        );

        setError(
          err.response?.data
            ?.message ||
            "Unable to load conversations."
        );

        setConversations([]);
      } finally {
        if (
          !controller.signal.aborted
        ) {
          setLoading(false);
        }
      }
    }, []);

  useEffect(() => {
    refresh();

    return () => {
      requestRef.current?.abort();
    };
  }, [refresh]);

  const upsertConversation =
    useCallback(
      (conversation) => {
        if (
          !conversation?._id
        ) {
          return;
        }

        setConversations(
          (previous) => {
            const existing =
              previous.find(
                (item) =>
                  item._id ===
                  conversation._id
              );

            const merged =
              existing
                ? {
                    ...existing,
                    ...conversation,

                    participants:
                      conversation
                        .participants ||
                      existing
                        .participants,

                    project:
                      conversation
                        .project ??
                      existing.project,

                    lastMessage:
                      conversation
                        .lastMessage ??
                      existing
                        .lastMessage,
                  }
                : conversation;

            const remaining =
              previous.filter(
                (item) =>
                  item._id !==
                  conversation._id
              );

            return sortConversations([
              merged,
              ...remaining,
            ]);
          }
        );
      },
      []
    );

  const applyMessageToConversation =
    useCallback(
      (message) => {
        if (!message?._id) {
          return;
        }

        const conversationId =
          getEntityId(
            message.conversation
          );

        if (!conversationId) {
          return;
        }

        setConversations(
          (previous) =>
            sortConversations(
              previous.map(
                (conversation) =>
                  conversation._id ===
                  conversationId
                    ? {
                        ...conversation,

                        lastMessage:
                          message,

                        updatedAt:
                          message.createdAt ||
                          new Date()
                            .toISOString(),
                      }
                    : conversation
              )
            )
        );
      },
      []
    );

  return {
    conversations,
    loading,
    error,
    refresh,
    upsertConversation,
    applyMessageToConversation,
  };
}