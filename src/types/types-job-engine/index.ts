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
  code: number;
};

export type VerificationEmailJobData = EmailJobData<'verification', VerificationEmailJobPayload>;
