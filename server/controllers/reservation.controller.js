var mysql = require('mysql');
var config = require('../mysqlconfig.js');
var connection = mysql.createConnection(config);

var errorController = require('./error.controller');

var moment = require('moment');

import { SendConfirmationEmail } from './reservationconf.controller.js';


/**
 *  Find reservation by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function findById(req, res) {

    var call_stored_proc = "CALL sp_GetReservationDetails('" + req.params.id + "')";

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
 * Add new reservation details
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function add(req, res) {

    var call_stored_proc = "CALL sp_InsertReservationDetails('" 
    + req.body.guest_id + "','"
    + req.body.date_of_arrival + "','"
    + req.body.date_of_departure + "','"

    //no_of_people does not have the ' after the ,  
    + req.body.no_of_people + "',";

     // Since reservation_comments is an optional field, we pass this as null
     if (req.body.reservation_comments == ''){
        call_stored_proc += null  + ",";        
    }
    else {
        var reservation_comments = req.body.reservation_comments.replace(/'/g, "''");  
        call_stored_proc +=  "'" + reservation_comments + "',";
    }

    //reservation_type_id does not have the ' after the ,  
    call_stored_proc +=  "'" + req.body.reservation_type_id + "',";

     // Since sanskara_id is an optional field, we pass this as null
    if (req.body.sanskara_id == 0) {
        call_stored_proc += null  + ",";        
    }
    else {
        call_stored_proc +=  "'" + req.body.sanskara_id + "',";
    }

    //room_ids_str does not have the ' after the ,  
    call_stored_proc +=  "'" + req.body.room_ids_str + "'";
    
    call_stored_proc += ")";

    connection.query(call_stored_proc, true, (error, results, fields) => {
    if (error) {
        errorController.LogError(error);
        return res.send(error.code);
    }

    if ((req.body.email_id != null) && (req.body.email_id != '')){
       SendConfirmationEmail(req.body.name, req.body.email_id, (moment(req.body.date_of_arrival, "YYYY-MM-D HH:mm").format("MMM Do, YYYY") 
       + " - " + moment(req.body.date_of_departure, "YYYY-MM-D").format("MMM Do, YYYY")), results[0][0].noOfRooms, results[0][0].totalAmt, results[0][0].reservationId,
        req.body.reservation_type_id, req.body.sanskara_id, req.body.reference_id, req.body.has_WL);
    }

    res.send(results[0]);
    });
      
    //connection.end();   

}

/**
 * Update reservation details
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function update(req, res) {

    var call_stored_proc = "CALL sp_UpdateReservationDetails('" 
    + req.params.id + "','" // reservation_id
    + req.body.date_of_arrival + "','"
    + req.body.date_of_departure + "','"

    //no_of_people does not have the ' after the ,  
    + req.body.no_of_people + "',";

    // Since reservation_comments is an optional field, we pass this as null
    if (req.body.reservation_comments == '' || req.body.reservation_comments == null){
        call_stored_proc += null  + ",";        
    }
    else {
        var reservation_comments = req.body.reservation_comments.replace(/'/g, "''");  
        call_stored_proc +=  "'" + reservation_comments + "',";
    }

    // Since advance_reminder_on is an optional field, we pass this as null
    if (req.body.advance_reminder_on == ''){
        call_stored_proc += null;
    }
    else {
        call_stored_proc +=  "'" + req.body.advance_reminder_on + "'";
    }
 
    call_stored_proc +=  ",'" + req.body.reservation_type_id + "',";

    //call_stored_proc +=  "'" + req.body.sanskara_id + "'"

    // Since sankara is an optional field, we pass this as null
    if (req.body.sanskara_id == 0){
        call_stored_proc += null + ",";
    }
    else {
        call_stored_proc +=  "'" + req.body.sanskara_id + "',";
    }

    if (req.body.reference_id == 0 || req.body.reference_id == ''){
        call_stored_proc += null;
    }
    else {
        call_stored_proc +=  "'" + req.body.reference_id + "'";
    }

    call_stored_proc += ")";

    connection.query(call_stored_proc, true, (error, results, fields) => {
    if (error) {
        errorController.LogError(error);
        return res.send(error.code);
    }
    });
      
    //connection.end();   
}

/**
 *  Cancel reservation by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

export function cancel(req, res) {

    var call_stored_proc = "CALL sp_CancelReservation('" + req.params.id + "')";

    connection.query(call_stored_proc, true, (error, results, fields) => {
    if (error) {
        errorController.LogError(error);
        return res.send(error.code);
    }
 
    //connection.end();   
    });
}

/**
 * Find all reservations for given date range
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function findByDates(req, res) {

    var call_stored_proc = "CALL sp_GetReportReservationDetails('" 
    + req.query.adate + "','"
    + req.query.ddate + "')";    

    connection.query(call_stored_proc, true, (error, results, fields) => {
    if (error) {
        errorController.LogError(error);
        return res.send(error.code);
    }
    res.send(results[0]);
    });
      
    //connection.end();   
}