global.APIKEY = "c345d6a0-8a2d-11e6-aaad-7365a675f33";

global.requestNull = {
	"ResponseCode": "001",
	"Message": "Request Parameter is null"
};

global.invalidAPI = {
	"ResponseCode": "002",
	"Message": "Invalid API"
};

global.internalServerError = {
	"ResponseCode": "99",
	"Message": "Internal Server Error, please contact the admin"
};

global.invalidUser = {
	"ResponseCode": "003",
	"Message": "Please verify user name or password"
};

global.userExist = {
	"ResponseCode": "120",
	"Message": "User already exist please Login"
};

global.userNotExist = {
	"ResponseCode": "120",
	"Message": "Please verify user name or password"
};

global.fileRenameFailed = {
	"ResponseCode": "1000",
	"Message": "File Rename Failed"
};

global.fileRenameSuccess = {
	"ResponseCode": "1001",
	"Message": "File Rename Success"
};

global.mysql = require('mysql');

