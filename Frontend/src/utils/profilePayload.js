const cleanSkills = (value = "") => {
    const uniqueSkills = new Map();

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
                !uniqueSkills.has(key)
            ) {
                uniqueSkills.set(key, skill);
            }
        });

    return Array.from(
        uniqueSkills.values()
    );
};

export const buildProfilePayload = (
    formData
) => {
    const payload = new FormData();

    const college = {
        name:
            formData.college.name.trim(),
        branch:
            formData.college.branch.trim(),
        passingYear:
            formData.college.passingYear
                ? Number(
                    formData.college
                        .passingYear
                )
                : null,
    };

    payload.append(
        "bio",
        formData.bio.trim()
    );

    payload.append(
        "skills",
        cleanSkills(
            formData.skills
        ).join(", ")
    );

    payload.append(
        "experience",
        formData.experience
    );

    payload.append(
        "college",
        JSON.stringify(college)
    );

    payload.append(
        "githubUrl",
        formData.githubUrl.trim()
    );

    payload.append(
        "linkedinUrl",
        formData.linkedinUrl.trim()
    );

    if (
        formData.profilePicture
        instanceof File
    ) {
        payload.append(
            "profilePicture",
            formData.profilePicture
        );
    }

    return payload;
};