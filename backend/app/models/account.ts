import { AccountSchema } from '#database/schema'
import {
  afterFetch,
  afterFind,
  afterSave,
  beforeCreate,
  beforeSave,
  belongsTo,
  hasMany,
} from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import encryption from '@adonisjs/core/services/encryption'
import Platform from '#models/platform'
import Profile from '#models/profile'

/**
 * Stashes the plaintext password across the beforeSave/afterSave hooks so the
 * in-memory instance keeps reading as plaintext right after a create/update,
 * matching what afterFind/afterFetch return on subsequent reads.
 */
const pendingPlaintextPasswords = new WeakMap<Account, string>()

export default class Account extends AccountSchema {
  @belongsTo(() => Platform)
  declare platform: BelongsTo<typeof Platform>

  @hasMany(() => Profile)
  declare profiles: HasMany<typeof Profile>

  /**
   * Starts the 30-day billing cycle at creation; the /renew endpoint bumps
   * it back to "now" whenever the admin registers a new payment.
   */
  @beforeCreate()
  static setInitialRenewedAt(account: Account) {
    account.renewedAt ??= DateTime.now()
  }

  /**
   * The streaming service password must be readable by the admin (unlike a
   * user's own login password), so it's encrypted at rest instead of hashed.
   */
  @beforeSave()
  static encryptPassword(account: Account) {
    if (account.password) {
      pendingPlaintextPasswords.set(account, account.password)
      account.password = encryption.encrypt(account.password)
    }
  }

  @afterSave()
  static restorePlaintextPasswordAfterSave(account: Account) {
    const plaintext = pendingPlaintextPasswords.get(account)
    if (plaintext !== undefined) {
      account.password = plaintext
      pendingPlaintextPasswords.delete(account)
    }
  }

  @afterFind()
  static decryptPasswordAfterFind(account: Account) {
    account.password = encryption.decrypt<string>(account.password) ?? account.password
  }

  @afterFetch()
  static decryptPasswordAfterFetch(accounts: Account[]) {
    for (const account of accounts) {
      account.password = encryption.decrypt<string>(account.password) ?? account.password
    }
  }
}