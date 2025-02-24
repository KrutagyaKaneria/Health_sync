import express from 'express';
import { updateUser, deleteUser, getAllUser, getSingleUser, getUserProfile, getMyAppointments } from '../Controllers/userController.js';
import { authenticate, restrict } from '../auth/verifyToken.js';

const router = express.Router();

// ✅ Define fixed routes first
router.get('/appointments/my-appointments', authenticate, restrict(['patient']), getMyAppointments);
router.get('/profile/me', authenticate, restrict(['patient']), getUserProfile);
router.get('/', authenticate, restrict(['admin']), getAllUser);

// ✅ Dynamic routes at the bottom
router.get('/:id', authenticate, restrict(['patient']), getSingleUser);
router.put('/:id', authenticate, restrict(['patient']), updateUser);
router.delete('/:id', authenticate, restrict(['patient']), deleteUser);

export default router;
