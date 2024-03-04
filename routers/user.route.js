import express from 'express';
import { getAllUsers, getUserProfile } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/profile', getUserProfile)
router.get("/", getAllUsers)

export default router;