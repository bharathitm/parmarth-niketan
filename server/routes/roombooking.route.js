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

    if ((req.query.rId) != undefined){
        //Cancels room bookings for a given reservation Id
        if (req.params.id == 1){
            roomBookingCtrl.removeAll(req, res); // removes all room bookings
        } else {
            roomBookingCtrl.removeWL(req, res); // removes Wait List room bookings
        }
    } else {
        roomBookingCtrl.cancel(req, res);
    }
});



router.route('/')

//Updates room booking details - departure date only
.post((req, res) => {
    roomBookingCtrl.update(req, res);
});

export default router;