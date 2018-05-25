import bcrypt from 'bcrypt';
import HttpStatus from 'http-status-codes';

var mysql = require('mysql');
var config = require('../config.js');

var connection = mysql.createConnection(config);


/**
 *  Find emergency contacts by Guest Id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function findById(req, res) {

    var call_stored_proc = "CALL sp_GetGuestEmergencyContactDetails('" +  req.params.id + "')";

    connection.query(call_stored_proc, true, (error, results, fields) => {
    if (error) {
        return console.error(error.message);
    }
    console.log(results[0]);
   
    });
    connection.end();     
}

/**
 * Add new emergency contact for Guest Id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function add(req, res) {

    var call_stored_proc = "CALL sp_InsertGuestEmergencyContactDetails('" 
    + req.body.guest_id + "','"
    + req.body.first_name + "','"
    + req.body.last_name + "','"    
    + req.body.phone_no + "','"
    + req.body.relationship + 
    "')";

    connection.query(call_stored_proc, true, (error, results, fields) => {
    if (error) {
        return console.error(error.message);
    }
    });
      
    connection.end();   

}

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
    + req.body.first_name + "','"
    + req.body.last_name + "','"    
    + req.body.phone_no + "','"
    + req.body.relationship +  
    "')";

    connection.query(call_stored_proc, true, (error, results, fields) => {
    if (error) {
        return console.error(error.message);
    }
    });
      
    connection.end();   
}