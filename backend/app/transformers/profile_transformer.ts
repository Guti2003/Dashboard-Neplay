import { BaseTransformer } from '@adonisjs/core/transformers'
import Profile from '#models/profile'
import ClientTransformer from '#transformers/client_transformer'
import { daysRemaining } from '#transformers/membership_cycle'

export default class ProfileTransformer extends BaseTransformer<Profile> {
  toObject() {
    return {
      ...this.pick(this.resource, [
        'id',
        'accountId',
        'name',
        'pin',
        'status',
        'clientId',
        'assignedAt',
        'createdAt',
        'updatedAt',
      ]),
      client: ClientTransformer.transform(this.whenLoaded(this.resource.client)),
      daysRemaining: this.resource.assignedAt ? daysRemaining(this.resource.assignedAt) : null,
    }
  }
}
