

var mysql = require('mysql');
var config = require('../mysqlconfig.js');
var errorController = require('./error.controller.js');

//var crypto = require('crypto');

var pool = mysql.createPool(config);

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

    console.log(call_stored_proc);

    pool.getConnection(function(error, connection) {
        if (error) {
            errorController.LogError(error);
            return res.send(error.code);
        } 

        connection.query(call_stored_proc, true, (error, results, fields) => {
            res.send(results[0]); 
            console.log(results[0]);
            connection.release();

            if (error) {
                errorController.LogError(error);
                return res.send(error.code);
            }

        });
    });       
}

/**
 * Search email ids
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function searchEmailIds(req, res) {

    var call_stored_proc = "CALL sp_GetGuestEmailIds('" + req.query.email + "')";   

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
 * Search email ids
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function searchPhoneNos(req, res) {

    var call_stored_proc = "CALL sp_GetGuestPhoneNos('" + req.query.phone + "')";   

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

// /**
//  * Search guest details by reservationId
//  *
//  * @param {object} req
//  * @param {object} res
//  * @returns {*}
//  */
// export function searchByReservationId(req, res) {

//     var call_stored_proc = "CALL sp_GetGuestByReservationId('" + req.query.rId + "')";   

//     pool.getConnection(function(error, connection) {
//         if (error) {
//             errorController.LogError(error);
//             return res.send(error.code);
//         } 

//         connection.query(call_stored_proc, true, (error, results, fields) => {
//             res.send(results[0]); 
//             connection.release();

//             if (error) {
//                 errorController.LogError(error);
//                 return res.send(error.code);
//             }

//         });
//     });    
// }

/**
 * Search reservations by email or phone
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function search(req, res) {

    var call_stored_proc = "CALL sp_SearchGuests('" + req.query.search + "')";   

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
 * Add new guest details
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function add(req, res) {

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
        var address = req.body.address.replace(/'/g, "''");  
        call_stored_proc += "'" + address + "'";
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

    // If is_a_reference is not set, we pass this as 0
    if (req.body.reference_id == 0 || req.body.reference_id == ''){
        call_stored_proc += null;        
    }
    else {
        call_stored_proc +=  "'" + req.body.reference_id + "'";
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