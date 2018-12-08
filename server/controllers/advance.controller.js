var mysql = require('mysql');

var config = require('../mysqlconfig.js');
var errorController = require('./error.controller.js');

var pool = mysql.createPool(config);



/**
 *  Find advance donation details by Reservation Id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function findById(req, res) {

    var call_stored_proc = "CALL sp_GetAdvanceDonationDetails('" +  req.params.id + "')";

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
 *  Cancel room booking by reservation id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

export function cancel(req, res) {

    var call_stored_proc = "CALL sp_DeleteAdvanceDonation('" + req.params.id + "')";

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