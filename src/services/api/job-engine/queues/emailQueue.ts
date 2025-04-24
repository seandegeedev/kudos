import { Queue } from 'bullmq';
import { redisConnection } from '@/job-engine/config';
import type {
  VerificationEmailJobData,
  VerificationEmailJobPayload,
  PasswordResetEmailJobPayload,
  PasswordResetEmailJobData,
} from '@kudos/types-job-engine';

const emailQueue = new Queue('email', {
  connection: redisConnection,
});

export const addEmailVerificationJob = async (payload: VerificationEmailJobPayload) => {
  const data: VerificationEmailJobData = { type: 'verification', payload };
  await emailQueue.add('verification', data);
};

export const addPasswordResetJob = async (payload: PasswordResetEmailJobPayload) => {
  const data: PasswordResetEmailJobData = { type: 'password-reset', payload };
  await emailQueue.add('password-reset', data);
};
