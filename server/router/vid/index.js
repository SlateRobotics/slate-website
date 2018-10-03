var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

var _root = '../../videos';

router.get('/tr1-overview.mp4', function(req, res) {
  var videoPath = path.join(__dirname, _root + '/tr1-overview.mp4');
  console.log(videoPath);
  var stat = fs.statSync(videoPath)
  var fileSize = stat.size
  var range = req.headers.range
  if (range) {
    var parts = range.replace(/bytes=/, "").split("-")
    var start = parseInt(parts[0], 10)
    var end = parts[1]
      ? parseInt(parts[1], 10)
      : fileSize-1
    var chunksize = (end-start)+1
    var file = fs.createReadStream(videoPath, {start, end})
    res.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    });
    file.pipe(res);
  } else {
    res.writeHead(200, {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    });
    fs.createReadStream(videoPath).pipe(res);
  }
});

module.exports = router;
