const express = require('express');
const router = express.Router();
const controllers = require('./app/controllers');

router.post('/api/v1/register', controllers.userController.register);
router.post('/api/v1/authentication', controllers.userController.authentication);

module.exports = router;