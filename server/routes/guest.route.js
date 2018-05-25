import express from 'express';
import * as guestCtrl from '../controllers/guest.controller';
import isAuthenticated from '../middlewares/authenticate';
import validate from '../config/joi.validate';
import schema from '../utils/validator';

const router = express.Router();

router.route('/')

    //Search guest details
    .get( (req, res) => {
        if ((req.query.ph) != undefined){
            guestCtrl.findByPhone(req, res);
        }
        else if ((req.query.email) != undefined){
            guestCtrl.findByEmailId(req, res);
        }
    })

    .post((req, res) => {
        guestCtrl.add(req, res);
    });


router.route('/:id')

    //Fetches reservation details
    .get( (req, res) => {
        guestCtrl.findById(req, res);
    })

    //Updates reservation details
    .post((req, res) => {
        guestCtrl.update(req, res);
    });



export default router;