import nodemailer from 'nodemailer';
import { SMTP_PASSWORD, SMTP_USER } from './env.js';

const transporter = nodemailer.createTransport({

    host: 'smtp-relay.brevo.com',
    port: 587,
    auth: {
        user: SMTP_USER,
        pass: SMTP_PASSWORD
    }

})

export default transporter;