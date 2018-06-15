import bcrypt from 'bcrypt';
import HttpStatus from 'http-status-codes';

var mysql = require('mysql');
var config = require('../config.js');

var connection = mysql.createConnection(config);


/**
 *  Find today's check out details
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function find(req, res) {

    var call_stored_proc = "CALL sp_GetTodaysCheckOuts()";

    connection.query(call_stored_proc, true, (error, results, fields) => {
    if (error) {
        return res.send(error.message);
    }
    res.send(results[0]);
   
    });
    //connection.end();     
}


/**
 * Update check outs
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function add(req, res) {

    var call_stored_proc = "CALL sp_UpdateTodaysCheckOuts('" 
    + req.body.str_room_booking_ids + "','"
    + req.body.str_reservation_ids + "')";

    console.log(call_stored_proc);

    connection.query(call_stored_proc, true, (error, results, fields) => {
    if (error) {
        return res.send(error.message);
    }
    });
      
    //connection.end();   
}