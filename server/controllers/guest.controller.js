import { SendWelcomeEmail } from './welcomeEmail.controller.js';

var mysql = require('mysql');
var config = require('../mysqlconfig.js');
var errorController = require('./error.controller.js');

var crypto = require('crypto');

var connection = mysql.createConnection(config);

/**
 *  Find guest details by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function findById(req, res) {

    var call_stored_proc = "CALL sp_GetGuestDetails('" + req.params.id + "')";

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
 * Search reservations by email or phone
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function search(req, res) {

    var call_stored_proc = "CALL sp_SearchGuests('" + req.query.search + "')";    

    connection.query(call_stored_proc, true, (error, results, fields) => {
    if (error) {
        errorController.LogError(error);
        return res.send(error.code);
    }
    res.send(results[0]);
    });
      
    //connection.end();   
}

/**
 * Add new guest details
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function add(req, res) {

    var email_token = crypto.randomBytes(64).toString('hex').substring(0,200);

    var call_stored_proc = "CALL sp_InsertGuestDetails('" 
    + req.body.first_name + "','"

    // Since email_id is an optional field, we pass this as null
    if (req.body.email_id == undefined){
        call_stored_proc +=  req.body.last_name + "',"
        + null  + ",'"        
    }
    else {
        call_stored_proc +=  req.body.last_name + "','"
        + req.body.email_id + "','"
    }
    
    call_stored_proc +=  req.body.phone_no + "','"
    + req.body.address + "','"
    + req.body.city + "','"
    + req.body.zip_code + "','"
    + req.body.state + "','"
    + req.body.country_id + "','"
    + req.body.e_first_name + "','"
    + req.body.e_last_name + "','"    
    + req.body.e_phone_no + "','"
    + req.body.e_relationship + "','"
    + email_token + "')";

    console.log(call_stored_proc);

    if ((req.body.email_id != null) && (req.body.email_id != '')){
        SendWelcomeEmail(req.body.first_name + " " + req.body.last_name, req.body.email_id, email_token);
    }
    
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
 * Update guest details
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function update(req, res) {

    
    var email_token = crypto.randomBytes(64).toString('hex').substring(0,200);

    var call_stored_proc = "CALL sp_UpdateGuestDetails('" 
    + req.params.id + "','"
    + req.body.first_name + "','"
    + req.body.last_name + "',"

    if (req.body.email_id == ''){
        call_stored_proc += null  + ",'"        
    }
    else {
        call_stored_proc +=  "'" + req.body.email_id+ "','"
    }

    //+ req.body.email_id + "','"
    call_stored_proc += req.body.phone_no + "','"
    call_stored_proc += req.body.address + "','"
    call_stored_proc += req.body.city + "','"
    call_stored_proc += req.body.zip_code + "','"
    call_stored_proc += req.body.state + "','"
    call_stored_proc += req.body.country_id + "','"
    call_stored_proc += email_token + "')";

    if ((req.body.email_id != null) && (req.body.email_id != '') && req.body.has_email_changed == 1){
        SendWelcomeEmail(req.body.first_name + " " + req.body.last_name, req.body.email_id, email_token);
    }

    connection.query(call_stored_proc, true, (error, results, fields) => {
    if (error) {
        errorController.LogError(error);
        return res.send(error.code);
    }
    res.send(results[0]);
    });
      
    //connection.end();   
}