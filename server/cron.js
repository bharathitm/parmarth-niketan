import cron from 'node-cron';
 
// import advanceReminders from './controllers/advanceReminder.controller'

var advanceReminders = require('./controllers/advanceReminder.controller');

// Automatically run the cron service for advance donation reminders
cron.schedule('* * * * *', function(){
      console.log('running a task every minute');
       advanceReminders.SendReminders(true);
     });
     