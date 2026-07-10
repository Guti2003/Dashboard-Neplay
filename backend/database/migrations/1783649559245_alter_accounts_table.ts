import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'accounts'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      // 30-day billing cycle start; bumped to "now" by the /renew endpoint.
      // No DB default: Account.beforeCreate always sets it on insert.
      table.timestamp('renewed_at').notNullable()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('renewed_at')
    })
  }
}