import express from 'express';
import { protect } from '@endpoints/auth/auth.controller';
import {
  getAccountAvatar,
  uploadAccountAvatar,
  adjustAccountAvatar,
  removeAccountAvatar,
} from '@endpoints/media/account/media.account.controller';
import { createUploader } from '@/multer/config';

// Create an uploader for avatars, the destination is '/media/avatars'
const avatarUploader = createUploader('avatars');

const router = express.Router();

router.get('/avatar', protect, getAccountAvatar);
router.post('/avatar/upload', protect, avatarUploader.single('avatar'), uploadAccountAvatar);
router.post('/avatar/adjust', protect, adjustAccountAvatar);
router.post('/avatar/remove', protect, removeAccountAvatar);

export default router;
