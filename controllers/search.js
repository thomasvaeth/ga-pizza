var express = require('express');
var router = express.Router();
var request = require('request');
var db = require('../models');

var yelp = require('yelp').createClient({
  consumer_key: process.env.YELP_CONSUMER_KEY, 
  consumer_secret: process.env.YELP_CONSUMER_SECRET,
  token: process.env.YELP_TOKEN,
  token_secret: process.env.YELP_TOKEN_SECRET
});

var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: false}));

router.get('/', function(req, res) {
	var latitude = req.query.latitude;
	var longitude = req.query.latitude;
	yelp.search({term: "pizza", location: 'Seattle', cll: latitude + ',' + longitude}, function(error, data) {
  	res.send(data);
	});
});

module.exports = router;