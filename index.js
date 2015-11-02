var express = require('express');
var app = express();
var session = require('express-session');
var flash = require('connect-flash');
var db = require("./models");
var port = process.env.PORT || 3000;

var ejsLayouts = require('express-ejs-layouts');
app.use(ejsLayouts);

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/static'));

app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: true
}));

app.use(flash());

app.use(function(req, res, next) {
	if (req.session.user) {
		db.user.find({where: {id: req.session.user}}).then(function (user) {
			req.currentUser = user;
			next();
		});
	} else {
		req.currentUser = false;
		next();
	}
});

app.use(function(req, res, next) {
	res.locals.currentUser = req.currentUser;
	res.locals.alerts = req.flash();
	next();
});

var yelp = require('yelp').createClient({
  consumer_key: process.env.YELP_CONSUMER_KEY, 
  consumer_secret: process.env.YELP_CONSUMER_SECRET,
  token: process.env.YELP_TOKEN,
  token_secret: process.env.YELP_TOKEN_SECRET
});

app.get('/', function(req, res) {
	res.render('index');
});

app.use('/', require('./controllers/auth'));

app.use('/profile', require('./controllers/profile'));

app.listen(port , function() {
	console.log('I just ate ' + port + ' slices of pizza.');
});