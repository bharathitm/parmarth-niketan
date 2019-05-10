var mysql = require('mysql');
var config = require('../mysqlconfig.js');
var errorController = require('./error.controller');

var pool = mysql.createPool(config);


/**
 *  Find rooms availability for today
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function getToday(req, res) {

    var call_stored_proc = "CALL sp_GetTodaysRoomAvailabilityCount()";

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
 *  Find rooms availability count for given date range
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function getCount(req, res) {

    var call_stored_proc = "CALL sp_GetRoomAvailability('"    
    + req.query.sdate + "')"; 

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
 *  Find rooms availability count for given date range
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function getCountBlockWise(req, res) {

    var call_stored_proc = "CALL sp_GetBlockAvailability('"    
    + req.query.sdate + "')"; 

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
 *  Find rooms availability for given date range - Book Rooms Page
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function getDetails(req, res) {

    var call_stored_proc = "CALL sp_GetAvailableRooms('"    
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


/**
 *  Find rooms availability for given date range - Book Rooms Page
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function getEventRooms(req, res) {

    var call_stored_proc = "CALL sp_GetBookedEventRooms('"    
    + req.query.sdate + "')"; 

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
