'use strict'

const Schema = use('Schema')

class DriverSchema extends Schema {
  up () {
    this.create('drivers', (table) => {
      table.increments()
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE')
      table.string('fullname').notNullable()
      table.string('mobile_phone').notNullable()
      table.string('profile_image')
      table.string('cnh_image')
      table.string('cert_antt_image')
      table.integer('dist_max').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('drivers')
  }
}

module.exports = DriverSchema