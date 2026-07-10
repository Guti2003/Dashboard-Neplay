import { PlatformSchema } from '#database/schema'
import { hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Account from '#models/account'

export default class Platform extends PlatformSchema {
  @hasMany(() => Account)
  declare accounts: HasMany<typeof Account>
}