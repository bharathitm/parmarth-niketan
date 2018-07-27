var mysql = require('mysql');
import {config} from '../config.js';

var connection = mysql.createConnection(config);



//Called by NodeJS code
export function LogError(message) {

   var call_stored_proc = "CALL sp_InsertErrorLog('" 
   + message + 
   "')";

   //console.log(call_stored_proc);

   connection.query(call_stored_proc, true, (error, results, fields) => {

   });
     
   //connection.end();   
}


//Called from ReactJS code
export function LogClientError(req, res) {

    var msg = req.body.error_message.replace(/'/g, '"');

    var call_stored_proc = "CALL sp_InsertErrorLog('" 
    + msg + 
    "')";
 
    console.log(call_stored_proc);
 
    connection.query(call_stored_proc, true, (error, results, fields) => {
        if (error) {
            console.log(error);
            return res.send(error.code);
        }
 
    });
      
    //connection.end();   
 }