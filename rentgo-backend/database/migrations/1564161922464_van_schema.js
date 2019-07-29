'use strict'

const Schema = use('Schema')

class VanSchema extends Schema {
  up () {
    this.create('vans', (table) => {
      table.increments()
      table.integer('driver_id').unsigned().notNullable().references('id').inTable('drivers').onUpdate('CASCADE').onDelete('CASCADE')
      table.string('model').notNullable()
      table.string('color').notNullable()
      table.string('plate').notNullable()
      table.integer('amount_passenger').notNullable()
      table.string('details').notNullable()
      table.string('photo_van')
      table.timestamps()
    })
  }

  down () {
    this.drop('vans')
  }
}

module.exports = VanSchema
