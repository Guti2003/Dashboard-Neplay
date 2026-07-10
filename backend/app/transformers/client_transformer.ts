import { BaseTransformer } from '@adonisjs/core/transformers'
import Client from '#models/client'
import { daysRemaining } from '#transformers/membership_cycle'

export default class ClientTransformer extends BaseTransformer<Client> {
  toObject() {
    return {
      ...this.pick(this.resource, ['id', 'name', 'phone', 'createdAt', 'updatedAt']),
      // A flat, purpose-built shape (not AccountTransformer/ProfileTransformer)
      // so this cross-platform summary never leaks the account password and
      // can't recurse back into `client` on each profile.
      memberships: this.resource.profiles?.map((profile) => ({
        profileId: profile.id,
        profileName: profile.name,
        status: profile.status,
        daysRemaining: profile.assignedAt ? daysRemaining(profile.assignedAt) : null,
        accountId: profile.account.id,
        accountEmail: profile.account.email,
        platform: {
          id: profile.account.platform.id,
          name: profile.account.platform.name,
          slug: profile.account.platform.slug,
          color: profile.account.platform.color,
        },
      })),
    }
  }
}
