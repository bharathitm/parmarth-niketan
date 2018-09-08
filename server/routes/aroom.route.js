import express from 'express';
import * as aroomsCtrl from '../controllers/aroom.controller';


const router = express.Router();

router.route('/:id')

    .get( (req, res) => {
        switch (req.params.id){
            case "1":
                aroomsCtrl.getToday(req, res);
                break;
            case "2":
                aroomsCtrl.getCount(req, res);
                break;
            case "3":
                aroomsCtrl.getCountBlockWise(req, res);
                break;
            case "4":
                aroomsCtrl.getDetails(req, res);
                break;
            case "5":
                aroomsCtrl.getEventRooms(req, res);
                break;
        }
    });


export default router;