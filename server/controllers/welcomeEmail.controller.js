var nodemailer = require('nodemailer');
var mysql = require('mysql');
var config = require('../mysqlconfig.js');
var errorController = require('./error.controller');

// var pnAPI = "http://localhost:4000/";

var pnAPI = "http://pn.anandkrish.in:4000/";

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



export function SendWelcomeEmail(name, emailId, email_token) {
    try {

            var htmlText =  '<br/>Please confirm if you would like to receive correspondence from Parmarth. <br/>';
            htmlText += '<a target="_blank" href=' + pnAPI + 'validateEmail?token=' + email_token + '>Click here</a>';
            htmlText += '<br/><br/><b>Warm Regards,</b><br/>Parmarth Niketan';

            var mailOptions = {
            from: 'bharathitm@gmail.com',
            to : emailId,
            subject: 'Welcome to the Parmarth family!',
            html: 'Dear ' + name + ',' + htmlText
            };

            transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                    errorController.LogError(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
            });
    } catch (error){
            errorController.LogError(error);
    }
}