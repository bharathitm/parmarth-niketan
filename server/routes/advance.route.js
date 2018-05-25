import express from 'express';
import * as advanceCtrl from '../controllers/advance.controller';
import isAuthenticated from '../middlewares/authenticate';
import validate from '../config/joi.validate';
import schema from '../utils/validator';

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
    });


export default router;