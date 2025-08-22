# Server - Express.js Backend

Node.js Express server for the MERN Authentication system with MongoDB integration and email services.

## Features

- User Authentication (Register, Login, Logout)
- Email Verification with OTP
- Password Reset with OTP
- JWT Token Management
- MongoDB Integration with Mongoose
- Email Service with Nodemailer
- Session Management with MongoDB Transactions

## Tech Stack

- **Node.js** - Runtime Environment
- **Express.js** - Web Framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password Hashing
- **Nodemailer** - Email Service
- **Cookie Parser** - Cookie Management

## Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Setup**
   Create a `.env` file in the server directory:
   ```env
   PORT=3000
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net
   JWT_SECRET=your_jwt_secret
   NODE_ENV=development
   SMTP_USER=your_smtp_user
   SMTP_PASSWORD=your_smtp_password
   SENDER_EMAIL=your_email@example.com
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

## Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

## Project Structure

```
server/
├── controllers/       # Request handlers
├── models/           # MongoDB schemas
├── routes/           # API routes
├── middleware/       # Custom middleware
├── configs/          # Configuration files
└── server.js         # Entry point
```

## API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /register` - User registration
- `POST /login` - User login
- `POST /logout` - User logout
- `POST /send-verify-otp` - Send verification OTP
- `POST /verify-account` - Verify account with OTP
- `GET /is-auth` - Check authentication status
- `POST /send-reset-otp` - Send password reset OTP
- `POST /reset-password` - Reset password

### User Routes (`/api/user`)
- `GET /data` - Get user data (protected)

## Models

### User Model
- `name` - User's full name
- `email` - User's email (unique)
- `password` - Hashed password
- `verifyOtp` - Email verification OTP
- `verifyOtpExpireAt` - OTP expiration time
- `isAccountVerified` - Account verification status
- `resetOtp` - Password reset OTP
- `resetOtpExpireAt` - Reset OTP expiration

## Security Features

- Password hashing with bcryptjs
- JWT tokens with HTTP-only cookies
- CORS configuration for cross-origin requests
- MongoDB session transactions for data consistency
- OTP expiration for security

## Email Service

- Configured with Brevo SMTP
- Welcome emails on registration
- OTP emails for verification and password reset
- HTML email templates
