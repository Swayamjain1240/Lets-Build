import {
  useRef,
  useState,
} from "react";

import {
  createEmptyProjectForm,
  buildProjectPayload,
} from "../utils/projectPayload.js";

import {
  validateProjectForm,
} from "../utils/projectValidation.js";

export default function useProjectForm({
  initialValues = createEmptyProjectForm(),
  saveProject,
}) {
  const [formData, setFormData] = useState(
    () => ({ ...initialValues })
  );

  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);

  const requestInFlight = useRef(false);

  const change = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  const submit = async () => {
    if (requestInFlight.current) {
      return null;
    }

    const validationErrors =
      validateProjectForm(formData);

    setErrors(validationErrors);
    setFormError("");

    if (
      Object.keys(validationErrors).length > 0
    ) {
      return null;
    }

    requestInFlight.current = true;
    setSaving(true);

    try {
      const payload =
        buildProjectPayload(formData);

      const response = await saveProject(payload);

      if (response?.success === false) {
        throw new Error(
          response.message ||
            "Unable to save project."
        );
      }

      return response;
    } catch (error) {
      setFormError(
        error.response?.data?.message ||
          error.message ||
          "Unable to save project."
      );

      return null;
    } finally {
      requestInFlight.current = false;
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