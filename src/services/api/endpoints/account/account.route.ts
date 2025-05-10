import express from 'express';
import { protect } from '@endpoints/auth/auth.controller';
import { updateAccountDetails, updateAccountPassword } from '@endpoints/account/account.controller';

const router = express.Router();

router.post('/update-details', protect, updateAccountDetails);
router.post('/update-password', protect, updateAccountPassword);
//router.post('/update-email', protect, updateAccountEmail);

export default router;
