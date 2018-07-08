import express from 'express';
import * as roomBookingCtrl from '../controllers/roombooking.controller';
import isAuthenticated from '../middlewares/authenticate';
import validate from '../config/joi.validate';
import schema from '../utils/validator';

const router = express.Router();

router.route('/:id')

    //Fetches reservation details
    .get( (req, res) => {
        roomBookingCtrl.findById(req, res);
    })

    //Updates reservation details
    .post((req, res) => {
        roomBookingCtrl.update(req, res);
    })

     //Cancels reservation
     .delete((req, res) => {
        roomBookingCtrl.cancel(req, res);
    });



export default router;