var express = require('express');
var app = express();
var mysql = require('mysql');
var connection = require('./connection.js');
env = global.env = process.env.ENVIRONMENT || "LocalEnv"; //Set the environment here Production|Staging|Development
config_env = connection; 
require('./routes.js')(app);

function CreateMysqlConnection() {

	mysqlconnection = mysql.createConnection(connection[env].databaseConnection);
	// Recreate the connection, sinc the old one cannot be reused. The server is either down or restarting (takes a while sometimes).
	mysqlconnection.connect(function(err) {
		if (err) {
			// We introduce a delay before attempting to reconnect, to avoid a hot loop, and to allow our node script to process asynchronous requests in the meantime. If you're also serving http, display a 503 error.
			console.log('error when connecting to db:', err);
			fs.appendFile('mysql_error.log', '\nError 1: Error in CreateMysqlConnection: ' + JSON.stringify(err));
			setTimeout(CreateMysqlConnection, 3000);
		}
	});
	mysqlconnection.on('error', function(err) {
		fs.appendFile('mysql_error.log', '\nError 2: Error in CreateMysqlConnection: ' + JSON.stringify(err));
		// Connection to the MySQL server is usually lost due to either server restart.
		if (err.code === 'PROTOCOL_CONNECTION_LOST' || err.code === 'ECONNRESET') {
			CreateMysqlConnection();
		}
	});
}

CreateMysqlConnection();

// testing a select every 3 seconds :
// to try the code you can stop mysql service => select will fail
// if you start mysql service => connection will restart correctly => select will succeed
setInterval(function() {
	mysqlconnection.query('select 1', function(err, results) {
		if (err) {
			fs.appendFile('mysql_error.log', '\nError 5: Error in CreateWrireMysqlConnectionFatal: ' + JSON.stringify(err));
			if (err.code == "PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR" || err.code == "ECONNREFUSED" || err.code == "ETIMEDOUT") {
				mysqlconnection.destroy();
				CreateMysqlConnection();
			}
		}
	});
}, 3000);

// Set the express app port
app.listen(connection[env].port, function() {
	console.log("start of app port "+ connection[env].port)
});