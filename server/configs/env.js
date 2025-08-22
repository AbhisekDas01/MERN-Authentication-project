import { config } from "@dotenvx/dotenvx";

config({path: '.env'});


export const {

    PORT,
    MONGODB_URI,
    JWT_SECRET,
    NODE_ENV,
    SENDER_EMAIL,
    SMTP_PASSWORD,
    SMTP_USER

} = process.env;

