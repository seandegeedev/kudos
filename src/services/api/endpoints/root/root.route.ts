import express from 'express';
import auth from '@endpoints/auth/auth.route';
import { status } from '@endpoints/root/root.controller';

const router = express.Router();

router.use('/auth', auth);
router.get('/status', status);

export default router;
