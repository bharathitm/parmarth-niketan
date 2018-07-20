import express from 'express';
import * as uroomsCtrl from '../controllers/uroom.controller';
import isAuthenticated from '../middlewares/authenticate';


const router = express.Router();

router.route('/')

    // Fetches unclean rooms 
    .get( (req, res) => {
        uroomsCtrl.find(req, res);
        
    })

      // Updates unclean rooms to clean
      .post((req, res) => {
        uroomsCtrl.add(req, res);
    });


export default router;