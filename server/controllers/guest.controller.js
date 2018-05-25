import bcrypt from 'bcrypt';
import HttpStatus from 'http-status-codes';

var mysql = require('mysql');
var config = require('../config.js');

var connection = mysql.createConnection(config);


/**
 *  Find guest details by phone number
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function findByPhone(req, res) {

    
    
    var call_stored_proc = "CALL sp_GetGuestDetailsByPhone('" + req.query.ph + "')";

    connection.query(call_stored_proc, true, (error, results, fields) => {
    if (error) {
        return console.error(error.message);
    }
    console.log(results[0]);
    });
      
    connection.end();    
}



/**
 *  Find guest details by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function findByEmailId(req, res) {
   
    var call_stored_proc = "CALL sp_GetGuestDetailsByEmailID('" + req.query.email + "')";

    connection.query(call_stored_proc, true, (error, results, fields) => {
    if (error) {
        return console.error(error.message);
    }
    console.log(results[0]);
    });
      
    connection.end();    
}



/**
 *  Find guest details by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function findById(req, res) {

    var call_stored_proc = "CALL sp_GetGuestDetails('" + req.params.id + "')";

    connection.query(call_stored_proc, true, (error, results, fields) => {
    if (error) {
        return console.error(error.message);
    }
    });
      
    connection.end();    
}

/**
 * Add new guest details
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function add(req, res) {

    var call_stored_proc = "CALL sp_InsertGuestDetails('" 
    + req.body.first_name + "','"
    + req.body.last_name + "','"
    + req.body.email_id + "','"
    + req.body.phone_no + "','"
    + req.body.address + "','"
    + req.body.city + "','"
    + req.body.zip_code + "','"
    + req.body.state + "','"
    + req.body.country_id + 
    "')";

    connection.query(call_stored_proc, true, (error, results, fields) => {
    if (error) {
        return console.error(error.message);
    }
    });
      
    connection.end();   

}

/**
 * Update guest details
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function update(req, res) {

    var call_stored_proc = "CALL sp_UpdateGuestDetails('" 
    + req.params.id + "','"
    + req.body.first_name + "','"
    + req.body.last_name + "','"
    + req.body.email_id + "','"
    + req.body.phone_no + "','"
    + req.body.address + "','"
    + req.body.city + "','"
    + req.body.zip_code + "','"
    + req.body.state + "','"
    + req.body.country_id + 
    "')";

    connection.query(call_stored_proc, true, (error, results, fields) => {
    if (error) {
        return console.error(error.message);
    }
    });
      
    connection.end();   
}