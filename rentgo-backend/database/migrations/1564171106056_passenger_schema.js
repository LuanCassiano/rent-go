'use strict'

const Schema = use('Schema')

class PassengerSchema extends Schema {
  up () {
    this.create('passengers', (table) => {
      table.increments()
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE')
      table.string('fullname').notNullable()
      table.string('mobile_phone').notNullable()
      table.string('profile_image')
      table.timestamps()
    })
  }

  down () {
    this.drop('passengers')
  }
}

module.exports = PassengerSchema
