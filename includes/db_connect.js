var app = require('../app');
var mysql = require('mysql');
var conf = require('./db_config');

var con = mysql.createConnection({
	host: conf.host,
	user: conf.user,
	password: conf.password,
	database: conf.database
});


exports.query = function (query,callback){
	console.log('hello')
	/*con.connect(function(err){
	if(err){
		console.log('Connection to DB failed! '+err);
		return err;
	}*/

	con.query(query, function(err,rows,fields){
		//con.end();
		if(!err){
			callback(rows)
		}else{
			console.log('Error while querying DB '+err)
			return err;
		}
	})
//});

}