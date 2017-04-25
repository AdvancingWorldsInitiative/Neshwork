var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passwordHash = require('password-hash');

var app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));

var path = require('path');
app.use(express.static(path.join(__dirname, 'includes')))

app.set('view engine','ejs');

var routes = require('./routes');

app.get('/', routes.home);
app.get('/login', routes.login);
app.get('/register', routes.register);
app.get('/reg_success', routes.reg_success);


var reg_process = require('./includes/reg_process');
app.post('/reg_process', function(req, res){
	reg_process.register(req, res);
})



app.get('*', routes.notFound);

app.listen(3000, function(){
	console.log('App running on port 3000')
})