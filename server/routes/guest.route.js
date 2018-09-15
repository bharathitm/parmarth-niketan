import express from 'express';
import * as guestCtrl from '../controllers/guest.controller';

const router = express.Router();

router.route('/')

    //Search guest details
    .get( (req, res) => {
        guestCtrl.search(req, res);
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