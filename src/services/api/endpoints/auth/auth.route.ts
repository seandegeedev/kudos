import express from 'express';
import {
  login,
  logout,
  protect,
  verify,
  sendEmailVerification,
  confirmEmail,
  bootstrapAdminUser,
} from '@endpoints/auth/auth.controller';

const router = express.Router();

router.get('/login', login);
router.get('/logout', logout);
router.get('/verify', protect, verify);
router.get('/send-email-verification', protect, sendEmailVerification);
router.post('/confirm-email', confirmEmail);
router.post('/bootstrap-admin', bootstrapAdminUser);

export default router;
