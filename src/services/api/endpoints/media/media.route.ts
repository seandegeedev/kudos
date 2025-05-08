import express from 'express';
import { protect } from '@endpoints/auth/auth.controller';
import {
  getAccountAvatar,
  uploadAccountAvatar,
  adjustAccountAvatar,
  cancelAccountAvatar,
  removeAccountAvatar,
} from '@endpoints/media/media.controller';
import { createUploader } from '@/multer/config';

// Create an uploader for avatars, the destination is '/media/avatars'
const avatarUploader = createUploader('avatars');

const router = express.Router();

router.get('/account/avatar', protect, getAccountAvatar);
router.post('/account/avatar/upload', protect, avatarUploader.single('avatar'), uploadAccountAvatar);
router.post('/account/avatar/adjust', protect, adjustAccountAvatar);
router.post('/account/avatar/cancel', protect, cancelAccountAvatar);
router.post('/account/avatar/remove', protect, removeAccountAvatar);

export default router;
