'use strict'

const Database = use('Database')

class AuthenticationController {
	async store ({ request, auth }) {
		try {
			const { email, password } = request.all()
	
			const token = await auth.attempt(email, password)
	
			return token
		} catch (error) {
			return error
		}
	}
}

module.exports = AuthenticationController