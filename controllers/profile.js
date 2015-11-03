var express = require('express');
var router = express.Router();
var request = require('request');
var db = require('../models');

var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: false}));

router.post('/', function(req, res) {
	var name = req.body.name;
	var yelpId = req.body.yelpId;
	var city = req.body.city;
	var rating = req.body.rating;
	var lat = req.body.lat;
	var lng = req.body.lng;
	db.pizza.find({where: {name: name}}).then(function(createDelete) {
		if (createDelete !== null) {
			createDelete.destroy().then(function() {
				res.redirect('/profile');
			});
		} else {
			db.pizza.create({name: name, yelpId: yelpId, city: city, rating: rating, latitude: lat, longitude: lng}).then(function(pizza) {
				res.redirect('/profile');
			});
		}
	});
});

router.get('/', function(req, res) {
	if (req.currentUser) {
		res.render('user/profile');
	} else {
		res.redirect('/');
	}
});

module.exports = router;