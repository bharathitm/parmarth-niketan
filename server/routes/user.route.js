import express from 'express';
import * as userCtrl from '../controllers/user.controller';
import isAuthenticated from '../middlewares/authenticate';

const router = express.Router();

router.route('/')

    .get( (req, res) => {
        userCtrl.findAll(req, res);
    });


export default router;