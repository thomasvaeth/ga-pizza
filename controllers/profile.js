var express = require('express');
var router = express.Router();
var request = require('request');
var db = require('../models');

var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: false}));

router.get('/', function(req, res) {
	if (req.currentUser) {
		res.render('user/profile');
	} else {
		res.redirect('/');
	}
});

module.exports = router;