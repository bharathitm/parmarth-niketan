import express from 'express';
import * as checkoutsCtrl from '../controllers/checkout.controller';
import isAuthenticated from '../middlewares/authenticate';


const router = express.Router();

router.route('/')

    //Fetches today's check out details
    .get( (req, res) => {
        if ((req.query.adate) != undefined){
            //Fetches check in details for a given date range
            checkoutsCtrl.findByDates(req, res);
       }
       else { 
           //Fetches today's check in details
           checkoutsCtrl.find(req, res);
       }
    })


      // Updates today's check out details
      .post((req, res) => {
        checkoutsCtrl.add(req, res);
    });


router.route('/:id')

    //Fetches today's check out total details
    .post((req, res) => {
        checkoutsCtrl.update(req, res);
    });


export default router;