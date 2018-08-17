var mysql = require('mysql');

var config = require('../mysqlconfig.js');
var errorController = require('./error.controller');

var connection = mysql.createConnection(config);



/**
 *  Find advance donation details by Reservation Id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function findById(req, res) {

    var call_stored_proc = "CALL sp_GetAdvanceDonationDetails('" +  req.params.id + "')";

    connection.query(call_stored_proc, true, (error, results, fields) => {
    if (error) {
        errorController.LogError(error);
        return res.send(error.code);
    }
    res.send(results[0]);

    console.log(results[0]);
   
    });
   // connection.end();     
}

/**
 * Add new advance donation details for Reservation Id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function add(req, res) {

    var call_stored_proc = "CALL sp_UpdateDonationDetails(" 
    + null + ",'" //donation Id is null as this is an insert
    + req.body.reservation_id + "','"
    + req.body.guest_id + "','"
    + req.body.received_on + "','"    
    + req.body.amount + "','"
    + req.body.receipt_no + "','"
    + req.body.is_advance + "',";

    if (req.body.comments == ''){
        call_stored_proc += null;       
    }
    else {
        call_stored_proc +=  "'" + req.body.comments + "'";
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

/**
 * Update advance donation details for Reservation Id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function update(req, res) {

    var call_stored_proc = "CALL sp_UpdateDonationDetails('" 
    + req.params.id + "','" //donation Id
    + req.body.reservation_id + "','"
    + req.body.guest_id + "','"
    + req.body.received_on + "','"    
    + req.body.amount + "','"
    + req.body.receipt_no + "','"
    + req.body.is_advance + "',";

    if (req.body.comments == ''){
        call_stored_proc += null;       
    }
    else {
        call_stored_proc +=  "'" + req.body.comments + "'";
    }
    call_stored_proc += ")";

    connection.query(call_stored_proc, true, (error, results, fields) => {
    if (error) {
        errorController.LogError(error);
        return res.send(error.code);
    }
    });
      
   // connection.end();   
}

/**
 *  Cancel room booking by reservation id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

export function cancel(req, res) {

    var call_stored_proc = "CALL sp_DeleteAdvanceDonation('" + req.params.id + "')";

    connection.query(call_stored_proc, true, (error, results, fields) => {
    if (error) {
        errorController.LogError(error);
        return res.send(error.code);
    }
    res.send(results[0]);
 
    //connection.end();   
    });
}