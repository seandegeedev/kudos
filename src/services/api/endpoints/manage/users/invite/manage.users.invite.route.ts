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
} from '@endpoints/manage/users/invite/manage.users.invite.controller';

const router = express.Router();

router.post('/', protect, adminOnly, createInvite);
router.get('/', protect, adminOnly, getInvite);

router.get('/:inviteID', protect, adminOnly, getInviteByID);
router.delete('/:inviteID/', protect, adminOnly, deleteInvite);
router.post('/:inviteID/archive', protect, adminOnly, archiveInvite);

router.post('/accept/:inviteCode', acceptInvite);
router.post('/verify/:inviteCode', getInviteByCode);

export default router;
