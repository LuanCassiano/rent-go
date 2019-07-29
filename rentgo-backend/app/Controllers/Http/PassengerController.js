'use strict'

const Database = use('Database')
const Passenger = use('App/Models/Passenger')

class PassengerController {

	async store ({ request, response, auth }) {
		try {
			const data = request.only([
				'fullname',
				'mobile_phone',
				'profile_image'
			])

			const passenger = await Passenger.create({
				...data,
				user_id: auth.user.id
			})

			return response.json({
				status: 'created',
				result: passenger
			})
		} catch (error) {
			return error
		}
	}

	async show ({ response, auth }) {
		try {
			const passenger = await Database
										.select('username', 'email', 'fullname', 'mobile_phone', 'profile_image')
										.from('passengers')
										.leftJoin('users', 'passengers.user_id', 'users.id')
										.where('users.id', '=', auth.user.id)

            return response.json({
                status: 'ok',
                result: passenger
            })
        } catch (error) {
			return error
        }
	}

	async update ({ params, request, response }) {
        try {
            const passenger = await Passenger.findOrFail(params.id)
            const data = request.only([
                'fullname',
                'mobile_phone',
                'profile_image'
            ])

            passenger.merge(data)

            await passenger.save()

            return response.json({
                status: 'updated',
                result: passenger
            })

        } catch (error) {
			return error
        }
	}
}

module.exports = PassengerController
