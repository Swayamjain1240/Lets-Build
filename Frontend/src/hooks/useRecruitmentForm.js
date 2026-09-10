import {
  useRef,
  useState,
} from "react";

import {
  createEmptyRecruitmentForm,
  buildRecruitmentPayload,
} from "../utils/recruitmentPayload.js";

import {
  validateRecruitmentForm,
} from "../utils/recruitmentValidation.js";

export default function useRecruitmentForm({
  initialValues =
    createEmptyRecruitmentForm(),
  saveRecruitment,
}) {
  const [formData, setFormData] =
    useState(() => ({
      ...initialValues,
    }));

  const [errors, setErrors] =
    useState({});

  const [formError, setFormError] =
    useState("");

  const [saving, setSaving] =
    useState(false);

  const requestInFlight =
    useRef(false);

  const change = (event) => {
    const {
      name,
      value,
      type,
      checked,
    } = event.target;

    setFormData((previous) => ({
      ...previous,

      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  const submit = async () => {
    if (
      requestInFlight.current
    ) {
      return null;
    }

    const validationErrors =
      validateRecruitmentForm(
        formData
      );

    setErrors(validationErrors);
    setFormError("");

    if (
      Object.keys(
        validationErrors
      ).length > 0
    ) {
      return null;
    }

    requestInFlight.current = true;
    setSaving(true);

    try {
      const payload =
        buildRecruitmentPayload(
          formData
        );

      const response =
        await saveRecruitment(
          payload
        );

      if (
        response?.success === false
      ) {
        throw new Error(
          response.message ||
            "Unable to publish recruitment."
        );
      }

      return response;
    } catch (error) {
      setFormError(
        error.response?.data?.message ||
          error.message ||
          "Unable to publish recruitment."
      );

      return null;
    } finally {
      requestInFlight.current =
        false;

      setSaving(false);
    }
  };

  return {
    formData,
    errors,
    formError,
    saving,
    change,
    submit,
  };
}