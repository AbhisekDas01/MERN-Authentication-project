# Client - React Frontend

React application for the MERN Authentication system with modern UI and responsive design.

## Features

- User Registration & Login Forms
- Email Verification Interface
- Password Reset Flow
- Protected Routes
- Responsive Design with Tailwind CSS
- Real-time Notifications with React Toastify

## Tech Stack

- **React** - UI Framework
- **Vite** - Build Tool
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Axios** - HTTP Client
- **React Toastify** - Notifications

## Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Setup**
   Create a `.env` file in the client directory:
   ```env
   VITE_BACKEND_URL=http://localhost:3000
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
client/
├── src/
│   ├── components/     # Reusable components
│   ├── pages/         # Page components
│   ├── context/       # React Context
│   ├── assets/        # Static assets
│   └── utils/         # Utility functions
├── public/            # Public assets
└── package.json       # Dependencies
```

## Pages

- **Home** (`/`) - Landing page with user dashboard
- **Login** (`/login`) - Login/Register form
- **Email Verify** (`/email-verify`) - OTP verification
- **Reset Password** (`/reset-password`) - Password reset flow

## Components

- **Navbar** - Navigation with user menu
- **Header** - Welcome section with user info

## Context

- **AppContext** - Global state management for authentication and user data

## Styling

- Uses Tailwind CSS for responsive design
- Custom gradient backgrounds
- Dark theme components
- Mobile-first approach
