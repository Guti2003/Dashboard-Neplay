/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  auth: {
    newAccount: {
      store: typeof routes['auth.new_account.store']
    }
    accessTokens: {
      store: typeof routes['auth.access_tokens.store']
    }
  }
  profile: {
    profile: {
      show: typeof routes['profile.profile.show']
    }
    accessTokens: {
      destroy: typeof routes['profile.access_tokens.destroy']
    }
  }
  catalog: {
    dashboard: {
      index: typeof routes['catalog.dashboard.index']
    }
    search: {
      index: typeof routes['catalog.search.index']
    }
    platforms: {
      index: typeof routes['catalog.platforms.index']
      show: typeof routes['catalog.platforms.show']
      update: typeof routes['catalog.platforms.update']
    }
    accounts: {
      index: typeof routes['catalog.accounts.index']
      store: typeof routes['catalog.accounts.store']
      show: typeof routes['catalog.accounts.show']
      update: typeof routes['catalog.accounts.update']
      destroy: typeof routes['catalog.accounts.destroy']
      renew: typeof routes['catalog.accounts.renew']
    }
    profiles: {
      index: typeof routes['catalog.profiles.index']
      store: typeof routes['catalog.profiles.store']
      storeBatch: typeof routes['catalog.profiles.store_batch']
      update: typeof routes['catalog.profiles.update']
      destroy: typeof routes['catalog.profiles.destroy']
      renew: typeof routes['catalog.profiles.renew']
    }
    clients: {
      index: typeof routes['catalog.clients.index']
      store: typeof routes['catalog.clients.store']
      show: typeof routes['catalog.clients.show']
      update: typeof routes['catalog.clients.update']
      destroy: typeof routes['catalog.clients.destroy']
    }
  }
}
