var express = require('express');
var router = express.Router();

router.use(require('./order'));
router.use(require('./blog'));
router.use(require('./user'));

module.exports = router;
