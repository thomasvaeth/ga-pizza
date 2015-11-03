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
	var lat = req.query.latitude;
	var lng = req.query.longitude;
	yelp.search({term: 'pizza', category_filter: 'pizza', sort: 1, ll: lat + ',' + lng}, function(error, data) {
		res.render('search', data);
	});
});

module.exports = router;