'use strict'

const Database = use('Database')
const Van = use('App/Models/Van')

class VanController {

	async index ({ request, response }) {
		try {
			const { driver } = await request.all()

			const vans = await Database
									.select('driver_id', 'fullname', 'model', 'color', 'details', 'amount_passenger')
									.from('vans')
									.leftJoin('drivers', 'vans.driver_id', 'drivers.id') 
									.where('drivers.id', '=', driver)

			return response.json({
				status: 'ok',
				result: vans
			})
		} catch (error) {
			return error
		}
	}

	async store ({ request, response }) {
		try {

			const { driver } = await request.all()

			const data = request.only([
				'model',
				'color',
				'plate',
				'amount_passenger',
				'details',
				'photo_van'
			])

			const van = await Van.create({
				...data,
				driver_id: driver
			})

			return response.json({
				status: 'created',
				result: van
			})
		} catch (error) {
			return error
		}
	}

	async show ({ params, response }) {
		try {
			const van = await Van.findOrFail(params.id)

			return response.json({
				status: 'ok',
				result: van
			})
		} catch (error) {
			return error
		}
	}

	async update ({ params, request, response }) {
		try {
			const van = await Van.findOrFail(params.id)
			const data = request.only([
				'details',
				'photo_van'
			])

			van.merge(data)

			await van.save()

			return response.json({
				status: 'updated',
				result: van
			})

		} catch (error) {
			return error
		}
	}
	
	async destroy ({ params, response }) {
		try {
			const van = await Van.findOrFail(params.id)

			van.delete()

			return response.json({
				status: 'deleted'
			})
		} catch (error) {
			return error
		}
	}
}

module.exports = VanController
