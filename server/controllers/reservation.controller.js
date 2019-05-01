var mysql = require('mysql');
var config = require('../mysqlconfig.js');
var pool = mysql.createPool(config);

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

    pool.getConnection(function(error, connection) {
        if (error) {
            errorController.LogError(error);
            return res.send(error.code);
        } 

        connection.query(call_stored_proc, true, (error, results, fields) => {
            res.send(results[0]); 
            connection.release();

            if (error) {
                // console.log("name" + error.name);
                // console.log("message" + error.message);
                // console.log("sql message" + error.sqlMessage)
                errorController.LogError(error);
                return res.send(error.code);
            }

        });
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

    pool.getConnection(function(error, connection) {
        if (error) {
            errorController.LogError(error);
            return res.send(error.code);
        } 

        connection.query(call_stored_proc, true, (error, results, fields) => {
            if ((req.body.email_id != null) && (req.body.email_id != '')){
                SendConfirmationEmail(req.body.name, req.body.email_id, (moment(req.body.date_of_arrival, "YYYY-MM-D HH:mm").format("MMM Do, YYYY") 
                + " - " + moment(req.body.date_of_departure, "YYYY-MM-D").format("MMM Do, YYYY")), 
                results[0][0].noOfRooms, results[0][0].totalAmt, results[0][0].reservationId,
                req.body.reservation_type_id, req.body.sanskara_id, req.body.reference_id, req.body.has_WL, 
                req.body.email_comments, req.body.total_beds);
             }
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
 * Update reservation details
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function update(req, res) {

    var call_stored_proc = "";
    
    if (req.body.isRequest == 0){
        call_stored_proc = "CALL sp_UpdateReservationDetails('";
    } else {
        call_stored_proc = "CALL sp_UpdateReservationForRequests('"; 
    }

    call_stored_proc += req.params.id + "','" // reservation_id
    + req.body.date_of_arrival + "','"
    + req.body.date_of_departure + "','"

    //no_of_people does not have the ' after the ,  
    + req.body.no_of_people + "',";

    // Since reservation_comments is an optional field, we pass this as null
    if (req.body.reservation_comments == '' || req.body.reservation_comments == null){
        call_stored_proc += null;        
    }
    else {
        var reservation_comments = req.body.reservation_comments.replace(/'/g, "''");  
        call_stored_proc +=  "'" + reservation_comments + "'";
    }
 
    call_stored_proc +=  ",'" + req.body.reservation_type_id + "',";

    // Since sankara is an optional field, we pass this as null
    if (req.body.sanskara_id == 0){
        call_stored_proc += null;
    }
    else {
        call_stored_proc +=  "'" + req.body.sanskara_id + "'";
    }

    call_stored_proc += ")";

    pool.getConnection(function(error, connection) {
        if (error) {
            errorController.LogError(error);
            return res.send(error.code);
        } 

        connection.query(call_stored_proc, true, (error, results, fields) => {
           if ((req.body.isRequest != 0) && (req.body.email_id != null) && (req.body.email_id != '')){
                SendConfirmationEmail(req.body.name, req.body.email_id, (moment(req.body.date_of_arrival, "YYYY-MM-D HH:mm").format("MMM Do, YYYY") 
                + " - " + moment(req.body.date_of_departure, "YYYY-MM-D").format("MMM Do, YYYY")), results[0][0].noOfRooms, results[0][0].totalAmt, req.params.id,
                 req.body.reservation_type_id, req.body.sanskara_id, req.body.reference_id, req.body.has_WL, req.body.email_comments);
             }
            connection.release();

            if (error) {
                errorController.LogError(error);
                return res.send(error.code);
            }

        });
    });     
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

    pool.getConnection(function(error, connection) {
        if (error) {
            errorController.LogError(error);
            return res.send(error.code);
        } 

        connection.query(call_stored_proc, true, (error, results, fields) => {
            connection.release();

            if (error) {
                errorController.LogError(error);
                return res.send(error.code);
            }

        });
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