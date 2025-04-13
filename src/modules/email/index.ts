import transporter, { SMTP_USER } from './transporter';

const CLIENT_URL = process.env.API_CLIENT_URL || '';

export const sendVerificationEmail = async ({
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
    subject: 'Kudos | Account Verification Token',
    text: `Hello, ${firstName}\n\nPlease verify your account by clicking the link: \n${CLIENT_URL}/verification?token=${token}\n`,
  };

  await transporter.sendMail(mailOptions);
};

export default {
  sendVerificationEmail,
};
