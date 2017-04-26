var logged_in

function verifylogin(req){
	var name = req.cookies.name;
	var login_string = req.cookies.login_string;
	if(req.cookies.name == null || req.cookies.name == ''){
		logged_in = false
	} else {
		logged_in = true
	}
}

exports.home = function(req, res){
	verifylogin(req)
	res.render('home', {
		title: 'Neshwork',
		logged_in: logged_in
	});
};

exports.login = function(req, res){
	res.render('login', {
		title: 'Neshwork - Login',
		logged_in: false,
		error: false
	})
};

exports.register = function(req, res){
	res.render('register', {
		title: 'Neshwork - Sign Up',
		logged_in: false,
		error: false
	})
}

exports.logout = function(req,res){
	res.cookie('uid', '')
	res.cookie('login_string', '')
	res.cookie('name', '')
	res.redirect('/')
}

exports.notFound = function(req, res){
	res.render('error', {
		error: 'Page is not found'
	});
};