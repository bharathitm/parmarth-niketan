import bcrypt from 'bcrypt';
import HttpStatus from 'http-status-codes';

var mysql = require('mysql');
var config = require('../config.js');

var connection = mysql.createConnection(config);


/**
 *  Find today's unclean rooms
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function find(req, res) {

    var call_stored_proc = "CALL sp_GetUncleanRooms()";

    connection.query(call_stored_proc, true, (error, results, fields) => {
    if (error) {
        return res.send(error.message);
    }
    console.log(results[0]);
   
    });
    connection.end();     
}

/**
 * Update check ins
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function add(req, res) {

    var call_stored_proc = "CALL sp_UpdateCleanedRooms('" 
    + req.body.str_room_booking_ids + "')"

    connection.query(call_stored_proc, true, (error, results, fields) => {
    if (error) {
        return res.send(error.message);
    }
    });
      
    connection.end();   
}