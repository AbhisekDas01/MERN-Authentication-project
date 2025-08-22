
/**
 * Authentication Routes
 * Defines all authentication-related endpoints including register, login, logout,
 * email verification, and password reset functionality
 */

import {Router} from 'express';
import { isAuthenticated, login, logout, register, resetPassword, sendResetOtp, sendVerifyOTP, verifyEmail } from '../controllers/auth.controller.js';
import { userAuth } from '../middleware/userAuth.middleware.js';

// Create router instance
const authRouter = Router();

// Public routes (no authentication required)
authRouter.post('/register' , register);         // User registration
authRouter.post('/login', login);                // User login
authRouter.post('/logout' , logout);             // User logout
authRouter.post('/send-reset-otp' , sendResetOtp);  // Send password reset OTP
authRouter.post('/reset-password' , resetPassword);  // Reset password with OTP

// Protected routes (authentication required)
authRouter.post('/send-verify-otp' , userAuth , sendVerifyOTP);  // Send email verification OTP
authRouter.post('/verify-account' , userAuth , verifyEmail)      // Verify email with OTP
authRouter.get('/is-auth' , userAuth , isAuthenticated)          // Check authentication status

export default authRouter;