

var mysql = require('mysql');
var config = require('../mysqlconfig.js');
var errorController = require('./error.controller.js');

//var crypto = require('crypto');

var connection = mysql.createConnection(config);

/**
 *  Find guest details by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
// used when navigated from Check In/ Check Outs widget
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

   // var email_token = crypto.randomBytes(64).toString('hex').substring(0,200);

    var call_stored_proc = "CALL sp_InsertGuestDetails(" 

    // If is_a_reference is not set, we pass this as 0
    if (req.body.reference_id == 0 || req.body.reference_id == ''){
        call_stored_proc += null + ",";        
    }
    else {
        call_stored_proc +=  "'" + req.body.reference_id + "',";
    }

    call_stored_proc += "'" + req.body.first_name + "'";
    call_stored_proc += ",";
    call_stored_proc += "'" + req.body.last_name + "'";
    call_stored_proc += ",";

    if (req.body.email_id != ''){
        call_stored_proc +=  "'" + req.body.email_id + "'";   
    }
    else {
        call_stored_proc += null;
    }

    call_stored_proc += ",";

    if (req.body.phone_no != ''){
        call_stored_proc += "'" + req.body.phone_no + "'";
    } else {
        call_stored_proc += null;
    }
    
    call_stored_proc += ",";

    if (req.body.address != ''){
        call_stored_proc += "'" + req.body.address + "'";
    } else {
        call_stored_proc += null;
    }

    call_stored_proc += ",";

    if (req.body.city != ''){
        call_stored_proc += "'" + req.body.city + "'";
    } else {
        call_stored_proc += null;
    }

    call_stored_proc += ",";

    if (req.body.zip_code != ''){
        call_stored_proc += "'" + req.body.zip_code + "'";
    } else {
        call_stored_proc += null;
    }

    call_stored_proc += ",";

    if (req.body.state != ''){
        call_stored_proc += "'" + req.body.state + "'";
    } else {
        call_stored_proc += null;
    }

    call_stored_proc += ",'" + req.body.country_id + "',";

    if (req.body.e_first_name != ''){
        call_stored_proc += "'" + req.body.e_first_name + "'";
    } else {
        call_stored_proc += null;
    }

    call_stored_proc += ",";

    if (req.body.e_last_name != ''){
        call_stored_proc += "'" + req.body.e_last_name + "'";
    } else {
        call_stored_proc += null;
    }

    call_stored_proc += ",";

    if (req.body.e_phone_no != ''){
        call_stored_proc += "'" + req.body.e_phone_no + "'";
    } else {
        call_stored_proc += null;
    }

    call_stored_proc += ",";

    if (req.body.e_relationship != ''){
        call_stored_proc += "'" + req.body.e_relationship + "'";
    } else {
        call_stored_proc += null;
    }

    call_stored_proc += ")";
 
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

    
    //var email_token = crypto.randomBytes(64).toString('hex').substring(0,200);

    var call_stored_proc = "CALL sp_UpdateGuestDetails('" 
    + req.params.id + "','"
    + req.body.first_name + "','"
    + req.body.last_name + "',"

    if (req.body.email_id != ''){
        call_stored_proc +=  "'" + req.body.email_id + "'";   
    }
    else {
        call_stored_proc += null;
    }

    if (req.body.phone_no != ''){
        call_stored_proc += "'" + req.body.phone_no + "'";
    } else {
        call_stored_proc += null;
    }
    
    call_stored_proc += ",";

    if (req.body.address != ''){
        call_stored_proc += "'" + req.body.address + "'";
    } else {
        call_stored_proc += null;
    }

    call_stored_proc += ",";

    if (req.body.city != ''){
        call_stored_proc += "'" + req.body.city + "'";
    } else {
        call_stored_proc += null;
    }

    call_stored_proc += ",";

    if (req.body.zip_code != ''){
        call_stored_proc += "'" + req.body.zip_code + "'";
    } else {
        call_stored_proc += null;
    }

    call_stored_proc += ",";

    if (req.body.state != ''){
        call_stored_proc += "'" + req.body.state + "'";
    } else {
        call_stored_proc += null;
    }

    call_stored_proc += ",'" + req.body.country_id + "',";

    // If is_a_reference is not set, we pass this as 0
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
    res.send(results[0]);
    });
      
    //connection.end();   
}