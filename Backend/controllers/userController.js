import * as userService from "../services/userService.js"
import User from "../model/userModel.js"

export const onboarding = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const fileBuffer = req.file ? req.file.buffer : null;

    const updatedUser = await userService.completeOnboarding(
      userId,
      req.body,
      fileBuffer
    );

    res.status(200).json({
      success: true,
      message: 'Onboarding completed successfully',
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
}

export const getProfile = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.user._id);

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const getPublicUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id)
      .select(
        "name profilePicture bio college experience skills githubUrl linkedinUrl isOnboarded"
      )
      .populate("skills", "name displayName");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Developer not found",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const fileBuffer = req.file ? req.file.buffer : null;

    const updatedUser = await userService.completeOnboarding(
      userId,
      req.body,
      fileBuffer
    );

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

export const getDevelopers = async (req, res, next) => {
  try {
    const developers = await userService.getAllDevelopers(req.query);

    res.status(200).json({
      success: true,
      count: developers.length,
      data: developers,
    });
  } catch (error) {
    next(error);
  }
};