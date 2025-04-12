import { Worker } from 'bullmq';
import { redisConnection } from '@/config';
import { processEmailJob } from '@/queues/emailQueue/emailQueue';

export const startWorkers = () => {
  new Worker('email', processEmailJob, {
    connection: redisConnection,
  });
  console.log('🚀 Email Queue Worker Started and Running...');
};

startWorkers();
