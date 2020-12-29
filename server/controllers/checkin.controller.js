var mysql = require('mysql');
var config = require('../mysqlconfig.js');
var errorController = require('./error.controller');

var pool = mysql.createPool(config);


/**
 *  Find today's check in details
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function find(req, res) {
    var call_stored_proc = "CALL sp_GetTodaysCheckIns()";

    pool.getConnection(function(error, connection) {
        if (error) {
            errorController.LogError(error);
            return res.send(error.code);
        } // not connected!

        // Use the connection
        connection.query(call_stored_proc, true, (error, results, fields) => {
            res.send(results[0]); 
        // When done with the connection, release it.
        connection.release();
 
        // Handle error after the release.
        if (error) {
            errorController.LogError(error);
            return res.send(error.code);
        }
    // Don't use the connection here, it has been returned to the pool.
  });
});  
}

/**
 * Find all check ins for given date range
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function findByDates(req, res) {

    var call_stored_proc = "CALL sp_GetCheckInDetails('" 
    + req.query.adate + "','"
    + req.query.ddate + "')";   
    
    pool.getConnection(function(error, connection) {
        if (error) {
            errorController.LogError(error);
            return res.send(error.code);
        } // not connected!

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
 * Update check ins
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function add(req, res) {

    var call_stored_proc = "CALL sp_UpdateTodaysCheckIns('" 
    
    + req.body.str_reservation_ids + "',"

    if (req.body.str_room_booking_ids != ''){
        call_stored_proc +=  "'" + req.body.str_room_booking_ids + "'";   
    }
    else {
        call_stored_proc += null;
    }

    call_stored_proc += ")";

    pool.getConnection(function(error, connection) {
        if (error) {
            errorController.LogError(error);
            return res.send(error.code);
        } // not connected!

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
 *  Find today's check in summary details for grid sreport
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function findForToday(req, res) {
    var call_stored_proc = "CALL sp_GetTodaysCheckInsReport()";

    pool.getConnection(function(error, connection) {
        if (error) {
            errorController.LogError(error);
            return res.send(error.code);
        } // not connected!

        // Use the connection
        connection.query(call_stored_proc, true, (error, results, fields) => {
            res.send(results[0]); 
        // When done with the connection, release it.
        connection.release();
 
        // Handle error after the release.
        if (error) {
            errorController.LogError(error);
            return res.send(error.code);
        }
    // Don't use the connection here, it has been returned to the pool.
  });
});  
}