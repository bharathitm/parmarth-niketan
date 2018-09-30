var mysql = require('mysql');
var config = require('../mysqlconfig.js');

var connection = mysql.createConnection(config);



//Called by NodeJS code
export function LogError(message) {

   var call_stored_proc = "CALL sp_InsertErrorLog('" 
   + message + 
   "')";

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
 
    connection.query(call_stored_proc, true, (error, results, fields) => {
        if (error) {
            return res.send(error.code);
        }
 
    });
      
    //connection.end();   
 }