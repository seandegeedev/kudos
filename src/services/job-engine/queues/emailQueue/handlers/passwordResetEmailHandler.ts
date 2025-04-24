import { sendPasswordResetEmail } from '@kudos/email';

export const passwordResetEmailHandler = async (payload: { firstName: string; email: string; token: string }) => {
  await sendPasswordResetEmail(payload);
};
