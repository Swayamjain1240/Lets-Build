import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  getConversations,
} from "../services/communicationService.js";

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
      response?.data?.conversations
    )
  ) {
    return response.data.conversations;
  }

  return [];
};

const sortConversations = (
  conversations
) => {
  return [...conversations].sort(
    (a, b) =>
      (new Date(
        b.updatedAt
      ).getTime() || 0) -
      (new Date(
        a.updatedAt
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

        const data =
          extractConversations(
            response
          );

        setConversations(
          sortConversations(data)
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
          err.response?.data?.message ||
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
    useCallback((conversation) => {
      if (!conversation?._id) {
        return;
      }

      setConversations(
        (previous) => {
          const withoutCurrent =
            previous.filter(
              (item) =>
                item._id !==
                conversation._id
            );

          return sortConversations([
            conversation,
            ...withoutCurrent,
          ]);
        }
      );
    }, []);

  return {
    conversations,
    loading,
    error,
    refresh,
    upsertConversation,
  };
}