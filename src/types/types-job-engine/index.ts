/*
 * 1. Email Queue types
------------------------------------------------------------------------------------------------
 */
export type EmailJobType = 'verification' | 'welcome' | 'password-reset';

export type EmailJobData<T extends EmailJobType, P> = {
  type: T;
  payload: P;
};

export type GeneralEmailJobData = EmailJobData<EmailJobType, unknown>;

/*
 * 1.1 Verification Email Job
------------------------------------------------------------------------------------------------
 */
export type VerificationEmailJobPayload = {
  firstName: string;
  email: string;
  code: string;
};

export type VerificationEmailJobData = EmailJobData<'verification', VerificationEmailJobPayload>;

/*
 * 1.2 Password Reset Email Job
------------------------------------------------------------------------------------------------
  */

export type PasswordResetEmailJobPayload = {
  firstName: string;
  email: string;
  token: string;
};

export type PasswordResetEmailJobData = EmailJobData<'password-reset', PasswordResetEmailJobPayload>;
