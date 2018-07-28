var mysql = require('mysql');
import {config} from '../config.js';
var errorController = require('./error.controller');

var connection = mysql.createConnection(config);


/**
 *  Find room booking by reservation id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function findById(req, res) {

    var call_stored_proc = "CALL sp_GetRoomBookings('" + req.params.id + "')";

    console.log(call_stored_proc);

    connection.query(call_stored_proc, true, (error, results, fields) => {
    if (error) {
        errorController.LogError(error);
        return res.send(error.code);
    }
    console.log(results[0]);
    res.send(results[0]);
    //connection.end();   
    });
}

/**
 * Update room bookings details
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function update(req, res) {

    console.log(req.body.advance_reminder_on);

    var call_stored_proc = "CALL sp_UpdateRoomBookings('" 
    + req.body.room_booking_id + "','"
    + req.body.date_of_departure + "'"
  
    call_stored_proc += ")";

    console.log(call_stored_proc);

    connection.query(call_stored_proc, true, (error, results, fields) => {
    if (error) {
        errorController.LogError(error);
        return res.send(error.code);
    }
    });
      
    //connection.end();   
}


/**
 * Add room bookings to existing reservation
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function add(req, res) {

    var call_stored_proc = "CALL sp_InsertReservationRoomBookings('" 
    + req.params.id + "','"
    + req.body.room_ids_str + "')";

    console.log(call_stored_proc);

    connection.query(call_stored_proc, true, (error, results, fields) => {
    if (error) {
        errorController.LogError(error);
        return res.send(error.code);
    }
    res.send(results[0]);
    });
      
    //connection.end();   
}

/**
 *  Cancel room booking by reservation id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

export function cancel(req, res) {

    var call_stored_proc = "CALL sp_CancelRoomBookings("+ null + ",'" + req.params.id + "')";

    console.log(call_stored_proc);

    connection.query(call_stored_proc, true, (error, results, fields) => {
    if (error) {
        errorController.LogError(error);
        return res.send(error.code);
    }
 
    //connection.end();   
    });
}