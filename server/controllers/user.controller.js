var mysql = require('mysql');
var config = require('../mysqlconfig.js');
var errorController = require('./error.controller');

var connection = mysql.createConnection(config);


/**
 *  Find user by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

export function findById(req, res) {

    var call_stored_proc = "CALL sp_CheckIfUser('" +  req.params.id + "')";

    //console.log(call_stored_proc);

    connection.query(call_stored_proc, true, (error, results, fields) => {
    if (error) {
        errorController.LogError(error);
        return res.send(error.code);
    }
    res.send(results[0]);
    //console.log(results[0]);
   
    });
   // connection.end();     
}
