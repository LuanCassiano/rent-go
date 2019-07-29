'use strict'

const Model = use('Model')

class Driver extends Model {	
	user () {
		return this.belongsTo('App/Models/User')
	}

	vans () {
		return this.hasMany('App/Models/Van')
	}
}

module.exports = Driver
