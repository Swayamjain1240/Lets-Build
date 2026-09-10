export const validateRecruitmentForm = (
  formData
) => {
  const errors = {};

  if (!formData.project.trim()) {
    errors.project =
      "Select a project.";
  }

  if (!formData.title.trim()) {
    errors.title =
      "Recruitment title is required.";
  }

  if (
    formData.title.trim().length > 120
  ) {
    errors.title =
      "Title cannot exceed 120 characters.";
  }

  if (!formData.publicSummary.trim()) {
    errors.publicSummary =
      "Public summary is required.";
  }

  if (
    formData.publicSummary.trim()
      .length > 700
  ) {
    errors.publicSummary =
      "Public summary cannot exceed 700 characters.";
  }

  const skills = formData.requiredSkills
    .split(",")
    .map((skill) => skill.trim())
    .filter(Boolean);

  if (skills.length === 0) {
    errors.requiredSkills =
      "Add at least one required skill.";
  }

  return errors;
};