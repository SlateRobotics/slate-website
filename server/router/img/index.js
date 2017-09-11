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

router.get('/icon-logo-grey', function (req, res, next) {
	res.sendFile(path.join(__dirname, _root, '/icon-logo-grey.png'));
});

router.get('/icon-logo-white', function (req, res, next) {
	res.sendFile(path.join(__dirname, _root, '/icon-logo-white.png'));
});

router.get('/slate-tr1-1', function (req, res, next) {
	res.sendFile(path.join(__dirname, _root, '/slate-tr1-1.png'));
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

router.get('/slate-tr1-6', function (req, res, next) {
	res.sendFile(path.join(__dirname, _root, '/slate-tr1-6.png'));
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

router.get('/icon-gpu', function (req, res, next) {
	res.sendFile(path.join(__dirname, _root, '/icon-gpu.png'));
});

router.get('/icon-ubuntu', function (req, res, next) {
	res.sendFile(path.join(__dirname, _root, '/icon-ubuntu.svg'));
});

router.get('/icon-battery', function (req, res, next) {
	res.sendFile(path.join(__dirname, _root, '/icon-battery.svg'));
});

router.get('/icon-wifi', function (req, res, next) {
	res.sendFile(path.join(__dirname, _root, '/icon-wifi.png'));
});

router.get('/icon-facebook', function (req, res, next) {
	res.sendFile(path.join(__dirname, _root, '/icon-facebook.svg'));
});

router.get('/icon-linkedin', function (req, res, next) {
	res.sendFile(path.join(__dirname, _root, '/icon-linkedin.svg'));
});

router.get('/icon-twitter', function (req, res, next) {
	res.sendFile(path.join(__dirname, _root, '/icon-twitter.svg'));
});

router.get('/zach', function (req, res, next) {
	res.sendFile(path.join(__dirname, _root, '/zach.jpg'));
});

router.get('/brian', function (req, res, next) {
	res.sendFile(path.join(__dirname, _root, '/brian.jpg'));
});

router.get('/powered-by-stripe', function (req, res, next) {
	res.sendFile(path.join(__dirname, _root, '/powered-by-stripe.png'));
});

module.exports = router;
