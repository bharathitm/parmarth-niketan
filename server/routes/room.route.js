import express from 'express';
import * as roomsCtrl from '../controllers/room.controller';


const router = express.Router();

router.route('/')

    .get( (req, res) => {
        roomsCtrl.findByBlockId(req, res);
    })

    // Edit room details
    .post((req, res) => {
        roomsCtrl.update(req, res);
    });

router.route('/:id')

    // Fetches all rooms for given block Id
    .get( (req, res) => {
        roomsCtrl.find(req, res); 
    });

    // // Removes
    // .delete((req, res) => {
    // roomsCtrl.add(req, res);
    // })




export default router;