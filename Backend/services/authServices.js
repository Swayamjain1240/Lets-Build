import User from "../model/userModel.js";
import generateToken from "../utils/generateToken.js";

export const registerUser = async ({
    name,
    email,
    password,
}) => {
    const normalizedEmail =
        email.trim().toLowerCase();

    const existingUser =
        await User.findOne({
            email: normalizedEmail,
        });

    if (existingUser) {
        const error = new Error(
            "User with this email already exists"
        );

        error.statusCode = 400;
        throw error;
    }

    const user = await User.create({
        name: name.trim(),
        email: normalizedEmail,
        password,
    });

    const token = generateToken(
        user._id
    );

    const safeUser =
        await User.findById(
            user._id
        ).populate(
            "skills",
            "name displayName"
        );

    return {
        user: safeUser,
        token,
    };
};


export const authenticateUser = async ({
    email,
    password,
}) => {
    const normalizedEmail =
        email.trim().toLowerCase();

    const user =
        await User.findOne({
            email: normalizedEmail,
        }).select("+password");

    if (!user) {
        const error = new Error(
            "Invalid email or password"
        );

        error.statusCode = 401;
        throw error;
    }

    const passwordMatches =
        await user.matchPassword(
            password
        );

    if (!passwordMatches) {
        const error = new Error(
            "Invalid email or password"
        );

        error.statusCode = 401;
        throw error;
    }

    const token = generateToken(
        user._id
    );

    const safeUser =
        await User.findById(
            user._id
        ).populate(
            "skills",
            "name displayName"
        );

    return {
        user: safeUser,
        token,
    };
};