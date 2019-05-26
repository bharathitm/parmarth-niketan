var mysql = require('mysql');
var config = require('../mysqlconfig.js');
var errorController = require('./error.controller');

var pool = mysql.createPool(config);


/**
 *  Find all rooms for given block
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function findByBlockId(req, res) {

    var call_stored_proc = "CALL sp_GetBlockAllRooms('" + req.query.bId + "')";

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
 *  Load room details for given room Id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function find(req, res) {

    var call_stored_proc = "CALL sp_GetRoomDetails('" + req.params.id + "')";

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
 * Update room details
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function update(req, res) {

    var call_stored_proc = "CALL sp_UpdateRoomDetails('" 

    call_stored_proc +=  req.body.room_id + "',"
    // Since room category id is an optional field, we pass this as null
    if (req.body.room_category_id == '' || req.body.room_category_id == null){
        call_stored_proc += null + ",";        
    }
    else {
        call_stored_proc +=  "'" + req.body.room_category_id + "',";
    }
    call_stored_proc += "'" + req.body.room_no + "','"
    + req.body.floor_no + "','"
    + req.body.total_beds + "','"
    + req.body.room_rent + "','"
    + req.body.has_AC + "','"
    + req.body.has_cooler + "','"
    + req.body.has_western_toilet + "','"
    + req.body.has_indian_toilet + "','"
    + req.body.has_solar_geyser + "','"    
    + req.body.is_available + "',";

    // Since notes is an optional field, we pass this as null
    if (req.body.notes == '' || req.body.notes == null){
        call_stored_proc += null;        
    }
    else {
        var notes = req.body.notes.replace(/'/g, "''");  
        call_stored_proc +=  "'" + notes + "'";
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
 *  Load room future bookings for given room Id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function fetchFutureBookings(req, res) {

    var call_stored_proc = "CALL sp_GetRoomFutureBookings('" + req.params.id + "')";

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