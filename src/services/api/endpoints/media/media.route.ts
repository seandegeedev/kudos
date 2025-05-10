import express from 'express';
import account from '@endpoints/media/account/media.account.route';

const router = express.Router();

router.use('/account', account);

export default router;
