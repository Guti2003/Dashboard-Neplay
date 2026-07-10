import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'profiles'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('assigned_user')

      table
        .integer('client_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('clients')
        // Belt-and-suspenders: the app blocks deleting a client with
        // profiles, the DB refuses it too if that check is ever bypassed.
        .onDelete('RESTRICT')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('client_id')
      table.string('assigned_user').nullable()
    })
  }
}