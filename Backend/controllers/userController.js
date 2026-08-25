import * as userService from "../services/userService.js"

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