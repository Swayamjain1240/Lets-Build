import {
  getOnboardingSkills,
} from "./onboardingValidation";

export const buildOnboardingPayload = (data) => {
  const payload = new FormData();

  const college = {
    name: data.college.name.trim(),
    branch: data.college.branch.trim(),
  };

  if (data.college.passingYear) {
    college.passingYear = Number(
      data.college.passingYear
    );
  }

  payload.append("bio", data.bio.trim());

  payload.append(
    "skills",
    getOnboardingSkills(data.skills).join(", ")
  );

  payload.append("experience", data.experience);

  payload.append("college", JSON.stringify(college));

  payload.append(
    "githubUrl",
    data.githubUrl.trim()
  );

  payload.append(
    "linkedinUrl",
    data.linkedinUrl.trim()
  );

  if (data.profilePicture) {
    payload.append(
      "profilePicture",
      data.profilePicture
    );
  }

  return payload;
};