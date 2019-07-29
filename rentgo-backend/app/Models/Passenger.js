'use strict'

const Model = use('Model')

class Passenger extends Model {
    user () {
		return this.belongsTo('App/Models/User')
	}
}

module.exports = Passenger
