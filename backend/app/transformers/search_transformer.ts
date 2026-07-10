import Account from '#models/account'
import Profile from '#models/profile'
import Client from '#models/client'

type SearchResults = {
  accounts: Account[]
  profiles: Profile[]
  clients: Client[]
}

/**
 * A purpose-built, flat shape for the global search dropdown — not composed
 * from AccountTransformer/ProfileTransformer since those include fields
 * (like the account password) this preview list should never expose.
 */
export default class SearchTransformer {
  static transform({ accounts, profiles, clients }: SearchResults) {
    return {
      accounts: accounts.map((account) => ({
        id: account.id,
        email: account.email,
        platform: {
          slug: account.platform.slug,
          name: account.platform.name,
          color: account.platform.color,
        },
      })),
      profiles: profiles.map((profile) => ({
        id: profile.id,
        name: profile.name,
        accountId: profile.accountId,
        accountEmail: profile.account.email,
        platform: {
          slug: profile.account.platform.slug,
          name: profile.account.platform.name,
          color: profile.account.platform.color,
        },
      })),
      clients: clients.map((client) => ({
        id: client.id,
        name: client.name,
        phone: client.phone,
      })),
    }
  }
}
