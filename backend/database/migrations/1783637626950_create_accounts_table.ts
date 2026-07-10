import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'accounts'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table
        .integer('platform_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('platforms')
        .onDelete('CASCADE')

      table.string('email').notNullable()
      table.string('password').notNullable()
      table.enu('status', ['activo', 'suspendido', 'vencido']).notNullable().defaultTo('activo')
      table.text('observations').nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}