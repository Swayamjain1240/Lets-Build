import express from "express"
import { onboarding, getProfile, getUserProfileById, updateProfile, getDevelopers } from "../controllers/userController.js";
import {protect} from "../middleware/authMiddleware.js"
import upload from "../middleware/uploadMiddleware.js"

const router = express.Router();

router.get('/developers', protect, getDevelopers);

router.get('/profile', protect, getProfile);
router.post('/onboarding', protect, upload.single('profilePicture'), onboarding);
router.put('/profile', protect, upload.single('profilePicture'), updateProfile);

router.get('/:id', protect, getUserProfileById);

export default router;