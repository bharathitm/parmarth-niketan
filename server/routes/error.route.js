import express from 'express';
import * as aerrorCtrl from '../controllers/error.controller';
import isAuthenticated from '../middlewares/authenticate';
import validate from '../config/joi.validate';
import schema from '../utils/validator';

const router = express.Router();

router.route('/')

    // Logs error
    .post((req, res) => {
        aerrorCtrl.LogClientError(req, res);
    });


export default router;