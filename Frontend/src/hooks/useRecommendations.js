import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

export default function useRecommendations({
  fetchRecommendations,
  enabled = true,
}) {
  const [recommendations, setRecommendations] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const requestRef =
    useRef(null);

  const refresh =
    useCallback(async () => {
      if (!enabled) {
        setRecommendations([]);
        setLoading(false);
        setError("");
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
          await fetchRecommendations({
            signal: controller.signal,
          });

        if (
          controller.signal.aborted
        ) {
          return;
        }

        const data =
          response?.data
            ?.recommendations ||
          response?.data ||
          [];

        setRecommendations(
          Array.isArray(data)
            ? data
            : []
        );
      } catch (err) {
        if (
          controller.signal.aborted
        ) {
          return;
        }

        console.error(
          "Recommendation request failed:",
          err
        );

        setError(
          err.response?.data?.message ||
            "AI recommendations are temporarily unavailable."
        );

        setRecommendations([]);
      } finally {
        if (
          !controller.signal.aborted
        ) {
          setLoading(false);
        }
      }
    }, [
      enabled,
      fetchRecommendations,
    ]);

  useEffect(() => {
    refresh();

    return () => {
      requestRef.current?.abort();
    };
  }, [refresh]);

  return {
    recommendations,
    loading,
    error,
    refresh,
  };
}