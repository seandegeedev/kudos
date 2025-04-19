import { sendVerificationEmail } from '@kudos/email';

export const verificationEmailHandler = async (payload: { firstName: string; email: string; code: string }) => {
  await sendVerificationEmail(payload);
};
