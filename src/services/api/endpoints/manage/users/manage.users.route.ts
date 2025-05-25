import express from 'express';
import { protect, adminOnly } from '@endpoints/auth/auth.controller';
import {
  createInvite,
  getInvite,
  getInviteByID,
  deleteInvite,
  acceptInvite,
  archiveInvite,
  getInviteByCode,
} from '@endpoints/manage/users/manage.users.controller';

const router = express.Router();

router.post('/invite', protect, adminOnly, createInvite);
router.get('/invite', protect, adminOnly, getInvite);

router.get('/invite/:inviteID', protect, adminOnly, getInviteByID);
router.delete('/invite/:inviteID/', protect, adminOnly, deleteInvite);
router.post('/invite/:inviteID/archive', protect, adminOnly, archiveInvite);

router.post('/invite/accept/:inviteCode', acceptInvite);
router.post('/invite/verify/:inviteCode', getInviteByCode);

export default router;
