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
		res.render('login', {
		title: 'Neshwork - Login',
		logged_in: false,
		error: ['Username or password is incorrect']
	})
	}
}

exports.verifylogin = function (req,callback){
	var name = req.cookies.name;
	var login_string = req.cookies.login_string;
	if(req.cookies.name == null || req.cookies.name == ''){
		logged_in = false
	} else {
		logged_in = true
	}
	callback(logged_in,name)
}

exports.getstats = function (person, callback){
	db.query('SELECT * FROM users', done2)
	function done2(rows){
		for(var i=0;i<rows.length;i++){
			console.log(rows[i].name,person)
			if(rows[i].name == person){
				callback(rows[i].lastseen,rows[i].status,rows[i].msgcount)
			}
		}
	}
}