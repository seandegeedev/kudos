import express from 'express';
import users from '@/endpoints/manage/users/manage.users.route';

const router = express.Router();

router.use('/users', users);

export default router;
