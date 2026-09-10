import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  getRecruitmentById,
} from "../services/recruitmentService.js";

const extractRecruitment = (
  response
) => {
  return (
    response?.data?.recruitment ||
    response?.data ||
    null
  );
};

export default function useRecruitmentDetails(
  recruitmentId
) {
  const [
    recruitment,
    setRecruitment,
  ] = useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const refresh =
    useCallback(async () => {
      if (!recruitmentId) {
        setError(
          "Recruitment ID is missing."
        );

        setLoading(false);
        return;
      }

      setLoading(true);
      setError("");

      try {
        const response =
          await getRecruitmentById(
            recruitmentId
          );

        const data =
          extractRecruitment(
            response
          );

        if (!data?._id) {
          throw new Error(
            "Recruitment was not found."
          );
        }

        setRecruitment(data);
      } catch (err) {
        console.error(
          "Failed to load recruitment:",
          err
        );

        setError(
          err.response?.data?.message ||
            err.message ||
            "Unable to load recruitment."
        );

        setRecruitment(null);
      } finally {
        setLoading(false);
      }
    }, [recruitmentId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return {
    recruitment,
    loading,
    error,
    refresh,
  };
}