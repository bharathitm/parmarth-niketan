import bcrypt from 'bcrypt';
import HttpStatus from 'http-status-codes';

var mysql = require('mysql');
var config = require('../config.js');

var connection = mysql.createConnection(config);


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
        return res.send(error.message);
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
    + req.body.no_of_people + "',"

     // Since reservation_comments is an optional field, we pass this as null
     if (req.body.reservation_comments == undefined){
        call_stored_proc += null  + ","        
    }
    else {
        call_stored_proc +=  "'" + req.body.reservation_comments + "',"
    }

    //reservation_type_id does not have the ' after the ,  
    call_stored_proc +=  "'" + req.body.reservation_type_id + "',"

     // Since sanskara_id is an optional field, we pass this as null
    if (req.body.sanskara_id == undefined){
        call_stored_proc += null  + ","        
    }
    else {
        call_stored_proc +=  "'" + req.body.sanskara_id + "',"
    }
    

    // If is_a_reference is not set, we pass this as 0
    if (req.body.is_a_reference == undefined){
        call_stored_proc += "0,"        
    }
    else {
        call_stored_proc +=  "'" + req.body.is_a_reference + "',"
    }

     // Since advance_reminder_on is an optional field, we pass this as null
     if (req.body.advance_reminder_on == undefined){
        call_stored_proc += null
    }
    else {
        call_stored_proc +=  "'" + req.body.advance_reminder_on + "'"
    }
    
    call_stored_proc += ")";

    connection.query(call_stored_proc, true, (error, results, fields) => {
    if (error) {
        return res.send(error.message);
    }
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
    + req.body.no_of_people + "',"

    // Since reservation_comments is an optional field, we pass this as null
    if (req.body.reservation_comments == undefined){
        call_stored_proc += null  + ","        
    }
    else {
        call_stored_proc +=  "'" + req.body.reservation_comments + "',"
    }

    // Since advance_reminder_on is an optional field, we pass this as null
    if (req.body.advance_reminder_on == undefined){
        call_stored_proc += null
    }
    else {
        call_stored_proc +=  "'" + req.body.advance_reminder_on + "'"
    }

    call_stored_proc += ")";

    connection.query(call_stored_proc, true, (error, results, fields) => {
    if (error) {
        return res.send(error.message);
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

    console.log(req.params.id);
    var call_stored_proc = "CALL sp_CancelReservation('" + req.params.id + "')";

    connection.query(call_stored_proc, true, (error, results, fields) => {
    if (error) {
        return res.send(error.message);
    }
 
    //connection.end();   
    });
}