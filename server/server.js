import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { PORT } from './configs/env.js';
import connectDB from './configs/db.js';
import authRouter from './routes/auth.route.js';
import userRouter from './routes/user.route.js';

const app = express();

const port = PORT || 4000;

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


app.get('/' , (req , res) => {
    res.send("<h1>Server is running</h1>")
})


app.listen(port , () => console.log(`server is running:http://localhost:${port}`));