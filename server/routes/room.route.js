import express from 'express';
import * as roomsCtrl from '../controllers/room.controller';


const router = express.Router();

router.route('/')

    // Fetches all rooms for given block Id
    .get( (req, res) => {
        roomsCtrl.findByBlockId(req, res);
    })

    // Edit room details
    .post((req, res) => {
        roomsCtrl.update(req, res);
    });

router.route('/:id')

    
    .get( (req, res) => {
        if (req.query.type == 1) { // Fetches all details for a given room
            roomsCtrl.find(req, res); 
        } else { // Fetches future bookings for a given room
            roomsCtrl.fetchFutureBookings(req, res);
        }
    });

export default router;