var mysql = require('mysql');
var config = require('../mysqlconfig.js');
var errorController = require('./error.controller');

var pool = mysql.createPool(config);


/**
 *  Find room booking by reservation id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function findById(req, res) {

    var call_stored_proc = "CALL sp_GetRoomBookings('" + req.params.id + "')";

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
 * Update room bookings details
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function update(req, res) {

    var call_stored_proc = "CALL sp_UpdateRoomBookings('" 
    + req.body.room_booking_id + "','"
    + req.body.date_of_departure + "'"
  
    call_stored_proc += ")";

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
    + req.body.room_ids_str + "', ";
    
    if (req.body.reason_str == null) {
        call_stored_proc += null;        
    }
    else {
        call_stored_proc +=  "'" + req.body.reason_str + "'";
    }

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
 *  Cancel room booking by reservation id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

export function cancel(req, res) {

    var call_stored_proc = "CALL sp_CancelRoomBookings("+ null + ",'" + req.params.id + "')";

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

/**
 *  Removes all room booking for reservation id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

export function removeAll(req, res) {

    var call_stored_proc = "CALL sp_CancelRoomBookings('"+ req.query.rId + "'," + null + ")";

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


/**
 *  Removes all Wait List room booking for reservation id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

export function removeWL(req, res) {

    var call_stored_proc = "CALL sp_CancelWLRoomBookings('"+ req.query.rId + "')";

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