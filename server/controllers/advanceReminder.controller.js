var nodemailer = require('nodemailer');
var mysql = require('mysql');
import {config} from '../config.js';
var errorController = require('./error.controller');

var connection = mysql.createConnection(config);

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    // user: process.env.GMAIL_USER,
    // pass: process.env.GMAIL_PASSWORD
    user: 'bharathitm@gmail.com',
    pass: 'P1ggych0ps1!'
  }
});

// var mailOptions = {
//   from: 'bharathitm@gmail.com',
//   to : '',
//  // to: 'bharathitm@gmail.com',
//   subject: 'Sending Email using Node.js',
//   html: ''
//  // html: 'Test email from Node.js!<br/>Does this come in another line?<br/><br/><b>Warm Regards,</b><br/>Bharathi'
// };

var htmlText =  '<br/>Test email from Node.js!<br/>Does this come in another line?<br/><br/><b>Warm Regards,</b><br/>Bharathi';



export function SendReminders(isReminder) {

      var call_stored_proc = "CALL sp_GetAdvanceDonationReminders()";

        connection.query(call_stored_proc, true, (error, results, fields) => {

        if (error) {
            errorController.LogError(error);
            console.log(error.code);
        }

        console.log(results[0]);

        if (results[0] != '')
        {
            for (var i=0; i< results[0].length; i ++){
                try{

                  var mailOptions = {
                    from: process.env.GMAIL_USER,
                    to : JSON.stringify(results[0][i].email_id),
                    subject: 'Parmarth Niketan - Advance Donation Reminder',
                    html: 'Dear ' + JSON.stringify(results[0][i].guest_name) + ',' + htmlText
                  };
            
                  transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                          errorController.LogError(error);
                          console.log(error);
                    } else {
                      console.log('Email sent: ' + info.response);
                    }
                  });
                } catch (error){
                  errorController.LogError(error);
                  console.log(error);
                }

              }
        }
      
        });
      // connection.end();    
}