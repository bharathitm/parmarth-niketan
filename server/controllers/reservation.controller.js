import bcrypt from 'bcrypt';
import HttpStatus from 'http-status-codes';

var mysql = require('mysql');
var config = require('../config.js');

var connection = mysql.createConnection(config);


/**
 *  Find reservation by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function findById(req, res) {

    var call_stored_proc = "CALL sp_GetReservationDetails('" + req.params.id + "')";

    connection.query(call_stored_proc, true, (error, results, fields) => {
    if (error) {
        return console.error(error.message);
    }
    console.log(results[0]);
    connection.end();   
    });
}

/**
 * Add new reservation details
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function add(req, res) {

    var call_stored_proc = "CALL sp_InsertExistingGuestJustReservationDetails('" 
    + req.params.id + "','"
    + req.body.date_of_arrival + "','"
    + req.body.date_of_departure + "','"
    + req.body.no_of_people + "','"
    + req.body.reservation_comments + "','"
    + req.body.reservation_type_id + "','"
    + req.body.sanskara_id + "','"
    + req.body.is_a_reference + "','"
    + req.body.advance_reminder_on + 
    "')";

    connection.query(call_stored_proc, true, (error, results, fields) => {
    if (error) {
        return console.error(error.message);
    }
    });
      
    connection.end();   

}

/**
 * Update reservation details
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function update(req, res) {

    var call_stored_proc = "CALL sp_UpdateReservationDetails('" 
    + req.body.reservation_id + "','"
    + req.body.date_of_arrival + "','"
    + req.body.date_of_departure + "','"
    + req.body.no_of_people + "','"
    + req.body.reservation_comments + "','"
    + req.body.advance_reminder_on + 
    "')";

    connection.query(call_stored_proc, true, (error, results, fields) => {
    if (error) {
        return console.error(error.message);
    }
    });
      
    connection.end();   

}

/**
 *  Cancel reservation by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

export function cancel(req, res) {

    console.log(req.params.id);
    var call_stored_proc = "CALL sp_CancelReservation('" + req.params.id + "')";

    connection.query(call_stored_proc, true, (error, results, fields) => {
    if (error) {
        return console.error(error.message);
    }
 
    connection.end();   
    });
}