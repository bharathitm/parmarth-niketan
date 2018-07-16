import express from 'express';
import * as roomBookingCtrl from '../controllers/roombooking.controller';
import isAuthenticated from '../middlewares/authenticate';
import validate from '../config/joi.validate';
import schema from '../utils/validator';

const router = express.Router();

router.route('/:id')

    //Fetches room booking details
    .get( (req, res) => {
        roomBookingCtrl.findById(req, res);
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