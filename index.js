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

app.get('/', function(req, res) {
	res.render('index');
});

app.use('/', require('./controllers/auth'));

app.use('/search', require('./controllers/pizza-search'));
app.use('/search', require('./controllers/pizza-information'));

app.use('/profile', require('./controllers/profile'));

app.delete('/delete/:idx', function(req, res) {
	var idx = req.params.idx;
	db.pizza.find({where: {yelpId: idx}}).then(function(pepperoni) {
		db.pizza.findById(pepperoni.id).then(function(cheese) {
			cheese.removeUser(req.currentUser.id).then(function() {
				res.send('Ajax');
			});
		});
	});
});

app.listen(port , function() {
	console.log('I just ate ' + port + ' slices of pizza.');
});