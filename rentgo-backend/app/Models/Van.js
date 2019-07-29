'use strict'

const Model = use('Model')

class Van extends Model {
    driver () {
        return this.belongsTo('App/Models/Driver')
    }
}

module.exports = Van
