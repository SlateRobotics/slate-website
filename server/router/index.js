var express = require('express');
var router = express.Router();

router.use('/favicon.ico', require('./favicon'));
router.use('/vid', require('./vid'));
router.use('/img', require('./img'));
router.use('/pdf', require('./pdf'));
router.use('/js', require('./js'));
router.use('/css', require('./css'));

router.use(require('./auth'));

router.use('/placeReservation', require('./placeReservation'));
router.use('/placeOrder', require('./placeOrder'));
router.use('/stores', require('./stores'));

router.use('/', require('./views'));

module.exports = router;
