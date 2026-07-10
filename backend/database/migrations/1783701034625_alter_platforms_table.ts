import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'platforms'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('max_profiles_per_account').unsigned().nullable()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('max_profiles_per_account')
    })
  }
}