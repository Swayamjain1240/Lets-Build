import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  getDevelopers,
} from "../services/userService";

export default function useDevelopers() {
  const [developers, setDevelopers] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const fetchDevelopers =
    useCallback(async () => {
      setLoading(true);
      setError("");

      try {
        const response =
          await getDevelopers();

        const developerData =
          Array.isArray(response?.data)
            ? response.data
            : [];

        setDevelopers(
          developerData
        );
      } catch (err) {
        console.error(
          "Failed to fetch developers:",
          err
        );

        setError(
          err.response?.data?.message ||
            "Unable to load developers."
        );

        setDevelopers([]);
      } finally {
        setLoading(false);
      }
    }, []);

  useEffect(() => {
    fetchDevelopers();
  }, [fetchDevelopers]);

  return {
    developers,
    loading,
    error,
    refresh: fetchDevelopers,
  };
}