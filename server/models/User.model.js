

/**
 * User Model Schema
 * Defines the structure for user documents in MongoDB
 * Includes authentication fields, verification status, and OTP management
 */

import mongoose from "mongoose";

// Define user schema with validation and default values
const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    // Email verification fields
    verifyOtp: {
        type: String,
        default: ''
    },
    verifyOtpExpireAt: {
        type: Number,
        default: 0
    },
    isAccountVerified: {
        type: Boolean,
        default: false
    },
    // Password reset fields
    resetOtp: {
        type: String,
        default: ''
    },
    resetOtpExpireAt: {
        type: Number,
        default: 0
    }
})

// Create or reuse existing User model to prevent recompilation errors
const User = mongoose.models.user ||  mongoose.model("User" , userSchema);

export default User;