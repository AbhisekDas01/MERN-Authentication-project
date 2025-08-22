# MERN Authentication Project

A full-stack authentication system built with MongoDB, Express.js, React, and Node.js.

## Features

- User Registration & Login
- Email Verification with OTP
- Password Reset with OTP
- JWT-based Authentication
- Cookie-based Session Management
- Responsive UI with Tailwind CSS
- Email Integration with Nodemailer

## Project Structure

```
MERN-AUTHENTICATION-PROJECT/
├── client/          # React frontend
├── server/          # Express.js backend
├── README.md        # Project documentation
└── .gitignore       # Git ignore rules
```

## Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/AbhisekDas01/MERN-Authentication-project.git
   cd MERN-AUTHENTICATION-PROJECT
   ```

2. **Setup Backend**
   ```bash
   cd server
   npm install
   npm run dev
   ```

3. **Setup Frontend**
   ```bash
   cd client
   npm install
   npm run dev
   ```

4. **Environment Variables**
   - Create `.env` files in both `client` and `server` directories
   - Add required environment variables (see individual README files)

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Axios
- **Backend**: Node.js, Express.js, MongoDB, JWT
- **Email**: Nodemailer with Brevo SMTP
- **Authentication**: JWT tokens with HTTP-only cookies

## Author

**Abhisek Das**
- GitHub: [@AbhisekDas01](https://github.com/AbhisekDas01)

## License

This project is licensed under the ISC License.
