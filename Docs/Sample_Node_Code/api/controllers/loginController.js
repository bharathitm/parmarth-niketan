var utilController = require('../controllerUtils/UtilController.js');
var loginController = require('../controllerUtils/loginUtils.js');

module.exports = {

	login:function(req, res) {
		try {
			// To Check in parameter available
			if (utilController.isavailable('email,password', req.body)) {
				loginController.login(req, res);
			} else {
				res.status(449);
				res.send(global.requestNull);
			}
		} catch (err) {
			utilController.LogError('1', 'loginController', 'login', err);
			res.status(500);
			res.send(global.internalServerError);
		}
	},

	get_user_details: function(req, res) {
		try {
			if (utilController.isavailable('user_id', req.query)) {
				loginController.get_user_details(req, res);
			} else {
				res.status(449);
				res.send(global.requestNull);
			}
		} catch (err) {
			utilController.LogError('2', 'loginController', 'get_user_details', err);
			res.status(500);
			res.send(global.internalServerError);
		}
	}
}
