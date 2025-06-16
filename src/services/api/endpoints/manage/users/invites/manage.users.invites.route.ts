import express from 'express';
import { protect, adminOnly } from '@endpoints/auth/auth.controller';
import { getInvites } from '@endpoints/manage/users/invites/manage.users.invites.controller';

const router = express.Router();

router.get('/', protect, adminOnly, getInvites);

export default router;
