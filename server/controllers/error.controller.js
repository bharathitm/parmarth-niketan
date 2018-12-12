var mysql = require('mysql');
var config = require('../mysqlconfig.js');

var pool = mysql.createPool(config);
var errorController = require('./error.controller');



//Called by NodeJS code
export function LogError(message) {

   var call_stored_proc = "CALL sp_InsertErrorLog('" 
   + message + 
   "')";

   pool.getConnection(function(error, connection) {
    if (error) {
        errorController.LogError(error);
    } 

    connection.query(call_stored_proc, true, (error, results, fields) => {
        connection.release();

        if (error) {
            errorController.LogError(error);
        }
        
    });
});    
}


//Called from ReactJS code
export function LogClientError(req, res) {

    var msg = req.body.error_message.replace(/'/g, '"');

    var call_stored_proc = "CALL sp_InsertErrorLog('" 
    + msg + 
    "')";
 
    pool.getConnection(function(error, connection) {
        if (error) {
            errorController.LogError(error);
            return res.send(error.code);
        } 

        connection.query(call_stored_proc, true, (error, results, fields) => {
            connection.release();

            if (error) {
                errorController.LogError(error);
                return res.send(error.code);
            }

        });
    });    
 }