var express = require('express');
var router = express.Router();
var request = require('request');
var db = require('../models');
var bcrypt = require('bcrypt');

var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: false}));

router.post('/signup', function(req, res) {
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
				req.session.user = user.id;
				res.redirect('/');
			} else {
				res.redirect('/signup');
			}
		});
	} else {
		consol.log('Passwords do not match!~');
		res.redirect('/signup');
	}
});

router.get('/signup', function(req, res) {
	res.render('signup');
});

router.post('/login', function(req, res) {
	db.user.find({
		where: {
			email: req.body.email
		}
	}).then(function(user) {
		if (user) {
			bcrypt.compare(req.body.password, user.password, function(err, result) {
				if (err) {
					console.log(err);
				}
				if (result) {
					req.session.user = {
						id: user.id,
						firstName: user.firstName,
						lastName: user.lastName,
						email: user.email
					}
					console.log('Logged in.');
					req.session.user = user.id;
					res.redirect('/');
				} else {
					console.log('Incorrect password.');
					res.redirect('login');
				}
			});
		} else {
			console.log('No email found.');
			res.redirect('signup');
		}
	});
});

router.get('/login', function(req, res) {
	res.render('login');
});

module.exports = router;