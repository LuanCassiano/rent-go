const User = require('../models/user');

class UserController {

    async register(req, res) {
        console.log('ola mundo')
        const { email } = req.body;

        try {
            if(await User.findOne({
                email
            })) {
                return res.status(400).send({
                    status: 'User already exists'
                });
            }

            const user = await User.create(req.body);

            user.password = undefined;

            return res.status(201).send({
                status: 'User created',
                result: user
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
            console.log(email, password)
            
            const user = await User.findOne({
                email
            });

            console.log(user)

            if(!user) {
                return res.status(400).send({
                    status: 'User not found',
                });
            }

            if(!await user.compareHash(password)) {
                return res.status(400).send({
                    status: 'User not found'
                });
            }

            res.status(200).send({
                status: 'Authenticated',
                result: user,
                token: User.generateToken(user)
            });

        } catch (error) {
            return res.status(400).send({
                status: 'Authentication failed',
                result: error
            });
        }
    }
}

module.exports = new UserController();