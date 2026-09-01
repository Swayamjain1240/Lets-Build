import User from "../model/userModel.js"
import cloudinary from "../config/cloudinary.js"
import { normalizeAndGetSkillIds } from "../utils/normalizeSkill.js"
import mongoose from "mongoose";

const uploadToCloudinary = (fileBuffer) => {

    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { folder: 'lets_build/profiles' },
            (error, result) => {
                if (error) return reject(error);
                resolve(result.secure_url);
            }
        );
        uploadStream.end(fileBuffer)
    });
};

export const completeOnboarding = async (userId, updateData, fileBuffer) => {
    const { bio, college, experience, skills, githubUrl, linkedinUrl } = updateData;

    const user = await User.findById(userId);
    if (!user) {
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
    }


    if (fileBuffer) {
        user.profilePicture = await uploadToCloudinary(fileBuffer);
    }


    let rawSkillsList = [];
    if (typeof skills === 'string') {
        rawSkillsList = skills.split(',').map((s) => s.trim());
    } else if (Array.isArray(skills)) {
        rawSkillsList = skills;
    }


    if (rawSkillsList.length > 0) {
        user.rawSkills = rawSkillsList;
        user.skills = await normalizeAndGetSkillIds(rawSkillsList);
    }

    if (bio !== undefined) user.bio = bio;
    if (college) {
        if (typeof college === "string") {
            try {
                user.college = JSON.parse(college);
            } catch {
                const error = new Error(
                    "Invalid college data"
                );
                error.statusCode = 400;
                throw error;
            }
        } else {
            user.college = college;
        }
    }
    if (experience) user.experience = experience;
    if (githubUrl !== undefined) user.githubUrl = githubUrl;
    if (linkedinUrl !== undefined) user.linkedinUrl = linkedinUrl;
    user.isOnboarded = true;

    await user.save();
    return await User.findById(userId).populate('skills', 'displayName name');
};

export const getUserById = async (userId) => {

    if (!mongoose.isValidObjectId(userId)) {
        const error = new Error("Invalid user ID");
        error.statusCode = 400;
        throw error;
    }

    const user = await User.findById(userId)
        .populate("skills", "name displayName");

    if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }

    return user;
};

export const getAllDevelopers = async (query = {}) => {
    const filter = { isOnboarded: true };

    if (query.skill) {
        filter.rawSkills = { $regex: query.skill, $options: 'i' };
    }

    return await User.find(filter)
        .select('-password')
        .populate('skills', 'name displayName')
        .sort({ createdAt: -1 });
};