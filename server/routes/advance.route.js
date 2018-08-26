import express from 'express';
import * as advanceCtrl from '../controllers/advance.controller';


const router = express.Router();

router.route('/')
      // Adds advance donation details
      .post((req, res) => {
        advanceCtrl.add(req, res);
    });


router.route('/:id')

    //Fetches advance donation details
    .get( (req, res) => {
        advanceCtrl.findById(req, res);
    })

    //Updates advance donation details
    .post((req, res) => {
        advanceCtrl.update(req, res);
    })

    //deletes advance donation details
    .delete((req, res) => {
        advanceCtrl.cancel(req, res);
    });


export default router;