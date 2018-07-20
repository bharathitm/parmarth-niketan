import express from 'express';
import * as reservationCtrl from '../controllers/reservation.controller';
import isAuthenticated from '../middlewares/authenticate';


const router = express.Router();

router.route('/')

      .post((req, res) => {
        reservationCtrl.add(req, res);
    });


router.route('/:id')

    //Fetches reservation details
    .get( (req, res) => {
        reservationCtrl.findById(req, res);
    })

    //Updates reservation details
    .post((req, res) => {
        reservationCtrl.update(req, res);
    })

     //Cancels reservation
     .delete((req, res) => {
        reservationCtrl.cancel(req, res);
    });



export default router;