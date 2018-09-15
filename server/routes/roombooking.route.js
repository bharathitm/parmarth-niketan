import express from 'express';
import * as roomBookingCtrl from '../controllers/roombooking.controller';

const router = express.Router();

router.route('/:id')

//Fetches room booking details
.get( (req, res) => {
    roomBookingCtrl.findById(req, res);
})

//Adds room booking details for existing reservation
.post( (req, res) => {
    roomBookingCtrl.add(req, res);
})

//Cancels room booking
.delete((req, res) => {
    roomBookingCtrl.cancel(req, res);
});

router.route('/')

//Updates room booking details - departure date only
.post((req, res) => {
    roomBookingCtrl.update(req, res);
});

export default router;