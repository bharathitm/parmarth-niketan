import cron from 'node-cron';
 
var advanceReminders = require('./controllers/advanceReminder.controller');
var salesforce = require('./controllers/salesforce.controller');

// Automatically run the cron service for advance donation reminders
cron.schedule('* * 23 * *', function(){
       advanceReminders.SendReminders(true);
     });

// cron for updating salesforce account with guest details
cron.schedule('* * 23 * *', function(){
      salesforce.runSalesForceService();
     });
     