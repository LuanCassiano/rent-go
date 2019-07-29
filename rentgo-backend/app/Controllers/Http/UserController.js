'use strict'

const User = use('App/Models/User')

class UserController {

	async store ({ request, response, auth }) {
        try {
            const data = request.only([
                'username',
                'email',
                'password'
            ])
            
            const user = await User.create(data)

            const { email, password } = request.all()

            const token = await auth.attempt(email, password)

            return response.json({
                status: 'created',
                result: user, 
                token
            })
        } catch (error) {
            return error
        }
	}

	async show ({ params, response }) {
        try {
            const user = await User.findOrFail(params.id)

            return response.json({
                status: 'ok',
                result: user
            })
        } catch (error) {
            return error
        }
	}

	async update ({ params, request, response }) {
        try {
            const user = await User.findOrFail(params.id)
            const data = request.only([
                'username',
            ])

            user.merge(data)

            await user.save()

            return response.json({
                status: 'updated',
                result: user
            })

        } catch (error) {
            return error
        }
	}

}

module.exports = UserController