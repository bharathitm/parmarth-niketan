import { SendEmail } from './reservationemail.controller.js';

var errorController = require('./error.controller');

export function SendGeneralEmail(req, res) {

        var htmlText = 'Namaste Divine Soul ' + req.body.name + ' ji,<br/><br/>Jai Gange!<br/><br/>';

        SendEmail(req.body.to, req.body.subject, htmlText + req.body.content, 0, function (emailResponse){
                res.send(emailResponse);
        });       
}

