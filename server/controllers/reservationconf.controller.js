var nodemailer = require('nodemailer');
var errorController = require('./error.controller');

var confirmationTextBody = require('../emails/confirmationTextBody.js');

var path = require('path');
var config = require('../config/config');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.GMAIL_USER_NAME,
    pass: config.GMAIL_PASSWORD
  }
});

export function SendConfirmationEmail(name, emailId, dates) {
    try {
            var mailOptions = {
            from: config.GMAIL_SENDER,
            to : emailId,
            subject: 'Confirmation Email from Parmarth Niketan!',
            html: 'Namaste Divine Soul ' + name + ' ji,<br/><br/>Jai Gange!<br/><br/>We hope everything is wonderful with you and your loved ones.<br/><br/>This is a confirmation for your stay at Parmarth Niketan from <b>' + dates + '</b>.<br/><br/>' + confirmationTextBody,
            attachments: [
                        {
                                filename: 'Welcome.pdf',
                                path: path.join(__dirname, '../emails/Welcome.pdf'),
                                contentType: 'application/pdf'
                        },
                        {
                                filename: 'Declaration Form - Indian Nationals.docx',
                                path: path.join(__dirname, '../emails/Declaration Form - Indian Nationals.docx')
                        },
                        {
                                filename: 'C Form - Foreign Nationals.docx',
                                path: path.join(__dirname, '../emails/C Form - Foreign Nationals.docx')
                        }
                ]
            };

            transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                    errorController.LogError(error);
            } 
            });
    } catch (error){
            errorController.LogError(error);
    }
}