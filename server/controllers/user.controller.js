var mysql = require('mysql');
var config = require('../mysqlconfig.js');
var errorController = require('./error.controller');

var pool = mysql.createPool(config);


/**
 *  Find user by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */

export function findById(req, res) {

    var call_stored_proc = "CALL sp_CheckIfUser('" +  req.params.id + "')";

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
