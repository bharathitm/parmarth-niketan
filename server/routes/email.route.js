import express from 'express';
import * as emailCtrl from '../controllers/email.controller';

const router = express.Router();

router.route('/')

      .post((req, res) => {
        emailCtrl.SendGeneralEmail(req, res);
    });

export default router;