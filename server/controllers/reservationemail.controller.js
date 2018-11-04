var nodemailer = require('nodemailer');
var errorController = require('./error.controller');

var path = require('path');
var config = require('../config/config');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.GMAIL_USER_NAME,
    pass: config.GMAIL_PASSWORD
  }
});


export function SendEmail(emailId, emailText){
    try {
      var mailOptions = {
          from: config.GMAIL_SENT_FROM_USER_NAME,
          to : emailId,
          subject: 'Reservation Confirmation from Parmarth Niketan!',
          html: emailText,
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