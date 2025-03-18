import express from 'express';
import { getUserProfile } from '../Controllers/userController.js'; // Updated to match export
import { authenticate, restrict } from '../auth/verifyToken.js'; // Use 'restrict' as per your code

const router = express.Router();

router.get('/profile/me', authenticate, restrict(['driver']), getUserProfile);

export default router;