
/**
 * MERN Authentication Server
 * Main server file that sets up Express.js server with authentication routes
 * Includes middleware for CORS, cookie parsing, and JSON handling
 */

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { PORT } from './configs/env.js';
import connectDB from './configs/db.js';
import authRouter from './routes/auth.route.js';
import userRouter from './routes/user.route.js';

// Initialize Express application
const app = express();

// Set port from environment or default to 4000
const port = PORT || 4000;

// Define allowed origins for CORS
const allowedOrigins = ['http://localhost:5173']

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: allowedOrigins , credentials: true}));

//connectDb
connectDB();

//routes
app.use('/api/auth' , authRouter);
app.use('/api/user' , userRouter);

/**
 * Root Route Handler
 * Returns simple HTML response to indicate server is running
 */
app.get('/' , (req , res) => {
    res.send("<h1>Server is running</h1>")
})

/**
 * Start Server
 * Listen on specified port and log server status
 */
app.listen(port , () => console.log(`server is running:http://localhost:${port}`));