var express = require('express');
var router = express.Router();
var request = require('request');
var db = require('../models');
var bcrypt = require('bcrypt');

var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: false}));

router.post('/', function(req, res) {
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

router.get('/', function(req, res) {
	res.render('login');
});

module.exports = router;