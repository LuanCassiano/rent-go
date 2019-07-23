'use strict'

const User = use('App/Models/User')

class UserController {

	async store ({ request, response }) {
        try {
            const data = request.only([
                'fullname',
                'mobile_phone',
                'profile_image',
                'username',
                'email',
                'password'
            ])

            const user = await User.create(data)

            return response.json({
                status: 'created',
                result: user
            })
        } catch (error) {
            return response.json({
                status: 'not created',
                result: error
            })
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
            return response.json({
                status: 'error loading user',
                result: error
            })
        }
	}

	async update ({ params, request, response }) {
        try {
            const user = await User.findOrFail(params.id)
            const data = request.only([
                'username',
                'phone',
                'profile_image',
                'mobile_phone'
            ])

            user.merge(data)

            await user.save()

            return response.json({
                status: 'updated',
                result: user
            })

        } catch (error) {
            return response.json({
                status: 'not updated',
                result: error
            })
        }
	}

}

module.exports = UserController