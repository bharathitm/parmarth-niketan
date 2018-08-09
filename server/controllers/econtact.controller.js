var mysql = require('mysql');
var config = require('../mysqlconfig.js');
var errorController = require('./error.controller.js');

var connection = mysql.createConnection(config);

/**
 * Update emergency contact for Guest Id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function update(req, res) {

    var call_stored_proc = "CALL sp_UpdateGuestEmergencyContactDetails('" 
    + req.params.id + "','"
    + req.body.e_first_name + "','"
    + req.body.e_last_name + "','"    
    + req.body.e_phone_no + "','"
    + req.body.e_relationship +  
    "')";

    connection.query(call_stored_proc, true, (error, results, fields) => {
    if (error) {
        errorController.LogError(error);
        return res.send(error.code);
    }
    res.send(results[0]);
    });
      
   // connection.end();   
}