import { BaseTransformer } from '@adonisjs/core/transformers'
import Platform from '#models/platform'

export default class PlatformTransformer extends BaseTransformer<Platform> {
  toObject() {
    const accountsCount = this.resource.$extras.accountsCount

    return {
      ...this.pick(this.resource, ['id', 'name', 'slug', 'color', 'createdAt', 'updatedAt']),
      // Only present when the caller preloaded the count (e.g. the dashboard).
      totalAccounts: this.when(accountsCount !== undefined, () => Number(accountsCount)),
    }
  }
}