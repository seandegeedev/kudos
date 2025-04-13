const REDIS_SERVER = process.env.REDIS_SERVER || 'localhost';
const REDIS_PASSWORD = process.env.REDIS_PASSWORD || 'password';

export const redisConnection = {
  host: REDIS_SERVER,
  password: REDIS_PASSWORD,
  port: 6379,
};
