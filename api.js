var express = require('express');
var router = express.Router();

router.use('/users', require('./modules/users/users.controller'));
router.use('/promotions', require('./modules/promotions/promotions.controller'));
router.use('/messages', require('./modules/messages/messages.controller'));
router.use('/host-registration-application', require('./modules/host-registration-applications/host-registration-applications.controller'));

module.exports = router;
