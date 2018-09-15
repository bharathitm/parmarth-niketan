import express from 'express';
import * as aerrorCtrl from '../controllers/error.controller';

const router = express.Router();

router.route('/')

    // Logs error
    .post((req, res) => {
        aerrorCtrl.LogClientError(req, res);
    });


export default router;