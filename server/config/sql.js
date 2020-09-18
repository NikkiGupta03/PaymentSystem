var mysql = require('mysql');
var connection = require("./config");

exports.executeSql = function (sql, callback) {
	var connect = mysql.createConnection(connection.dbconfig);
	connect.connect(function (err) {
		if (!err) {
			connect.query(sql, function (err, data) {
				if (!err) {
					connect.end();
					callback(null, data);
					console.log('connect DB successfully');
				}
				else {
					connect.end();
					console.log('notconnected',err);
					err.status = 500;
					callback(err, null);
				}
			});

		}
		else {
			connect.end();
			console.log('not correct config',err);
			err.status = 500;
		}
	});
};
