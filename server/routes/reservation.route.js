import express from 'express';
import * as reservationCtrl from '../controllers/reservation.controller';

const router = express.Router();

router.route('/')

    .get( (req, res) => {

        if (req.query.type == 1){
               //Fetches reservation details for a given date range
               reservationCtrl.findByDates(req, res);
        } else {
               //Fetches reservation details for a given date range
               reservationCtrl.findByKathaDates(req, res);
        }
        // if ((req.query.adate) != undefined){
        //     //Fetches reservation details for a given date range
        //     reservationCtrl.findByDates(req, res);
        // }
    })

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