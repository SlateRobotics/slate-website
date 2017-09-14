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

router.get('/slate-tr1-7', function (req, res, next) {
	res.sendFile(path.join(__dirname, _root, '/slate-tr1-7.png'));
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

router.get('/icon-gyroscope', function (req, res, next) {
	res.sendFile(path.join(__dirname, _root, '/icon-gyroscope.png'));
});

router.get('/icon-weights', function (req, res, next) {
	res.sendFile(path.join(__dirname, _root, '/icon-weights.png'));
});

router.get('/icon-range', function (req, res, next) {
	res.sendFile(path.join(__dirname, _root, '/icon-range.png'));
});

router.get('/icon-torque', function (req, res, next) {
	res.sendFile(path.join(__dirname, _root, '/icon-torque.png'));
});

router.get('/icon-engine', function (req, res, next) {
	res.sendFile(path.join(__dirname, _root, '/icon-engine.png'));
});

router.get('/icon-up', function (req, res, next) {
	res.sendFile(path.join(__dirname, _root, '/icon-up.png'));
});

router.get('/icon-force', function (req, res, next) {
	res.sendFile(path.join(__dirname, _root, '/icon-force.png'));
});

router.get('/icon-switch', function (req, res, next) {
	res.sendFile(path.join(__dirname, _root, '/icon-switch.png'));
});

router.get('/icon-point-cloud', function (req, res, next) {
	res.sendFile(path.join(__dirname, _root, '/icon-point-cloud.png'));
});

router.get('/icon-frame-rate', function (req, res, next) {
	res.sendFile(path.join(__dirname, _root, '/icon-frame-rate.png'));
});

router.get('/icon-rgb', function (req, res, next) {
	res.sendFile(path.join(__dirname, _root, '/icon-rgb.png'));
});

router.get('/icon-voltage', function (req, res, next) {
	res.sendFile(path.join(__dirname, _root, '/icon-voltage.png'));
});

router.get('/icon-power', function (req, res, next) {
	res.sendFile(path.join(__dirname, _root, '/icon-power.png'));
});

router.get('/icon-open-source', function (req, res, next) {
	res.sendFile(path.join(__dirname, _root, '/icon-open-source.png'));
});

router.get('/icon-ssh', function (req, res, next) {
	res.sendFile(path.join(__dirname, _root, '/icon-ssh.png'));
});

router.get('/icon-vnc', function (req, res, next) {
	res.sendFile(path.join(__dirname, _root, '/icon-vnc.png'));
});

router.get('/icon-cuda', function (req, res, next) {
	res.sendFile(path.join(__dirname, _root, '/icon-cuda.png'));
});

router.get('/icon-chip', function (req, res, next) {
	res.sendFile(path.join(__dirname, _root, '/icon-chip.png'));
});

router.get('/ubuntu', function (req, res, next) {
	res.sendFile(path.join(__dirname, _root, '/ubuntu.jpg'));
});

router.get('/nvidia-jetson-tx1', function (req, res, next) {
	res.sendFile(path.join(__dirname, _root, '/nvidia-jetson-tx1.png'));
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
