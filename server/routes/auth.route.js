import {Router} from 'express';
import { isAuthenticated, login, logout, register, resetPassword, sendResetOtp, sendVerifyOTP, verifyEmail } from '../controllers/auth.controller.js';
import { userAuth } from '../middleware/userAuth.middleware.js';

const authRouter = Router();


authRouter.post('/register' , register);
authRouter.post('/login', login);
authRouter.post('/logout' , logout);
authRouter.post('/send-verify-otp' , userAuth , sendVerifyOTP);
authRouter.post('/verify-account' , userAuth , verifyEmail)
authRouter.get('/is-auth' , userAuth , isAuthenticated)
authRouter.post('/send-reset-otp' , sendResetOtp);
authRouter.post('/reset-password' , resetPassword);

export default authRouter;