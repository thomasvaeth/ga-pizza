var express = require('express');
var app = express();
var db = require("./models");
var port = process.env.PORT || 3000;

var ejsLayouts = require('express-ejs-layouts');
app.use(ejsLayouts);

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/static'));

var yelp = require('yelp').createClient({
  consumer_key: process.env.YELP_CONSUMER_KEY, 
  consumer_secret: process.env.YELP_CONSUMER_SECRET,
  token: process.env.YELP_TOKEN,
  token_secret: process.env.YELP_TOKEN_SECRET
});

app.get('/', function(req, res) {
	res.render('index');
});

app.use('/signup', require('./controllers/signup'));

app.listen(port , function() {
	console.log('I just ate ' + port + ' slices of pizza.');
});