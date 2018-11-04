var mysql = require('mysql');
var config = require('../mysqlconfig.js');
var errorController = require('./error.controller.js');

var connection = mysql.createConnection(config);

/**
 * Insert emergency contact for Guest Id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function add(req, res) {

    var call_stored_proc = "CALL sp_InsertGuestEmergencyContactDetails(" 

    call_stored_proc += "'" + req.body.guest_id + "'";

    call_stored_proc += ",";

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
}

/**
 * Update emergency contact for Guest Id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function update(req, res) {

    var call_stored_proc = "CALL sp_UpdateGuestEmergencyContactDetails(" 

    call_stored_proc += "'" + req.params.id + "'";

    call_stored_proc += ",";

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
}