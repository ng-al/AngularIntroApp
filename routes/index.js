/* Copyright (c) 2015 Alvin Pivowar */
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Intro to AngularJS' });
});

module.exports = router;
