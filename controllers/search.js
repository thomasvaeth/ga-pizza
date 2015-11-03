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
	request('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng + '&key=' + process.env.GOOGLE_MAPS_KEY, function(error, response, body) {
		if (!error && response.statusCode === 200) {
			var data = JSON.parse(body);
			if (data.status === 'OK') {
				var city = data.results[0].address_components[3].long_name;
				yelp.search({term: 'pizza', category_filter: 'pizza', sort: 1, location: city, cll: lat + ',' + lng}, function(error, data) {
  				res.send(data);
				});
			} else {
				res.redirect('/');
			}
		}
	});
});

module.exports = router;