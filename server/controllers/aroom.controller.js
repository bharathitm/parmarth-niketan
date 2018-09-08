var mysql = require('mysql');
var config = require('../mysqlconfig.js');
var errorController = require('./error.controller');

var connection = mysql.createConnection(config);


/**
 *  Find rooms availability for today
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function getToday(req, res) {

    var call_stored_proc = "CALL sp_GetTodaysRoomAvailabilityCount()";

    connection.query(call_stored_proc, true, (error, results, fields) => {
    if (error) {
        errorController.LogError(error);
        return res.send(error.code);
    }
    res.send(results[0]);
    //connection.end();   
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

    console.log(call_stored_proc);

    connection.query(call_stored_proc, true, (error, results, fields) => {
    if (error) {
        errorController.LogError(error);
        return res.send(error.code);
    }
    res.send(results[0]);
   // connection.end();   
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

    console.log(call_stored_proc);

    connection.query(call_stored_proc, true, (error, results, fields) => {
    if (error) {
        errorController.LogError(error);
        return res.send(error.code);
    }
    console.log(results[0]);
    res.send(results[0]);
   // connection.end();   
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
    + req.query.ddate + "',"
    //+ req.query.nR + "," // no_of_rooms
    + req.query.rT + ")"; //total_beds

    console.log(call_stored_proc);

    connection.query(call_stored_proc, true, (error, results, fields) => {
    if (error) {
        errorController.LogError(error);
        return res.send(error.code);
    }
    res.send(results[0]);
   // connection.end();   
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

    console.log(call_stored_proc);

    connection.query(call_stored_proc, true, (error, results, fields) => {
    if (error) {
        errorController.LogError(error);
        return res.send(error.code);
    }
    res.send(results[0]);
   // connection.end();   
    });
}
