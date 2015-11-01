var express = require('express');
var router = express.Router();
var request = require('request');
var db = require('../models');

var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: false}));

router.post('/', function(req, res) {
	if (req.body.password === req.body.passwordConfirm) {
		db.user.findOrCreate({
			where: {
				email: req.body.email
			},
			defaults: {
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				password: req.body.password
			}
		}).spread(function(user, created) {
			if (created) {
				res.redirect('/')
			} else {
				res.redirect('/signup');
			}
		});
	} else {
		res.redirect('/signup');
	}
});

router.get('/', function(req, res) {
	res.render('signup');
});

module.exports = router;