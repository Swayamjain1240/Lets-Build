import {
  useRef,
  useState,
} from "react";

import {
  createRequest,
} from "../services/requestService.js";

export default function useCreateRequest() {
  const [submitting, setSubmitting] =
    useState(false);

  const [error, setError] =
    useState("");

  const requestInFlight =
    useRef(false);

  const submitRequest = async (
    payload
  ) => {
    if (requestInFlight.current) {
      return null;
    }

    requestInFlight.current = true;
    setSubmitting(true);
    setError("");

    try {
      const response =
        await createRequest(payload);

      if (
        response?.success === false
      ) {
        throw new Error(
          response.message ||
            "Unable to send request."
        );
      }

      return response;
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "Unable to send request.";

      setError(message);

      return null;
    } finally {
      requestInFlight.current =
        false;

      setSubmitting(false);
    }
  };

  const clearError = () => {
    setError("");
  };

  return {
    submitting,
    error,
    submitRequest,
    clearError,
  };
}