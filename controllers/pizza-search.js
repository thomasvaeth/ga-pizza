var express = require('express');
var router = express.Router();
var request = require('request');
var db = require('../models');

var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: false}));

var yelp = require('yelp').createClient({
  consumer_key: process.env.YELP_CONSUMER_KEY, 
  consumer_secret: process.env.YELP_CONSUMER_SECRET,
  token: process.env.YELP_TOKEN,
  token_secret: process.env.YELP_TOKEN_SECRET
});

router.get('/', function(req, res) {
	if (req.query.address === undefined) {
		var lat = req.query.latitude;
		var lng = req.query.longitude;
		yelp.search({term: 'pizza', category_filter: 'pizza', sort: 1, ll: lat + ',' + lng}, function(error, data) {
			res.render('pizza/index', {data: data});
		});
	} else {
		request('https://maps.googleapis.com/maps/api/geocode/json?address=' + req.query.address + '&key=' + process.env.GOOGLE_MAPS_SERVER_KEY, function(error, response, body) {
			if (!error && response.statusCode === 200) {
				var data = JSON.parse(body);
				if (data.status === 'OK') {
					var latLng = data.results[0].geometry.location;
					yelp.search({term: 'pizza', category_filter: 'pizza', sort: 1, ll: latLng.lat + ',' + latLng.lng}, function(error, data) {
						res.render('pizza/index', {data: data});
					});
				} else {
					res.redirect('/');
				}
			}
		});
	}
});

module.exports = router;