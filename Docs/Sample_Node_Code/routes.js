var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var config = require('./config.js');
// var appDir = path.dirname(require.main.filename);

module.exports = function(app) {

	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());
	
	var loginController = require('./api/controllers/loginController.js');

	// Post Method Sample
	app.post('/login', loginController.login);

	// Get Method Sample
	app.get('/get_user_details', loginController.get_user_details);

	// node app health Checkup
	app.get('/', function(req,res) {
		res.send("ok");
	});
}