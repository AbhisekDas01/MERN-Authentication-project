
/**
 * User Routes
 * Defines user-related endpoints for retrieving user data and profile information
 * All routes require authentication via userAuth middleware
 */

import {Router} from 'express';
import { userAuth } from '../middleware/userAuth.middleware.js';
import { getUserData } from '../controllers/user.controller.js';

// Create router instance
const userRouter = Router();

// Protected route to get user data
userRouter.get('/data' , userAuth , getUserData );

export default userRouter;

