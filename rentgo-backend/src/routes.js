const express = require('express');
const router = express.Router();
const controllers = require('./app/controllers');

const authMiddleware = require('./middleware/auth');

router.post('/api/v1/user/register', controllers.userController.register);
router.post('/api/v1/user/authentication', controllers.userController.authentication);

router.post('/api/v1/driver/register', controllers.driverController.register);
router.post('/api/v1/driver/authentication', controllers.driverController.authentication);

router.use(authMiddleware);
router.get('/api/v1/driver/drivers', controllers.driverController.allDrivers);
router.get('/api/v1/driver/:id', controllers.driverController.driver);

module.exports = router;