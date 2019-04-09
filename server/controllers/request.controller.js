var mysql = require('mysql');
var config = require('../mysqlconfig.js');
var errorController = require('./error.controller');

var pool = mysql.createPool(config);


/**
 *  Find current reservation requests count
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function getRequestsCount(req, res) {

    var call_stored_proc = "CALL sp_GetReservationsRequestsCount()";

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
 *  Get General Reservation Requests
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function getGeneralRequests(req, res) {

    var call_stored_proc = "CALL sp_GetReservationGeneralRequests()"; 

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
 *  Get Retreat Reservation Requests
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function getRetreatRequests(req, res) {

    var call_stored_proc = "CALL sp_GetReservationRetreatRequests()"; 

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
 *  Get Sanskaras Reservation Requests
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function getSanskaraRequests(req, res) {

    var call_stored_proc = "CALL sp_GetReservationSanskaraRequests()"; 

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
 *  Get Agents Reservation Requests
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function getAgentRequests(req, res) {

    var call_stored_proc = "CALL sp_GetReservationAgentRequests()"; 

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




