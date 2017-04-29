var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passwordHash = require('password-hash');

var app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));

var http = require('http').Server(app);
var io = require('socket.io')(http);

var func = require('./includes/functions')

var path = require('path');
app.use(express.static(path.join(__dirname, 'includes')))

app.set('view engine','ejs');

var routes = require('./routes');

app.get('/', routes.home);
app.get('/login', routes.login);
app.get('/register', routes.register);
app.get('/logout', routes.logout);
app.get('/people/:person?', routes.people);



var reg_process = require('./includes/reg_process');
app.post('/register', function(req, res){
	reg_process.register(req, res);
})

app.post('/login', function(req, res){
	func.login(req, res)
})

app.post('/', function(req,res){
	func.send_msg(req, res)
})



app.get('*', routes.notFound);

io.on('connection', function(socket){
	socket.on('msg',function(){
		console.log('wew')
		io.emit('msg')
	})
})

http.listen(3000, function(){
	console.log('App running on port 3000');
})