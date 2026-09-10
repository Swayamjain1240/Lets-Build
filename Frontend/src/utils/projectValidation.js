import {
  getOnboardingSkills,
} from "./onboardingValidation.js";

export const PROJECT_STATUS_OPTIONS = [
  { value: "IDEATION", label: "Ideation" },
  { value: "IN_PROGRESS", label: "In progress" },
  { value: "COMPLETED", label: "Completed" },
];

export const validateProjectForm = (formData) => {
  const errors = {};

  if (!formData.title.trim()) {
    errors.title = "Project title is required.";
  }

  if (!formData.description.trim()) {
    errors.description =
      "Project description is required.";
  }

  if (
    getOnboardingSkills(formData.requiredSkills)
      .length === 0
  ) {
    errors.requiredSkills =
      "Add at least one required skill.";
  }

  const validStatus =
    PROJECT_STATUS_OPTIONS.some(
      (option) =>
        option.value === formData.status
    );

  if (!validStatus) {
    errors.status = "Select a valid status.";
  }

  return errors;
};