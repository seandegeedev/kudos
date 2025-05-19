import express from 'express';
import { protectAdminOnly } from '@endpoints/auth/auth.controller';

const router = express.Router();

router.post('/create-invite', protectAdminOnly);
router.post('/remove-invite', protectAdminOnly);
router.post('/accept-invite');
router.get('/invite');

export default router;
