import {
    useEffect,
    useState,
} from "react";

import {
    getMyProfile,
    updateMyProfile,
} from "../services/userServices.js";

import {
    validateProfileForm,
} from "../utils/profileValidation.js";

import {
    buildProfilePayload,
} from "../utils/profilePayload.js";

const createInitialForm = (
    profile
) => ({
    bio: profile?.bio || "",

    skills:
        profile?.skills?.length > 0
            ? profile.skills
                .map(
                    (skill) =>
                        skill.displayName ||
                        skill.name
                )
                .join(", ")
            : (
                profile?.rawSkills || []
            ).join(", "),

    experience:
        profile?.experience ||
        "Beginner",

    college: {
        name:
            profile?.college?.name ||
            "",
        branch:
            profile?.college?.branch ||
            "",
        passingYear:
            profile?.college
                ?.passingYear || "",
    },

    githubUrl:
        profile?.githubUrl || "",

    linkedinUrl:
        profile?.linkedinUrl || "",

    profilePicture: null,
});

export default function useProfileForm() {
    const [formData, setFormData] =
        useState(null);

    const [existingImage, setExistingImage] =
        useState("");

    const [previewUrl, setPreviewUrl] =
        useState("");

    const [errors, setErrors] =
        useState({});

    const [loading, setLoading] =
        useState(true);

    const [saving, setSaving] =
        useState(false);

    const [error, setError] =
        useState("");

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const response =
                    await getMyProfile();

                const profile =
                    response?.data;

                setFormData(
                    createInitialForm(profile)
                );

                setExistingImage(
                    profile?.profilePicture || ""
                );
            } catch (err) {
                setError(
                    err.response?.data?.message ||
                    "Unable to load profile."
                );
            } finally {
                setLoading(false);
            }
        };

        loadProfile();
    }, []);

    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(
                    previewUrl
                );
            }
        };
    }, [previewUrl]);

    const change = (event) => {
        const { name, value } =
            event.target;

        if (
            name.startsWith("college.")
        ) {
            const field =
                name.split(".")[1];

            setFormData((previous) => ({
                ...previous,
                college: {
                    ...previous.college,
                    [field]: value,
                },
            }));

            return;
        }

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const changeImage = (event) => {
        const file =
            event.target.files?.[0];

        if (!file) return;

        const imageError =
            validateProfileForm({
                ...formData,
                profilePicture: file,
            }).profilePicture;

        if (imageError) {
            setErrors((previous) => ({
                ...previous,
                profilePicture:
                    imageError,
            }));

            return;
        }

        if (previewUrl) {
            URL.revokeObjectURL(
                previewUrl
            );
        }

        setPreviewUrl(
            URL.createObjectURL(file)
        );

        setFormData((previous) => ({
            ...previous,
            profilePicture: file,
        }));

        setErrors((previous) => ({
            ...previous,
            profilePicture: "",
        }));
    };

    const submit = async () => {
        const validationErrors =
            validateProfileForm(
                formData
            );

        setErrors(validationErrors);

        if (
            Object.keys(
                validationErrors
            ).length > 0
        ) {
            return null;
        }

        setSaving(true);
        setError("");

        try {
            const payload =
                buildProfilePayload(
                    formData
                );

            return await updateMyProfile(
                payload
            );
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Unable to update profile."
            );

            return null;
        } finally {
            setSaving(false);
        }
    };

    return {
        formData,
        existingImage,
        previewUrl,
        errors,
        loading,
        saving,
        error,
        change,
        changeImage,
        submit,
    };
}