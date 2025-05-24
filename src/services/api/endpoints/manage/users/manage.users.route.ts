import express from 'express';
import { protect, adminOnly } from '@endpoints/auth/auth.controller';
import { getInvite, getInviteByCode, createInvite } from '@endpoints/manage/users/manage.users.controller';

const router = express.Router();

router.post('/create-invite', protect, adminOnly, createInvite);
//router.post('/archive-invite', protect, adminOnly, archiveInvite);
//router.post('/remove-invite', protect, adminOnly, removeInvite);
//router.post('/accept-invite', acceptInvite);
router.get('/invite', protect, adminOnly, getInvite);
router.get('/invite/verify', getInviteByCode);

export default router;
