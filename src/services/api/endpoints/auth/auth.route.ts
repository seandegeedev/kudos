import express from 'express';
import {
  login,
  logout,
  protect,
  verify,
  sendEmailVerification,
  verifyEmail,
  verifyUser,
  bootstrapAdminUser,
  sendPasswordResetEmail,
  resetPassword,
} from '@endpoints/auth/auth.controller';

const router = express.Router();

router.get('/login', login);
router.get('/logout', logout);
router.get('/verify', protect, verify);
router.get('/send-email-verification', protect, sendEmailVerification);
router.post('/send-password-reset-email', sendPasswordResetEmail);
router.post('/reset-password', resetPassword);
router.post('/verify-email', verifyEmail);
router.post('/verify-user', verifyUser);
router.post('/bootstrap-admin', bootstrapAdminUser);

export default router;
