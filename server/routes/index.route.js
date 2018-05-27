import express from 'express';
import authRoutes from './auth.route';
import userRoutes from './user.route';
import reservationRoutes from './reservation.route';
import guestRoutes from './guest.route';
import econtactsRoutes from './econtact.route';
import advanceRoutes from './advance.route';
import aroomsRoutes from './aroom.route';
import checkinsRoutes from './checkin.route';
import checkoutsRoutes from './checkout.route';
import uroomsRoutes from './uroom.route';

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

//Rooms Available for reservations
router.use('/arooms', aroomsRoutes);

//Check Ins
router.use('/checkins', checkinsRoutes);

//Check Outs
router.use('/checkouts', checkoutsRoutes);

//Unclean Rooms for Cleaning
router.use('/urooms', uroomsRoutes);


export default router;