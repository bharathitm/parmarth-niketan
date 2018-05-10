var connection = require('../../connection.js');
var config_env = connection[global.env];
var utilController = require('../controllerUtils/UtilController.js');


var self = module.exports = {
	
	login: function (req, res) {
		try {
			var qry = "SELECT email, name, created_at FROM users WHERE email = '"+req.body.email+"' AND password = '"+req.body.password+"'";
			mysqlconnection.query(qry, function(err, results) {
				if (err) {
					utilController.LogError('1', 'loginUtils', 'login', err);
					res.status(500);
                    res.send(global.internalServerError);
				} else if(results.length > 0) {
					res.status(200);
					res.send(utilController.success100(results));
				} else {
					var result = "Email or Password wrong"
					res.status(200);
					res.send(utilController.successresponse120(result));
				}
			});
		} catch (err) {
			utilController.LogError('2', 'loginUtils', 'login', err);
			res.status(500);
			res.send(global.internalServerError);
		}
	},

	get_user_details: function(req, res) {
		try {
			var qry = "SELECT email, name, created_at FROM users WHERE id = "+req.query.user_id;
			mysqlconnection.query(qry, function(err, results) {
				if (err) {
					utilController.LogError('3', 'loginUtils', 'get_user_details', err);
					res.status(500);
                    res.send(global.internalServerError);
				} else {
					res.status(200);
					res.send(utilController.success100(results));
				}
			});
		} catch (err) {
			utilController.LogError('4', 'loginUtils', 'get_user_details', err);
			res.status(500);
			res.send(global.internalServerError);
		}
	}
}