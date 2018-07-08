var mysql = require('mysql');
var config = require('../config.js');
var errorController = require('./error.controller');

var connection = mysql.createConnection(config);


/**
 *  Find room booking by reservation id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function findById(req, res) {

    var call_stored_proc = "CALL sp_GetRoomBookings('" + req.params.id + "')";

    console.log(call_stored_proc);

    connection.query(call_stored_proc, true, (error, results, fields) => {
    if (error) {
        errorController.LogError(error);
        return res.send(error.code);
    }
    console.log(results[0]);
    res.send(results[0]);
    //connection.end();   
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

    console.log(req.body.advance_reminder_on);

    var call_stored_proc = "CALL sp_UpdateReservationDetails('" 
    + req.params.id + "','" // reservation_id
    + req.body.date_of_arrival + "','"
    + req.body.date_of_departure + "','"

    //no_of_people does not have the ' after the ,  
    + req.body.no_of_people + "',"

    // Since reservation_comments is an optional field, we pass this as null
    if (req.body.reservation_comments == '' || req.body.reservation_comments == null){
        call_stored_proc += null  + ","        
    }
    else {
        call_stored_proc +=  "'" + req.body.reservation_comments.replace("'","''") + "',"
    }

    // Since advance_reminder_on is an optional field, we pass this as null
    if (req.body.advance_reminder_on == ''){
        call_stored_proc += null
    }
    else {
        call_stored_proc +=  "'" + req.body.advance_reminder_on + "'"
    }
 
    call_stored_proc +=  ",'" + req.body.reservation_type_id + "',"

    //call_stored_proc +=  "'" + req.body.sanskara_id + "'"

    // Since sankara is an optional field, we pass this as null
    if (req.body.sanskara_id == 0){
        call_stored_proc += null
    }
    else {
        call_stored_proc +=  "'" + req.body.sanskara_id + "'"
    }

    call_stored_proc += ")";

    console.log(call_stored_proc);

    connection.query(call_stored_proc, true, (error, results, fields) => {
    if (error) {
        errorController.LogError(error);
        return res.send(error.code);
    }
    });
      
    //connection.end();   
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

    console.log(call_stored_proc);

    connection.query(call_stored_proc, true, (error, results, fields) => {
    if (error) {
        errorController.LogError(error);
        return res.send(error.code);
    }
 
    //connection.end();   
    });
}