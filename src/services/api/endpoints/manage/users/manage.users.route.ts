import express from 'express';
import invite from '@endpoints/manage/users/invite/manage.users.invite.route';
import invites from '@endpoints/manage/users/invites/manage.users.invites.route';

const router = express.Router();

router.use('/invite', invite);
router.use('/invites', invites);

export default router;
