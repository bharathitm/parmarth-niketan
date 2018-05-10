var connection = require('../../connection.js');
var config_env = connection[global.env];
var utilController = require('../controllerUtils/UtilController.js');


var self = module.exports = {
	
	LogError: function(Position, Controller, Action, Message) {
		console.log("Error:", Position, Controller, Action, Message);
		var Message = JSON.stringify(Message)
		var Message = Message.replace(/'/g, '"');
		var qry = "INSERT INTO api_error_log (position, controller, action, message) VALUES ('" + Position + "','" + Controller + "','" + Action + "','" + Message + "')"
		mysqlconnection.query(qry, function(err, results) {
			if (err) {
				console.log("LogError", err);
			}
		});
	},

	isavailable: function(parameter, req) {
		parameterArray = parameter.split(',');
		for (i = 0; i < parameterArray.length; i++) {
			if (req[parameterArray[i]] != undefined && req[parameterArray[i]] != "") {} else {
				return false;
			}
			try {
				req[parameterArray[i]] = req[parameterArray[i]].replace(/\'/g, "\\'");
				req[parameterArray[i]] = req[parameterArray[i]].replace(/\"/g, '\\"');
			} catch (err) {
			}
		}
		return true;
	},

	success: function(result, message) {
		respose = {
			"ResponseCode": "100",
			"Result": result,
			"Message": message
		}
		return respose;
	},

	newsuccessresponse: function(result, message, newmessage) {
		respose = {
			"ResponseCode": "100",
			"Result": result,
			"Message": message,
			"NewMessage": newmessage
		}
		return respose;
	},

	success100: function(result) {
		respose = {
			"ResponseCode": "100",
			"Result": result
		}
		return respose;
	},

	successresponse: function(result) {
		respose = {
			"ResponseCode": "100",
			"Message": result
		}
		return respose;
	},

	successresponse10: function(result) {
		respose = {
			"ResponseCode": "10",
			"Message": result
		}
		return respose;
	},

	successresponse120: function(result) {
		respose = {
			"ResponseCode": "120",
			"Message": result
		}
		return respose;
	},

	successresponse204: function(result) {
		respose = {
			"ResponseCode": "204",
			"Message": result
		}
		return respose;
	},

	successresponse104: function(result) {
		respose = {
			"ResponseCode": "104",
			"Message": result
		}
		return respose;
	},

	successresponse300: function(result) {
		respose = {
			"ResponseCode": "300",
			"Message": result
		}
		return respose;
	}
}