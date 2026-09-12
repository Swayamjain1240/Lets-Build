import * as authService from "../services/authServices.js";

const setAuthCookie = (res, token) => {
    const isProduction =
        process.env.NODE_ENV === "production";

    res.cookie("jwt", token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction
            ? "none"
            : "lax",
        maxAge:
            7 * 24 * 60 * 60 * 1000,
    });
};

export const signup = async (
    req,
    res,
    next
) => {
    try {
        const {
            name,
            email,
            password,
        } = req.body;

        if (
            !name ||
            !email ||
            !password
        ) {
            const error = new Error(
                "Please provide all required fields"
            );

            error.statusCode = 400;
            throw error;
        }

        const data =
            await authService.registerUser({
                name,
                email,
                password,
            });

        if (!data?.token) {
            throw new Error(
                "Authentication token was not generated"
            );
        }

        setAuthCookie(
            res,
            data.token
        );

        res.status(201).json({
            success: true,
            message:
                "User registered successfully",
            data: data.user,
        });
    } catch (error) {
        next(error);
    }
};

export const login = async (
    req,
    res,
    next
) => {
    try {
        const {
            email,
            password,
        } = req.body;

        if (
            !email ||
            !password
        ) {
            const error = new Error(
                "Please provide email and password"
            );

            error.statusCode = 400;
            throw error;
        }

        const data =
            await authService.authenticateUser({
                email,
                password,
            });

        if (!data?.token) {
            throw new Error(
                "Authentication token was not generated"
            );
        }

        setAuthCookie(
            res,
            data.token
        );

        res.status(200).json({
            success: true,
            message:
                "Logged in successfully",
            data: data.user,
        });
    } catch (error) {
        next(error);
    }
};

export const getMe = async (
    req,
    res,
    next
) => {
    try {
        res.status(200).json({
            success: true,
            data: req.user,
        });
    } catch (error) {
        next(error);
    }
};

export const logout = async (
    req,
    res,
    next
) => {
    try {
        const isProduction =
            process.env.NODE_ENV ===
            "production";

        res.clearCookie("jwt", {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction
                ? "none"
                : "lax",
        });

        res.status(200).json({
            success: true,
            message:
                "Logged out successfully",
        });
    } catch (error) {
        next(error);
    }
};