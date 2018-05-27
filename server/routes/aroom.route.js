import express from 'express';
import * as aroomsCtrl from '../controllers/aroom.controller';
import isAuthenticated from '../middlewares/authenticate';
import validate from '../config/joi.validate';
import schema from '../utils/validator';

const router = express.Router();

router.route('/')

    .get( (req, res) => {
        if ((req.query.adate) != undefined){
            aroomsCtrl.findByDates(req, res);
        }
        else{
        aroomsCtrl.find(req, res);
        }
    });


export default router;