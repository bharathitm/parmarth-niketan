var mysql = require('mysql');
var config = require('../mysqlconfig.js');
var errorController = require('./error.controller');

var pool = mysql.createPool(config);


/**
 *  Find today's check out details
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function find(req, res) {

    var call_stored_proc = "CALL sp_GetTodaysCheckOuts()";

    pool.getConnection(function(error, connection) {
        if (error) {
            errorController.LogError(error);
            return res.send(error.code);
        } 

        connection.query(call_stored_proc, true, (error, results, fields) => {
            res.send(results[0]); 
            connection.release();

            if (error) {
                errorController.LogError(error);
                return res.send(error.code);
            }

        });
    });       
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
        call_stored_proc += null  + ",'";        
    }
    else {
        call_stored_proc +=  "'" + req.body.int_reservation_id + "','";
    }
    call_stored_proc += req.body.str_room_booking_ids + "',";

    if ((req.body.amount == '') || (req.body.amount == 0)){
        call_stored_proc += null  + ",'";        
    }
    else {
        call_stored_proc +=  "'" + req.body.amount + "','";
    }

    call_stored_proc += req.body.receipt_no + "',";
    
    if (req.body.comments == ''){
        call_stored_proc += null;       
    }
    else {
        call_stored_proc +=  "'" + req.body.comments + "'";
    }

    call_stored_proc += ",'" + req.body.user_id + "'";

    call_stored_proc += ")";

    pool.getConnection(function(error, connection) {
        if (error) {
            errorController.LogError(error);
            return res.send(error.code);
        } 

        connection.query(call_stored_proc, true, (error, results, fields) => {
            res.send(results[0]); 
            connection.release();

            if (error) {
                errorController.LogError(error);
                return res.send(error.code);
            }

        });
    });      
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

    pool.getConnection(function(error, connection) {
        if (error) {
            errorController.LogError(error);
            return res.send(error.code);
        } 

        connection.query(call_stored_proc, true, (error, results, fields) => {
            res.send(results[0]); 
            connection.release();

            if (error) {
                errorController.LogError(error);
                return res.send(error.code);
            }

        });
    });      
}

/**
 * Find all check outs for given date range
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function findByDates(req, res) {

    var call_stored_proc = "CALL sp_GetCheckOutDetails('" 
    + req.query.adate + "','"
    + req.query.ddate + "')";    

    pool.getConnection(function(error, connection) {
        if (error) {
            errorController.LogError(error);
            return res.send(error.code);
        } 

        connection.query(call_stored_proc, true, (error, results, fields) => {
            res.send(results[0]); 
            connection.release();

            if (error) {
                errorController.LogError(error);
                return res.send(error.code);
            }

        });
    });     
}

