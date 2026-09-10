import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  getRecruitments,
} from "../services/recruitmentService.js";

const extractRecruitments = (
  response
) => {
  if (
    Array.isArray(response?.data)
  ) {
    return response.data;
  }

  if (
    Array.isArray(
      response?.data?.recruitments
    )
  ) {
    return response.data.recruitments;
  }

  return [];
};

export default function useRecruitments() {
  const [
    recruitments,
    setRecruitments,
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
          await getRecruitments({
            signal:
              controller.signal,
          });

        if (
          controller.signal.aborted
        ) {
          return;
        }

        setRecruitments(
          extractRecruitments(
            response
          )
        );
      } catch (err) {
        if (
          controller.signal.aborted
        ) {
          return;
        }

        console.error(
          "Failed to fetch recruitments:",
          err
        );

        setError(
          err.response?.data?.message ||
            "Unable to load recruitments."
        );

        setRecruitments([]);
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

  return {
    recruitments,
    loading,
    error,
    refresh,
  };
}