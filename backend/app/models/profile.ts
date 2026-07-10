import { ProfileSchema } from '#database/schema'
import { belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Account from '#models/account'

export default class Profile extends ProfileSchema {
  @belongsTo(() => Account)
  declare account: BelongsTo<typeof Account>
}