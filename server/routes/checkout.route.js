import express from 'express';
import * as checkoutsCtrl from '../controllers/checkout.controller';
import isAuthenticated from '../middlewares/authenticate';
import validate from '../config/joi.validate';
import schema from '../utils/validator';

const router = express.Router();

router.route('/')

    //Fetches today's check out details
    .get( (req, res) => {
        checkoutsCtrl.find(req, res);
    })


      // Adds advance donation details
      .post((req, res) => {
        checkoutsCtrl.add(req, res);
    });


router.route('/:id')

    //Fetches advance donation details
    .get( (req, res) => {
        checkoutsCtrl.findById(req, res);
    })

    //Updates advance donation details
    .post((req, res) => {
        checkoutsCtrl.update(req, res);
    });


export default router;