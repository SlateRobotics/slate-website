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

router.get('/slate-tr1-3', function (req, res, next) {
	res.sendFile(path.join(__dirname, _root, '/slate-tr1-3.png'));
});

router.get('/slate-tr1-4', function (req, res, next) {
	res.sendFile(path.join(__dirname, _root, '/slate-tr1-4.png'));
});

router.get('/slate-tr1-5', function (req, res, next) {
	res.sendFile(path.join(__dirname, _root, '/slate-tr1-5.png'));
});

router.get('/slate-tr1-specs-1', function (req, res, next) {
	res.sendFile(path.join(__dirname, _root, '/slate-tr1-specs-1.png'));
});

router.get('/slate-tr1-specs-2', function (req, res, next) {
	res.sendFile(path.join(__dirname, _root, '/slate-tr1-specs-2.png'));
});

router.get('/slate-tr1-specs-3', function (req, res, next) {
	res.sendFile(path.join(__dirname, _root, '/slate-tr1-specs-3.png'));
});

router.get('/slate-tr1-specs-4', function (req, res, next) {
	res.sendFile(path.join(__dirname, _root, '/slate-tr1-specs-4.png'));
});

module.exports = router;
