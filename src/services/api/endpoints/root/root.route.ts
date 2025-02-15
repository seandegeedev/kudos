import express from 'express';
import { status } from '@endpoints/root/root.controller';

const router = express.Router();

router.get('/status', status);

export default router;
