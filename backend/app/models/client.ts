import { ClientSchema } from '#database/schema'
import { hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Profile from '#models/profile'

export default class Client extends ClientSchema {
  @hasMany(() => Profile)
  declare profiles: HasMany<typeof Profile>
}