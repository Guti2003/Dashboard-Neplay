import { BaseTransformer } from '@adonisjs/core/transformers'
import Profile from '#models/profile'

export default class ProfileTransformer extends BaseTransformer<Profile> {
  toObject() {
    return this.pick(this.resource, [
      'id',
      'accountId',
      'name',
      'pin',
      'status',
      'assignedUser',
      'assignedAt',
      'createdAt',
      'updatedAt',
    ])
  }
}