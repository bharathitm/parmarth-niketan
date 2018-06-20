var cron = require('node-cron');
 
// cron.schedule('* * * * *', function(){
//   console.log('running a task every minute');
// });

cron.schedule('1 * * * *', function(){
      console.log('running a task every minute');
});