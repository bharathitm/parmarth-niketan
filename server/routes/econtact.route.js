import express from 'express';
import * as econtactsCtrl from '../controllers/econtact.controller';


const router = express.Router();

router.route('/')
      // Adds emergency contact details
      .post((req, res) => {
        econtactsCtrl.add(req, res);
    });


router.route('/:id')

    //Fetches emergency contact details
    .get( (req, res) => {
        econtactsCtrl.findById(req, res);
    })

    //Updates emergency contact details
    .post((req, res) => {
        econtactsCtrl.update(req, res);
    });


export default router;