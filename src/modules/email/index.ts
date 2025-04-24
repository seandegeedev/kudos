import transporter, { SMTP_USER } from './transporter';

const CLIENT_URL = process.env.API_CLIENT_URL || '';

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

  await transporter.sendMail(mailOptions);
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
    text: `Hello, ${firstName}\n\nEnter the link below to reset your password:\n\n${CLIENT_URL}/reset-password/${token}\n\nIf you did not request this, please ignore this email.`,
  };

  await transporter.sendMail(mailOptions);
};

export default {
  sendVerificationEmail,
  sendPasswordResetEmail,
};
