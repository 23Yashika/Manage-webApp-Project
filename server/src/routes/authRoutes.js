// authRoutes.js
import express from 'express';
import { register, login } from '../controllers/authController.js';
import {getUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/:userId', getUser);  // Add this route

export default router;