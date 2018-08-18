import express from 'express';
import * as advanceCtrl from '../controllers/gcontact.controller';


const router = express.Router();

router.route('/')
      // Adds guest contact details
      .post((req, res) => {
        advanceCtrl.add(req, res);
    });


router.route('/:id')

    //Fetches guest contact details
    .get( (req, res) => {
        advanceCtrl.findById(req, res);
    })

    // //Updates guest contact details
    // .post((req, res) => {
    //     advanceCtrl.update(req, res);
    // })

    //deletes guest contact details
    .delete((req, res) => {
        advanceCtrl.cancel(req, res);
    });


export default router;