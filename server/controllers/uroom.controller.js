var mysql = require('mysql');
var config = require('../mysqlconfig.js');
var errorController = require('./error.controller');

var pool = mysql.createPool(config);


/**
 *  Find today's unclean rooms
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function find(req, res) {

    var call_stored_proc = "CALL sp_GetUncleanRooms()";

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

    var call_stored_proc = "CALL sp_UpdateCleanedRooms('" 
    + req.body.str_room_booking_ids + "')"

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