import { BaseTransformer } from '@adonisjs/core/transformers'
import Account from '#models/account'

export default class AccountTransformer extends BaseTransformer<Account> {
  toObject() {
    return {
      ...this.pick(this.resource, [
        'id',
        'platformId',
        'email',
        'password',
        'status',
        'observations',
        'createdAt',
        'updatedAt',
      ]),
      profilesCount: Number(this.resource.$extras.profilesCount ?? 0),
    }
  }
}