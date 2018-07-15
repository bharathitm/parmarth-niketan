var mysql = require('mysql');
var config = require('../config.js');
var errorController = require('./error.controller');

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
        errorController.LogError(error);
        return res.send(error.code);
    }
    res.send(results[0]);

    console.log(results[0]);
   
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

    var call_stored_proc = "CALL sp_UpdateTodaysCheckOuts(" 

    if (req.body.int_reservation_id == ''){
        call_stored_proc += null  + ",'"        
    }
    else {
        call_stored_proc +=  "'" + req.body.int_reservation_id + "','"
    }
    call_stored_proc += req.body.str_room_booking_ids + "',"

    if ((req.body.amount == '') || (req.body.amount == 0)){
        call_stored_proc += null  + ",'"        
    }
    else {
        call_stored_proc +=  "'" + req.body.amount + "','"
    }

    call_stored_proc += req.body.receipt_no + "')";

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
 * Update check outs
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function update(req, res) {

    var call_stored_proc = "CALL sp_GetBookingsCheckOutTotal(" 

    if (req.body.str_reservation_ids == ''){
        call_stored_proc += null  + ",'"        
    }
    else {
        call_stored_proc +=  "'" + req.body.str_reservation_ids + "','"
    }

    call_stored_proc += req.body.str_room_booking_ids + "')";

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