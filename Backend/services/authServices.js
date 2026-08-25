import User from "../model/userModel.js";
import generateToken from '../utils/generateToken.js';

export const registerUser = async (userData) => {
  const { name, email, password } = userData;

  const userExists = await User.findOne({ email });
  if (userExists) {
    const error = new Error('User already exists with this email');
    error.statusCode = 400;
    throw error;
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  const token = generateToken(user._id);

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    isOnboarded: user.isOnboarded,
    token,
  };
};

export const authenticateUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.matchPassword(password))) {
    const error = new Error('Invalid email or password');
    error.statusCode = 401;
    throw error;
  }

  const token = generateToken(user._id);

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    profilePicture: user.profilePicture,
    isOnboarded: user.isOnboarded,
    token,
  };
};