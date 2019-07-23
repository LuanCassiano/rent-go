'use strict'

const Schema = use('Schema')

class DriverSchema extends Schema {
  up () {
    this.create('drivers', (table) => {
      table.increments()
      table.string('fullname').notNullable()
      table.string('mobile_phone').notNullable()
      table.string('profile_image')
      table.string('cnh_image')
      table.string('cert_antt_image')
      table.integer('dist_max').notNullable()
      table.string('username').notNullable().unique()
      table.string('email').notNullable().unique()
      table.string('password').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('drivers')
  }
}

module.exports = DriverSchema
