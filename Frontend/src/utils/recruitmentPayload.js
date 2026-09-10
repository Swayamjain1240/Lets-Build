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

      if (key && !skillMap.has(key)) {
        skillMap.set(key, skill);
      }
    });

  return Array.from(skillMap.values());
};

const getSkillName = (skill) => {
  if (typeof skill === "string") {
    return skill;
  }

  return (
    skill?.displayName ||
    skill?.name ||
    ""
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

export const toRecruitmentForm = (
  recruitment
) => {
  const projectId =
    typeof recruitment?.project === "object"
      ? recruitment.project?._id
      : recruitment?.project;

  return {
    project: projectId || "",

    title:
      recruitment?.title || "",

    publicSummary:
      recruitment?.publicSummary || "",

    requiredSkills: (
      recruitment?.requiredSkills || []
    )
      .map(getSkillName)
      .filter(Boolean)
      .join(", "),

    isOpen:
      recruitment?.isOpen ?? true,
  };
};

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