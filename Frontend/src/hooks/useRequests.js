import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  getReceivedRequests,
  getSentRequests,
} from "../services/requestService.js";

const extractRequests = (
  response
) => {
  if (Array.isArray(response?.data)) {
    return response.data;
  }

  if (
    Array.isArray(
      response?.data?.requests
    )
  ) {
    return response.data.requests;
  }

  return [];
};

export default function useRequests(
  type = "received"
) {
  const [requests, setRequests] =
    useState([]);

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
        const fetchRequests =
          type === "sent"
            ? getSentRequests
            : getReceivedRequests;

        const response =
          await fetchRequests({
            signal:
              controller.signal,
          });

        if (
          controller.signal.aborted
        ) {
          return;
        }

        setRequests(
          extractRequests(response)
        );
      } catch (err) {
        if (
          controller.signal.aborted
        ) {
          return;
        }

        console.error(
          "Failed to fetch requests:",
          err
        );

        setError(
          err.response?.data?.message ||
            "Unable to load requests."
        );

        setRequests([]);
      } finally {
        if (
          !controller.signal.aborted
        ) {
          setLoading(false);
        }
      }
    }, [type]);

  useEffect(() => {
    refresh();

    return () => {
      requestRef.current?.abort();
    };
  }, [refresh]);

  return {
    requests,
    loading,
    error,
    refresh,
  };
}