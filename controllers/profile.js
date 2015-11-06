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
	db.user.findById(req.session.user).then(function(user) {
		db.pizza.findOrCreate({
			where: {
				yelpId: yelpId
			},
			defaults: {
				name: name, 
				city: city, 
				rating: rating, 
				latitude: lat, 
				longitude: lng
			}
		}).spread(function(pizza, created) {
			user.addPizza(pizza).then(function() {
				res.redirect('/profile');
			});
		});
	});
});

router.get('/', function(req, res) {
	if (req.currentUser) {
		db.user.findById(req.session.user).then(function(user) {
			user.getPizzas().then(function(pizzas) {
				res.render('profile', {user: user, pizzas: pizzas});
			});
		});
	} else {
		res.redirect('/');
	}
});

module.exports = router;