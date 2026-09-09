const ALLOWED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
]);

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

const EXPERIENCE_LEVELS = [
  "Beginner",
  "Intermediate",
  "Advanced",
];

export const FIELD_STEPS = {
  profilePicture: 0,
  bio: 0,
  skills: 1,
  experience: 1,
  collegeName: 2,
  branch: 2,
  passingYear: 2,
  githubUrl: 3,
  linkedinUrl: 3,
};

export const getOnboardingSkills = (value = "") => {
  const seen = new Set();

  return String(value)
    .split(",")
    .map((skill) => skill.trim())
    .filter((skill) => {
      const key = skill
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "");

      if (!key || seen.has(key)) return false;

      seen.add(key);
      return true;
    });
};

export const validateProfilePicture = (file) => {
  if (!file) return "";

  if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
    return "Choose a JPG, PNG or WebP image.";
  }

  if (file.size > MAX_IMAGE_SIZE) {
    return "Image must be 5 MB or smaller.";
  }

  return "";
};

const validateProfileUrl = (value, hostname) => {
  if (!value.trim()) return "";

  try {
    const url = new URL(value.trim());

    const validProtocol =
      url.protocol === "http:" ||
      url.protocol === "https:";

    const validHost =
      url.hostname === hostname ||
      url.hostname === `www.${hostname}`;

    if (!validProtocol || !validHost) {
      return `Enter a valid ${hostname} URL.`;
    }

    return "";
  } catch {
    return `Enter a valid ${hostname} URL.`;
  }
};

export const validateOnboardingStep = (step, data) => {
  const errors = {};

  if (step === 0) {
    const bio = data.bio.trim();

    if (!bio) {
      errors.bio = "Bio is required.";
    } else if (bio.length > 500) {
      errors.bio = "Bio must be 500 characters or fewer.";
    }

    const imageError = validateProfilePicture(
      data.profilePicture
    );

    if (imageError) {
      errors.profilePicture = imageError;
    }
  }

  if (step === 1) {
    if (getOnboardingSkills(data.skills).length === 0) {
      errors.skills = "Add at least one skill.";
    }

    if (!EXPERIENCE_LEVELS.includes(data.experience)) {
      errors.experience = "Select a valid experience level.";
    }
  }

  if (step === 2) {
    const college = data.college;
    const name = college.name.trim();
    const branch = college.branch.trim();
    const year = String(college.passingYear ?? "").trim();

    const hasEducation = Boolean(name || branch || year);

    if (hasEducation) {
      if (!name) {
        errors.collegeName = "College name is required.";
      }

      if (!branch) {
        errors.branch = "Branch is required.";
      }
    }

    if (year) {
      const numericYear = Number(year);
      const currentYear = new Date().getFullYear();

      if (
        !/^\d{4}$/.test(year) ||
        numericYear < 1950 ||
        numericYear > currentYear + 10
      ) {
        errors.passingYear = "Enter a valid passing year.";
      }
    }
  }

  if (step === 3) {
    const githubError = validateProfileUrl(
      data.githubUrl,
      "github.com"
    );

    const linkedinError = validateProfileUrl(
      data.linkedinUrl,
      "linkedin.com"
    );

    if (githubError) errors.githubUrl = githubError;
    if (linkedinError) errors.linkedinUrl = linkedinError;
  }

  return errors;
};

export const validateOnboarding = (data) => {
  return Object.assign(
    {},
    ...[0, 1, 2, 3].map((step) =>
      validateOnboardingStep(step, data)
    )
  );
};