import db from '@adonisjs/lucid/services/db'
import Platform from '#models/platform'

/**
 * Aggregates the numbers shown on the dashboard's stat cards: accounts per
 * platform plus how many profiles are available vs. occupied overall.
 */
export default class DashboardService {
  static async getStats() {
    const [platforms, profilesTotal, profilesAvailable, profilesOccupied] = await Promise.all([
      Platform.query()
        .withCount('accounts', (accounts) => accounts.as('accountsCount'))
        .orderBy('name', 'asc'),
      db.from('profiles').count('* as total').first(),
      db.from('profiles').where('status', 'disponible').count('* as total').first(),
      db.from('profiles').where('status', 'ocupado').count('* as total').first(),
    ])

    return {
      platforms,
      totalProfiles: Number(profilesTotal?.total ?? 0),
      availableProfiles: Number(profilesAvailable?.total ?? 0),
      occupiedProfiles: Number(profilesOccupied?.total ?? 0),
    }
  }
}
