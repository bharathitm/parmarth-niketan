var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'bharathitm@gmail.com',
    pass: 'P1ggych0ps1!'
  }
});

var mailOptions = {
  from: 'bharathitm@gmail.com',
  to: 'bharathitm@gmail.com',
  subject: 'Sending Email using Node.js',
  html: 'Test email from Node.js!<br/>Does this come in another line?<br/><br/><b>Warm Regards,</b><br/>Bharathi'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});