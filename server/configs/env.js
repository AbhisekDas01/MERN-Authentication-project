import { config } from "@dotenvx/dotenvx";

// Load environment variables from .env file
config({path: '.env'});

// Export environment variables for use across the application
export const {

    PORT,
    MONGODB_URI,
    JWT_SECRET,
    NODE_ENV,
    SENDER_EMAIL,
    SMTP_PASSWORD,
    SMTP_USER

} = process.env;

