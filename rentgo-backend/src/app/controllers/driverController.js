const Driver = require('../models/driver');
const _ = require('lodash');

class DriverController {

    async register(req, res) {
        const { email } = req.body;

        try {
            if(await Driver.findOne({
                email
            })) {
                return res.status(400).send({
                    status: 'Driver already exists'
                });
            }

            const driver = await Driver.create(req.body);

            driver.password = undefined;

            return res.status(201).send({
                status: 'Driver created',
                result: driver
            });

        } catch (error) {
            return res.status(400).send({
                status: 'Registration failed',
                result: error
            });
        }
    }

    async authentication(req, res) {
        try {
            const { email, password } = req.body;
            
            const driver = await Driver.findOne({
                email
            });

            if(!driver) {
                return res.status(400).send({
                    status: 'Driver not found',
                });
            }

            if(!await driver.compareHash(password)) {
                return res.status(400).send({
                    status: 'Driver not found'
                });
            }

            driver.password = undefined;

            res.status(200).send({
                status: 'Authenticated',
                result: driver,
                token: Driver.generateToken(driver)
            });

        } catch (error) {
            return res.status(400).send({
                status: 'Authentication failed',
                result: error
            });
        }
    }

    async allDrivers(req, res) {
        try {
            const drivers = await Driver.find();

            const driverArr = _.chain(drivers).map((driver) => {
                return {
                    _id: _.get(driver, '_id', ''),
                    fullname: _.get(driver, 'fullname', ''),
                    mobile_phone: _.get(driver, 'mobile_phone', ''),
                    email: _.get(driver, 'email', ''),
                    isDriver: _.get(driver, 'isDriver', false),
                    mobile_verified: _.get(driver, 'mobile_verified', false),
                    positive_ratings: _.get(driver, 'positive_ratings', 0),
                    negative_ratings: _.get(driver, 'negative_ratings', 0),
                    evaluation: _.get(driver, 'evaluation', [])
                }
            }).value();

            return res.status(200).send({
                status: 'ok',
                result: driverArr
            });
        } catch (error) {
            return res.status(400).send({
                status: 'Error loading drivers',
                result: error
            });
        }
    }

    async driver(req, res) {
        try {
            const driver = await Driver.findById(req.params.id);

            driver.password = undefined;

            return res.status(200).send({
                status: 'ok',
                result: driver
            });
        } catch (error) {
            return res.status(400).send({
                status: 'Error loading driver',
                result: error
            });
        }
    }
}

module.exports = new DriverController();