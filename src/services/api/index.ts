import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';
import apiRoot from '@endpoints/root/root.route';

const app = express();

const API_PORT = process.env.API_PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || `http://localhost:3000`;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);

/* API entry point */
app.use('/api', apiRoot);

/* Start the API sever */
app.listen(API_PORT, () => {
  console.log(`🚀 Kudos API is running on port ${API_PORT}`);
});
