import { useEffect, useRef, useState } from "react";

import {
  FIELD_STEPS,
  validateOnboarding,
  validateOnboardingStep,
  validateProfilePicture,
} from "../utils/onboardingValidation.js";

import {
  buildOnboardingPayload,
} from "../utils/onboardingPayload.js";

import {
  completeOnboarding,
} from "../services/userServices.js";

const initialData = {
  profilePicture: null,
  bio: "",
  skills: "",
  experience: "Beginner",
  college: {
    name: "",
    branch: "",
    passingYear: "",
  },
  githubUrl: "",
  linkedinUrl: "",
};

export default function useOnboardingForm() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [firstErrorField, setFirstErrorField] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const requestInFlight = useRef(false);

  // Create and clean up the local image preview.
  useEffect(() => {
    if (!formData.profilePicture) {
      setPreviewUrl("");
      return;
    }

    const url = URL.createObjectURL(formData.profilePicture);
    setPreviewUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [formData.profilePicture]);

  const clearError = (field) => {
    setErrors((previous) => ({
      ...previous,
      [field]: "",
    }));

    setFormError("");
    setFirstErrorField(null);
  };

  // Handles normal fields and college.name / college.branch.
  const change = (event) => {
    const { name, value } = event.target;
    const isCollege = name.startsWith("college.");
    const field = isCollege ? name.split(".")[1] : name;

    setFormData((previous) => {
      if (isCollege) {
        return {
          ...previous,
          college: {
            ...previous.college,
            [field]: value,
          },
        };
      }

      return {
        ...previous,
        [field]: value,
      };
    });

    const errorKey =
      name === "college.name" ? "collegeName" : field;

    clearError(errorKey);
  };

  const changeImage = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const error = validateProfilePicture(file);

    if (error) {
      setErrors((previous) => ({
        ...previous,
        profilePicture: error,
      }));

      setFormError(error);
      event.target.value = "";
      return;
    }

    setFormData((previous) => ({
      ...previous,
      profilePicture: file,
    }));

    clearError("profilePicture");
  };

  const removeImage = () => {
    setFormData((previous) => ({
      ...previous,
      profilePicture: null,
    }));

    clearError("profilePicture");
  };

  const check = (allSteps = false) => {
    const nextErrors = allSteps
      ? validateOnboarding(formData)
      : validateOnboardingStep(step, formData);

    setErrors(nextErrors);

    const firstField = Object.keys(nextErrors)[0];

    if (firstField) {
      setFirstErrorField(firstField);

      if (allSteps) {
        setStep(FIELD_STEPS[firstField] ?? 0);
      }

      setFormError("Please correct the highlighted fields.");
      return false;
    }

    setFirstErrorField(null);
    setFormError("");
    return true;
  };

  const next = () => {
    if (!check()) return;

    setStep((previous) => Math.min(previous + 1, 3));
  };

  const back = () => {
    setErrors({});
    setFormError("");
    setFirstErrorField(null);

    setStep((previous) => Math.max(previous - 1, 0));
  };

  // Returns the server response on success, null on failure.
  const submit = async () => {
    if (requestInFlight.current) return null;
    if (!check(true)) return null;

    requestInFlight.current = true;
    setIsSubmitting(true);

    try {
      const payload = buildOnboardingPayload(formData);
      return await completeOnboarding(payload);
    } catch (error) {
      setFormError(
        error.response?.data?.message ||
          "Unable to save your profile. Please try again."
      );

      return null;
    } finally {
      requestInFlight.current = false;
      setIsSubmitting(false);
    }
  };

  return {
    step,
    formData,
    errors,
    formError,
    firstErrorField,
    previewUrl,
    isSubmitting,
    change,
    changeImage,
    removeImage,
    next,
    back,
    submit,
  };
}