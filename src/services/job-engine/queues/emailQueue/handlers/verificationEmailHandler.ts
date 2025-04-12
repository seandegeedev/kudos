import { sendVerificationEmail } from '@kudos/email';

export const verificationEmailHandler = async (payload: { firstName: string; email: string; token: string }) => {
  await sendVerificationEmail(payload);
};
