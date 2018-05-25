import express from 'express';
import authRoutes from './auth.route';
import userRoutes from './user.route';
import reservationRoutes from './reservation.route';
import guestRoutes from './guest.route';
import econtactsRoutes from './econtacts.route';
import advanceRoutes from './advance.route';

const router = express.Router();

// mount auth routes at /auth
router.use('/auth', authRoutes);

router.use('/users', userRoutes);

//Reservation details
router.use('/reservations', reservationRoutes);

//Guest details 
router.use('/guests', guestRoutes);

//Guest Emergency Contact details
router.use('/econtacts', econtactsRoutes);

//Advance donation for reservations
router.use('/advance', advanceRoutes);

export default router;