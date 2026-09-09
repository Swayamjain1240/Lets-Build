const ALLOWED_IMAGE_TYPES = [
    "image/jpeg",
    "image/png",
    "image/webp",
];

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

const EXPERIENCE_LEVELS = [
    "Beginner",
    "Intermediate",
    "Advanced",
];

const isValidProfileUrl = (
    value,
    allowedHosts
) => {
    if (!value?.trim()) return true;

    try {
        const url = new URL(value);

        return (
            ["http:", "https:"].includes(
                url.protocol
            ) &&
            allowedHosts.includes(
                url.hostname.toLowerCase()
            )
        );
    } catch {
        return false;
    }
};

export const validateProfileForm = (
    formData
) => {
    const errors = {};

    if (
        formData.bio &&
        formData.bio.trim().length > 500
    ) {
        errors.bio =
            "Bio cannot exceed 500 characters.";
    }

    if (!formData.skills.trim()) {
        errors.skills =
            "Add at least one skill.";
    }

    if (
        !EXPERIENCE_LEVELS.includes(
            formData.experience
        )
    ) {
        errors.experience =
            "Select a valid experience level.";
    }

    const college = formData.college;

    if (
        college.name ||
        college.branch ||
        college.passingYear
    ) {
        if (!college.name.trim()) {
            errors.collegeName =
                "College name is required.";
        }

        if (!college.branch.trim()) {
            errors.branch =
                "Branch is required.";
        }
    }

    if (college.passingYear) {
        const year = Number(
            college.passingYear
        );

        if (
            !Number.isInteger(year) ||
            year < 2000 ||
            year > 2100
        ) {
            errors.passingYear =
                "Enter a valid passing year.";
        }
    }

    if (
        !isValidProfileUrl(
            formData.githubUrl,
            [
                "github.com",
                "www.github.com",
            ]
        )
    ) {
        errors.githubUrl =
            "Enter a valid GitHub URL.";
    }

    if (
        !isValidProfileUrl(
            formData.linkedinUrl,
            [
                "linkedin.com",
                "www.linkedin.com",
            ]
        )
    ) {
        errors.linkedinUrl =
            "Enter a valid LinkedIn URL.";
    }

    const image =
        formData.profilePicture;

    if (
        image &&
        !ALLOWED_IMAGE_TYPES.includes(
            image.type
        )
    ) {
        errors.profilePicture =
            "Use JPG, PNG or WebP image.";
    }

    if (
        image &&
        image.size > MAX_IMAGE_SIZE
    ) {
        errors.profilePicture =
            "Image must be smaller than 5 MB.";
    }

    return errors;
};