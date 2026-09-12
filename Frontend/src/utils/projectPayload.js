import {
    getOnboardingSkills,
} from "./onboardingValidation.js";

export const createEmptyProjectForm = () => ({
    title: "",
    description: "",
    requiredSkills: "",
    status: "IDEATION",
});

export const toProjectForm = (project) => {
    const skills =
        project?.requiredSkills?.length > 0
            ? project.requiredSkills
            : project?.rawRequiredSkills || [];

    return {
        title: project?.title || "",
        description:
            project?.description || "",

        requiredSkills: skills
            .map((skill) =>
                typeof skill === "string"
                    ? skill
                    : skill.displayName ||
                      skill.name ||
                      ""
            )
            .filter(Boolean)
            .join(", "),

        status:
            project?.status || "IDEATION",
    };
};

export const buildProjectPayload = (
    formData
) => ({
    title: formData.title.trim(),

    description:
        formData.description.trim(),

    status: formData.status,

    requiredSkills:
        getOnboardingSkills(
            formData.requiredSkills
        ),
});