import nodemailer from 'nodemailer';

export const SMTP_HOST = process.env.EMAIL_SMTP_HOST || '';
export const SMTP_PORT = Number(process.env.EMAIL_SMTP_PORT || 0);
export const SMTP_USER = process.env.EMAIL_SMTP_USER || '';
export const SMTP_PASS = process.env.EMAIL_SMTP_PASS || '';

export default nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_PORT === 465,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});
