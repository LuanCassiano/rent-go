'use strict'

const Database = use('Database')
const Driver = use('App/Models/Driver')

class DriverController {

	async index ({ request, response }) {
		const { dist_max } = request.all()

		const drivers = await Database
								.select('id','fullname', 'mobile_phone', 'profile_image')
								.from('drivers')
								.where('dist_max', '>=', dist_max)

		return response.json({
			status: 'ok',
			result: drivers
		})
	}

	async store ({ request, response, auth }) {
		try {
			const data = request.only([
				'fullname',
				'mobile_phone',
				'profile_image',
				'cnh_image',
				'cert_antt_image',
				'dist_max',
			])

			const driver = await Driver.create({
				...data,
				user_id: auth.user.id
			})

			return response.json({
				status: 'created',
				result: driver
			})
		} catch (error) {
			return error
		}
	}

	async show ({ params, response }) {
		try {
			const driver = await Database
										.select('username', 'email', 'fullname', 'mobile_phone', 'profile_image', 'dist_max')
										.from('drivers')
										.leftJoin('users', 'drivers.user_id', 'users.id')
										.where('drivers.id', '=', params.id)

			return response.json({
				status: 'ok',
				result: driver
			})
		} catch (error) {
			return error
		}
	}

	async update ({ params, request, response }) {
		try {
            const driver = await Driver.findOrFail(params.id)
            const data = request.only([
                'mobile_phone',
                'profile_image',
				'mobile_phone',
				'dist_max',
            ])

            driver.merge(data)

            await driver.save()

            return response.json({
                status: 'updated',
                result: driver
            })

        } catch (error) {
			return error
        }
	}
}

module.exports = DriverController
