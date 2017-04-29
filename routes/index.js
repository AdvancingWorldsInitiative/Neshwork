var func = require('../includes/functions')

exports.home = function(req, res){
	func.verifylogin(req,callback)
	function callback(logged_in,name) {
		func.get_msg(function(msgs){
			res.render('home', {
				title: 'Neshwork',
				logged_in: logged_in,
				name: name,
				msgs: msgs
			});
		})
	}
};

exports.login = function(req, res){
	func.verifylogin(req,callback2)
	function callback2(logged_in,name) {
		res.render('login', {
			title: 'Neshwork - Login',
			logged_in: logged_in,
			name: name,
			error: false
		})
	}
};

exports.register = function(req, res){
	func.verifylogin(req,callback3)
	function callback3(logged_in,name) {
		res.render('register', {
			title: 'Neshwork - Sign Up',
			logged_in: logged_in,
			name: name,
			error: false
		})
	}
}

exports.logout = function(req,res){
	res.cookie('uid', '')
	res.cookie('login_string', '')
	res.cookie('name', '')
	res.redirect('/')
}

exports.people = function(req,res){
	func.verifylogin(req,callback5)
	function callback5(logged_in,name) {
		logged_in = logged_in;
	}

	var person = req.params.person;
	if(person == ''){
		person = req.cookies.name;
	}
	func.getstats(person,callback4);
	function callback4(lastseen,status,msgcount){
		res.render('people',{
			title: 'Neshwork - '+person+'\'s Profile',
			name: person,
			lastseen: lastseen,
			status: status,
			msgcount: msgcount,
			logged_in: logged_in
		})
	}
}

exports.notFound = function(req, res){
	res.render('error', {
		error: 'Page is not found'
	});
};