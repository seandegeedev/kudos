import express from 'express';
import auth from '@endpoints/auth/auth.route';
import media from '@endpoints/media/media.route';
import account from '@endpoints/account/account.route';
import { status } from '@endpoints/root/root.controller';

const router = express.Router();

router.use('/auth', auth);
router.use('/media', media);
router.use('/account', account);

router.get('/status', status);

export default router;
