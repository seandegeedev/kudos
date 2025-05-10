import pRetry from 'p-retry';
import transporter, { SMTP_USER } from './transporter';
import type { Options as RetryOptions } from 'p-retry';

const CLIENT_URL = process.env.API_CLIENT_URL || '';

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

const RETRY_OPTIONS: RetryOptions = {
  retries: MAX_RETRIES,
  minTimeout: RETRY_DELAY,
};

// Send email with retry logic
const sendMail = async (mailOptions: any) => {
  return pRetry(
    async () => {
      await transporter.sendMail(mailOptions);
    },
    {
      ...RETRY_OPTIONS,
      onFailedAttempt: error => {
        console.error(`Attempt ${error.attemptNumber} failed. Retrying...`);
      },
    }
  );
};

export const sendVerificationEmail = async ({
  firstName,
  email,
  code,
}: {
  firstName: string;
  email: string;
  code: string;
}) => {
  const mailOptions = {
    from: { name: 'Kudos', address: SMTP_USER },
    to: email,
    subject: 'Kudos | Account Verification Token',
    text: `Hello, ${firstName}\n\nWelcome to Kudos 💪\nEnter the code below to verify your account:\n\n${code}\n\nIf you did not request this, please ignore this email.`,
  };

  await sendMail(mailOptions);
};

export const sendPasswordResetEmail = async ({
  firstName,
  email,
  token,
}: {
  firstName: string;
  email: string;
  token: string;
}) => {
  const mailOptions = {
    from: { name: 'Kudos', address: SMTP_USER },
    to: email,
    subject: 'Kudos | Password Reset',
    text: `Hello, ${firstName}\n\nClick the link below to reset your password:\n\n${CLIENT_URL}/reset-password?token=${token}\n\nIf you did not request this, please ignore this email.`,
  };

  await sendMail(mailOptions);
};

export default {
  sendVerificationEmail,
  sendPasswordResetEmail,
};
