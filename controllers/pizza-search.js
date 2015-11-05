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

router.get('/:idx', function(req, res) {
	var idx = req.params.idx;
	db.user.find({
		where: {
			id: req.currentUser.id,
		},
		include: [{
			model: db.pizza,
			where: {yelpId: idx}
		}]
	}).then(function(user) {
		yelp.business(idx, function(error, data) {
		  res.render('pizza/show', {data: data, visited: user && user.pizzas.length});
		});
	})
});

module.exports = router;