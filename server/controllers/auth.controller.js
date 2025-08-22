import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from "../models/User.model.js";
import { JWT_SECRET, NODE_ENV, SENDER_EMAIL } from "../configs/env.js";
import transporter from "../configs/nodemailer.js";


export const register = async (req , res) => {

    const session = await mongoose.startSession();
    const {name , email , password} = req.body;

        if(!name || !email || !password) {
            return res.json({
                success: false,
                message: "All fields are required!"
            })
        }
    
    try {

        session.startTransaction();

        const existingUser = await User.findOne({email}).session(session);

        if(existingUser){
            await session.abortTransaction();
            return res.json({
                success: false,
                message: "User already exists"
            })
        }
        
        const hashedPassword = await bcrypt.hash(password , 10);

        

        const user = new User({
            name,
            email,
            password: hashedPassword
        })
        await user.save({session});
        
        const token  = jwt.sign({id: user._id} , JWT_SECRET , {expiresIn: '7d' });

        await session.commitTransaction();

        res.cookie('token' , token , {
            httpOnly: true,
            secure: NODE_ENV === 'production'? true : false,
            sameSite: NODE_ENV === 'production' ? 'none': 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        

        const mailOptions = {
            from: SENDER_EMAIL,
            to: email,
            subject: "Welcome to MernAuth",
            text: `Welcome to MernAuth website. Your account has been created with email id: ${email}`
        
        }

        await transporter.sendMail(mailOptions);

        res.json({
            success: true,
            message: "User registered successfully"
        })

    } catch (error) {
        
        await session.abortTransaction();
        res.json({
            success: false , 
            message: error.message
        })
    } finally {
        session.endSession();
    }
}


export const login = async (req ,res) => {

    const {email , password} = req.body;

    if(!email || !password) {
        return res.json({
            success: false,
            message: "Email and password are required"
        })
    }

    try {
        const user = await User.findOne({email});

        if(!user){
            return res.json({
                success: false,
                message: "Invalid email"
            })
        }

        const isMatched = await bcrypt.compare(password , user.password);

        if(!isMatched){
            return res.json({
                success:false,
                message: "Invalid password"
            })
        }

        const token  = jwt.sign({id: user._id} , JWT_SECRET , {expiresIn: '7d' });

        //cookie is used to store the cookie data in client browser 
        res.cookie('token' , token , {
            httpOnly: true,
            secure: NODE_ENV === 'production'? true : false,
            sameSite: NODE_ENV === 'production' ? 'none': 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.json({
            success: true,
            message: "Login successful"
        })
        
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

export const logout = async (req , res) => {

    try {
        
        res.clearCookie('token' , {
            httpOnly: true,
            secure: NODE_ENV === 'production'? true : false,
            sameSite: NODE_ENV === 'production' ? 'none': 'strict'
        })

        return res.json({
            success: true,
            message: "Logged Out"
        })

    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

export const sendVerifyOTP = async (req , res) => {

    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const {userId} = req;

        const user = await User.findById(userId).session(session);

        if(user.isAccountVerified){
            await session.abortTransaction(); 
            return res.json({
                success: false,
                message: "Account is already verified"
            })
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));

        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000

        await user.save({session});

        const mailOptions = {
            from: SENDER_EMAIL,
            to: user.email,
            subject: "Account Verification OTP",
            text: `Your OTP is ${otp}. Verify your account using this OTP`
        
        }

        await transporter.sendMail(mailOptions);

        await session.commitTransaction();

        res.json({
            success: true,
            message: "Account verification otp has been sent"
        })

        
    } catch (error) {
        await session.abortTransaction();
        return res.json({
            success: false,
            message: error.message
        })
    } finally{
        session.endSession();
    }
}

export const verifyEmail = async (req , res) => {

    const {userId} = req;
    const {otp} = req?.body;

    if(!userId || !otp) {
        return res.json({
            success: false,
            message: "Missing details"
        })

    }

    const session = await mongoose.startSession();
    try {

        session.startTransaction();

        const user = await User.findById(userId).session(session);

        if(!user){
            await session.abortTransaction();
            return res.json({
                success: false,
                message: "User not found"
            })
        }
        if(user.isAccountVerified){
            await session.abortTransaction();
            return res.json({
                success: false,
                message: 'Account already verified'
            })
        }

        if(user.verifyOtp === '' || user.verifyOtp !== otp){

            await session.abortTransaction();
            return res.json({
                success: false,
                message: "Invalid OTP"
            })
        }

        if(user.verifyOtpExpireAt < Date.now()){
            await session.abortTransaction();
            return res.json({
                success: false,
                message: "OTP expired"
            })
        }

        user.isAccountVerified = true;
        user.verifyOtp = '';
        user.verifyOtpExpireAt = 0;

        await user.save({session});

        await session.commitTransaction();

        return res.json({
            success: true,
            message: "Email verified successfully"
        })

        
    } catch (error) {
        await session.abortTransaction();
        return res.json({
            success: false,
            message: error.message
        })
    } finally{
        session.endSession();
    }
}

export const isAuthenticated = async (req , res) => {

    try {
        
        return res.json({success: true})
    } catch (error) {
        
        res.json({
            success: false,
            message: error.message
        })
    }
}

//Send password reset otp 
export const sendResetOtp = async (req , res) => {

    const {email} = req.body;

    if(!email) {
        return res.json({
            success: false,
            message: "Email is required"
        })
    }
    
    const session = await mongoose.startSession();

    try {

        session.startTransaction();

        const  user = await User.findOne({email}).session(session);
        if(!user) {
            await session.abortTransaction();
            return res.json({
                success: false , 
                message : "User not found"
            })
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));

        user.resetOtp = otp;
        user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000

        await user.save({session});

        const mailOptions = {
            from: SENDER_EMAIL,
            to: user.email,
            subject: "Password reset OTP",
            text: `Your OTP is ${otp}. reset your password`
        
        }

        await transporter.sendMail(mailOptions);

        await session.commitTransaction();

        res.json({
            success: true,
            message: "Otp sent to your email"
        })
        
    } catch (error) {
        
        await session.abortTransaction();
        return res.json({
            success : false,
            message: error.message
        })
    } finally{
        session.endSession();
    }
}

//reset user password
export const resetPassword = async (req , res) => {

    const {email , otp , newPassword} = req.body;

    if(!email || !otp || !newPassword){
        return res.json({
            success: false,
            message: "All fields are required!"
        })
    }

    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        const user = await User.findOne({email}).session(session);

        if(!user) {
            await session.abortTransaction();
            return res.json({
                success: false,
                message: "User not found!"
            })
        }

        if(user.resetOtp === '' || user.resetOtp !== otp){
            await session.abortTransaction();
            return res.json({
                success: false,
                message: "Invalid OTP"
            })
        }

        if(user.resetOtpExpireAt < Date.now()){
            await session.abortTransaction();
            return res.json({
                success: false,
                message: "OTP Expired"
            })
        }

        //hash the new password before storing
        const hashedPassword = await bcrypt.hash(newPassword , 10);

        user.password = hashedPassword;
        user.resetOtp = '';
        user.resetOtpExpireAt = 0;

        await user.save({session});

        await session.commitTransaction();

        return res.json({
            success: true,
            message: "Password reset successfully"
        })
        
    } catch (error) {
        await session.abortTransaction();
        return res.json({
            success: false,
            message: error.message
        })
    } finally{
        session.endSession();
    }
}
