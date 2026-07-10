import { BaseTransformer } from '@adonisjs/core/transformers'
import Account from '#models/account'
import { daysRemaining } from '#transformers/membership_cycle'

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
        'renewedAt',
        'createdAt',
        'updatedAt',
      ]),
      profilesCount: Number(this.resource.$extras.profilesCount ?? 0),
      daysRemaining: daysRemaining(this.resource.renewedAt),
    }
  }
}
