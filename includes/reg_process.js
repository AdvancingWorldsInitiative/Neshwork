var db = require('./db_connect');
var passwordHash = require('password-hash');

exports.register = function(req,res){
	var name = req.body.name;
	var pass = req.body.pass;
	var cnfpass = req.body.cnfpass;
	var error = [];
	var now = Math.floor(Date.now()/1000)
	if(name != '' && pass != '' && cnfpass != ''){

		if(pass != cnfpass){
			error.push('Password and confirmation do not match!')
		}

		if(name.length > 20){
			error.push('Username is too long! Please limit to 20 characters.')
		}

		/*if(pass.length < 8){
			error.push('Password must be at least 8 characters.')
		}*/

		if(/\s/g.test(name)){
			error.push('Username must not contain any whitespace. Please delete any spaces.')
		}

		if(/('|")/g.test(name)){
			error.push('Username must not contain any apostrophes or quotes.')
		}
	} else {
		error.push('All fields are required.')
	}

	if(error.length != 0){
		console.log(error.length)
		return_error(res, error)
	} else {

		db.query('SELECT * FROM users', check_user);

		function check_user(rows){
			var unique = true;
			for(var i=0;i<rows.length;i++){
				if(rows[i].name == name)
					unique = false;
			}
			if(!unique){
				error.push('There is already a user with that name! Please choose another.')
				return_error(res, error)
			} else {
				var hashpass = passwordHash.generate(pass);
				db.query("INSERT INTO users(id, name, pass, lastseen, status, msgcount, joined) VALUES ( NULL, '"+name+"', '"+hashpass+"', "+now+", '', 0, "+now+")", complete)
			}
		}

		function complete(){
			console.log('woo')
			res.redirect('/');
		}
		
	}
}

function return_error(res, error){
	res.render('register', {
		title: 'Neshwork - Sign Up',
		logged_in: false,
		error: error
	});
}