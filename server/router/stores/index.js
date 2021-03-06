var express = require('express');
var router = express.Router();

router.use(require('./order'));
router.use(require('./blog'));
router.use(require('./doc'));
router.use(require('./question'));
router.use(require('./user'));
router.use(require('./inventoryItem'));
router.use(require('./reservation'));
router.use(require('./application'));

module.exports = router;
