import express from 'express';
import { protect } from '@endpoints/auth/auth.controller';
import { uploadAvatar } from '@endpoints/media/media.controller';
import { createUploader } from '@/multer/config';

// Create an uploader for avatars, the destination is '/media/avatars'
const avatarUploader = createUploader('avatars');

const router = express.Router();

router.post('/account/avatar', protect, avatarUploader.single('avatar'), uploadAvatar);

export default router;
