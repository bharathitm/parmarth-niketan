import express from 'express';
import * as advanceReminderCtrl from '../controllers/advanceReminder.controller';

const router = express.Router();

router.route('/')

    .get( (req, res) => {
        advanceReminderCtrl.sendReminders(req, res);
    })

export default router;