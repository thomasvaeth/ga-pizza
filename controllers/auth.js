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
				req.flash('success', 'You are signed up and logged in.');
				res.redirect('/');
			} else {
				req.flash('danger', 'A user previously signed up with that email address.');
				res.redirect('/signup');
			}
		}).catch(function(err) {
			req.flash('danger', 'Error!!!1');
			res.redirect('/signup');
		})
	} else {
		req.flash('danger', 'Passwords do not match!~');
		res.redirect('/signup');
	}
});

router.get('/signup', function(req, res) {
	res.render('user/signup');
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
					req.session.user = user.id;
					req.flash('success', 'Logged in.');
					res.redirect('/');
				} else {
					req.flash('danger', 'Incorrect email or password.');
					res.redirect('/login');
				}
			});
		} else {
			console.log('No email found.');
			res.redirect('/signup');
		}
	});
});

router.get('/login', function(req, res) {
	res.render('user/login');
});

module.exports = router;