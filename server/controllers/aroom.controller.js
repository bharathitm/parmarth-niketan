var mysql = require('mysql');
var config = require('../config.js');
var errorController = require('./error.controller');

var connection = mysql.createConnection(config);


/**
 *  Find rooms availability for today
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function find(req, res) {

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
 *  Find rooms availability for given date range
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function findByDates(req, res) {

    var call_stored_proc = "CALL sp_GetAvailableRooms('"    
    + req.query.adate + "','"
    + req.query.ddate + "',"
    + null + "," //no_of_rooms is null 
    + null + ")"; //total_beds is null

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