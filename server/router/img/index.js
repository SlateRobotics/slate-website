var express = require('express');
var router = express.Router();
var path = require('path');

var _root = '../../images';

router.get('/favicon.ico', function (req, res, next) {
	res.sendFile(path.join(__dirname, _root, '/favicon.ico'));
});

router.get('/wait', function (req, res, next) {
	res.sendFile(path.join(__dirname, _root, '/wait.gif'));
});

router.get('/logo-icon', function (req, res, next) {
	res.sendFile(path.join(__dirname, _root, '/logo-icon.png'));
});

router.get('/slate-tr1-1', function (req, res, next) {
	res.sendFile(path.join(__dirname, _root, '/slate-tr1-1.jpg'));
});

router.get('/slate-tr1-2', function (req, res, next) {
	res.sendFile(path.join(__dirname, _root, '/slate-tr1-2.png'));
});

router.get('/slate-tr1-2', function (req, res, next) {
	res.sendFile(path.join(__dirname, _root, '/slate-tr1-2.jpg'));
});

module.exports = router;
