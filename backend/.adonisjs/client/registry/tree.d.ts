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
    platforms: {
      index: typeof routes['catalog.platforms.index']
    }
    accounts: {
      index: typeof routes['catalog.accounts.index']
      store: typeof routes['catalog.accounts.store']
      update: typeof routes['catalog.accounts.update']
      destroy: typeof routes['catalog.accounts.destroy']
    }
    profiles: {
      index: typeof routes['catalog.profiles.index']
      store: typeof routes['catalog.profiles.store']
      update: typeof routes['catalog.profiles.update']
      destroy: typeof routes['catalog.profiles.destroy']
    }
  }
}
