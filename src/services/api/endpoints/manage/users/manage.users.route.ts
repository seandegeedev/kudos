import express from 'express';
import invite from '@endpoints/manage/users/invite/manage.users.invite.route';

const router = express.Router();

router.use('/invite', invite);

export default router;
