var db = require('./db_connect');
var passwordHash = require('password-hash');

exports.login = function (req,res){
	var name = req.body.name;
	var pass = req.body.pass;
	
	db.query('SELECT * FROM users', done)

	function done(rows){
		for(var i=0;i<rows.length;i++){
			if(rows[i].name == name){
				if(passwordHash.verify(pass,rows[i].pass)){
					var user_agent = req.headers['user-agent'];
					res.cookie('uid',rows[i].id)
					res.cookie('login_string',passwordHash.generate(user_agent+rows[i].pass))
					res.cookie('name',name)
					res.redirect('/')
				}
			}
		}
	}
}

exports.verifylogin = function (req,res){
	
}