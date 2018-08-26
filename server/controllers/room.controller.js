var mysql = require('mysql');
var config = require('../mysqlconfig.js');
var errorController = require('./error.controller');

var connection = mysql.createConnection(config);


/**
 *  Find all rooms for given block
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function findByBlockId(req, res) {

    var call_stored_proc = "CALL sp_GetBlockAllRooms('" + req.query.bId + "')";

    connection.query(call_stored_proc, true, (error, results, fields) => {
    if (error) {
        errorController.LogError(error);
        return res.send(error.code);
    }
    res.send(results[0]);
   
    });
   // connection.end();     
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

    console.log(call_stored_proc);

    connection.query(call_stored_proc, true, (error, results, fields) => {
    if (error) {
        errorController.LogError(error);
        return res.send(error.code);
    }
    res.send(results[0]);
   
    });
   // connection.end();     
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

    call_stored_proc +=  req.body.room_id + "','"
    + req.body.room_no + "','"
    + req.body.floor_no + "','"
    + req.body.total_beds + "','"
    + req.body.room_rent + "','"
    + req.body.has_AC + "','"
    + req.body.has_cooler + "','"
    + req.body.has_western_toilet + "','"
    + req.body.has_indian_toilet + "','"
    + req.body.has_solar_geyser + "','"    
    + req.body.is_available + "',"

    // Since notes is an optional field, we pass this as null
    if (req.body.notes == '' || req.body.notes == null){
        call_stored_proc += null        
    }
    else {
        call_stored_proc +=  "'" + req.body.notes + "'"
    }

    call_stored_proc += ")";

    connection.query(call_stored_proc, true, (error, results, fields) => {
    if (error) {
        errorController.LogError(error);
        return res.send(error.code);
    }
    res.send(results[0]);
    });
      
    //connection.end();   
}