import express from 'express';
import { login, logout, protect, verify, sendEmailVerification, confirmEmail } from '@endpoints/auth/auth.controller';

const router = express.Router();

router.get('/login', login);
router.get('/logout', logout);
router.post('/confirmEmail', confirmEmail);
router.get('/sendemailverification', protect, sendEmailVerification);
router.get('/verify', protect, verify);

export default router;
