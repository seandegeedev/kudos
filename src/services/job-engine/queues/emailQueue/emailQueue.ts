import { Job } from 'bullmq';
import { verificationEmailHandler } from '@/queues/emailQueue/handlers/verificationEmailHandler';
import type { GeneralEmailJobData, VerificationEmailJobData } from '@kudos/types-job-engine';

export const processEmailJob = async (job: Job) => {
  const { type } = job.data as GeneralEmailJobData;

  switch (type) {
    case 'verification': {
      const { payload } = job.data as VerificationEmailJobData;
      await verificationEmailHandler(payload);
      break;
    }
    default:
      console.error(`Unknown job type: ${type}`);
  }
};
