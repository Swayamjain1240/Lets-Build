const cleanSkills = (value = "") => {
  const skillMap = new Map();

  value
    .split(",")
    .map((skill) => skill.trim())
    .filter(Boolean)
    .forEach((skill) => {
      const key = skill
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "");

      if (
        key &&
        !skillMap.has(key)
      ) {
        skillMap.set(key, skill);
      }
    });

  return Array.from(
    skillMap.values()
  );
};

export const createEmptyRecruitmentForm =
  () => ({
    project: "",
    title: "",
    publicSummary: "",
    requiredSkills: "",
    isOpen: true,
  });

export const buildRecruitmentPayload = (
  formData
) => ({
  project: formData.project,

  title:
    formData.title.trim(),

  publicSummary:
    formData.publicSummary.trim(),

  requiredSkills: cleanSkills(
    formData.requiredSkills
  ),

  isOpen: Boolean(
    formData.isOpen
  ),
});