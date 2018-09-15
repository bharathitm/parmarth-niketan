import express from 'express';
import * as userCtrl from '../controllers/user.controller';

const router = express.Router();

router.route('/:id')
    .get( (req, res) => {
        userCtrl.findById(req, res);
    });


export default router;