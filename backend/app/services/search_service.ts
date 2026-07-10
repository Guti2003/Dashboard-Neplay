import Account from '#models/account'
import Profile from '#models/profile'
import Client from '#models/client'

const RESULT_LIMIT = 5

/**
 * Global search across the three things an admin usually looks up by
 * free text: account email/observations, profile names, and client
 * name/phone. Each category is capped independently so one noisy match
 * type can't crowd out the others in the dropdown.
 */
export default class SearchService {
  static async search(term: string) {
    const like = `%${term}%`

    const [accounts, profiles, clients] = await Promise.all([
      Account.query()
        .where((query) => query.whereILike('email', like).orWhereILike('observations', like))
        .preload('platform')
        .limit(RESULT_LIMIT),
      Profile.query()
        .whereILike('name', like)
        .preload('account', (query) => query.preload('platform'))
        .limit(RESULT_LIMIT),
      Client.query()
        .where((query) => query.whereILike('name', like).orWhereILike('phone', like))
        .limit(RESULT_LIMIT),
    ])

    return { accounts, profiles, clients }
  }
}
