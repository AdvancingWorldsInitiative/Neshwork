exports.home = function(req, res){
	res.render('home', {
		title: 'Neshwork',
		logged_in: false
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

exports.reg_success = function(req, res){
	res.send('<h2>Registration completed successfully!</h2><p>You have been automatically logged in and will be redirected to the home page in a moment..</p>')
}

exports.notFound = function(req, res){
	res.render('error', {
		error: 'Page is not found'
	});
};