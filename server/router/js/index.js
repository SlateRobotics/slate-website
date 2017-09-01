var express = require('express');
var router = express.Router();
var path = require('path');

var _root = '../../../client';

router.use(function (req, res, next) {
	res.sendFile(path.join(__dirname, _root, '/build/bundle.js'));
});

module.exports = router;
