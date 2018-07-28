var mysql = require('mysql');
import {config} from '../config.js';
var errorController = require('./error.controller');

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
 * Search reservations by email or phone
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function search(req, res) {

    var call_stored_proc = "CALL sp_SearchGuests('" + req.query.search + "')";    

    console.log(call_stored_proc);

    connection.query(call_stored_proc, true, (error, results, fields) => {
    if (error) {
        errorController.LogError(error);
        return res.send(error.code);
    }
    console.log(results[0]);
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
    + req.body.e_relationship + 
    "')";


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
 * Update guest details
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function update(req, res) {

    var call_stored_proc = "CALL sp_UpdateGuestDetails('" 
    + req.params.id + "','"
    + req.body.first_name + "','"
    + req.body.last_name + "','"
    + req.body.email_id + "','"
    + req.body.phone_no + "','"
    + req.body.address + "','"
    + req.body.city + "','"
    + req.body.zip_code + "','"
    + req.body.state + "','"
    + req.body.country_id + 
    "')";

    console.log(call_stored_proc);

    connection.query(call_stored_proc, true, (error, results, fields) => {
    if (error) {
        errorController.LogError(error);
        return res.send(error.code);
    }
    res.send(results[0]);
    });
      
    //connection.end();   
}