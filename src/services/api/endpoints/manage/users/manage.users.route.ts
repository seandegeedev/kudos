import express from 'express';
import { protectAdminOnly } from '@endpoints/auth/auth.controller';
import { getInvite, getInviteByCode, createInvite } from '@endpoints/manage/users/manage.users.controller';

const router = express.Router();

router.post('/create-invite', protectAdminOnly, createInvite);
//router.post('/archive-invite', protectAdminOnly, archiveInvite);
//router.post('/remove-invite', protectAdminOnly, removeInvite);
//router.post('/accept-invite', acceptInvite);
router.get('/invite', protectAdminOnly, getInvite);
router.get('/invite/verify', getInviteByCode);

export default router;
