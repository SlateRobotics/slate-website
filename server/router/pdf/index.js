var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

var _root = '../../pdfs';

router.get('*', function (req, res, next) {
	var fileName = path.join(__dirname, _root, '/' + req.originalUrl.replace('/pdf/',''));
	fs.stat(fileName, function (err, stat) {
		if (err == null) {
			res.sendFile(fileName);
		} else {
			fs.stat(fileName + '.pdf', function (err, stat) {
				if (err == null) {
					res.sendFile(fileName + '.pdf');
				} else {
					next();
				}
			});
		}
	});
});

module.exports = router;
