import express from 'express';
import * as checkinsCtrl from '../controllers/checkin.controller';

const router = express.Router();

router.route('/')

    .get( (req, res) => {
        if ((req.query.tGrid) == '1'){
             //Fetches check in summary details for today (grid)
             checkinsCtrl.findForToday(req, res);
        }
        else if ((req.query.adate) != undefined){
             //Fetches check in details for a given date range
            checkinsCtrl.findByDates(req, res);
        }
        else { 
            //Fetches today's check in details
            checkinsCtrl.find(req, res);
        }
    })

      // Adds advance donation details
      .post((req, res) => {
        checkinsCtrl.add(req, res);
    });


export default router;