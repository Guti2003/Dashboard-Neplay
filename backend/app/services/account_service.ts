import Account from '#models/account'
import Platform from '#models/platform'

type ListAccountsOptions = {
  search?: string
  status?: string
  sortBy?: 'email' | 'status' | 'createdAt'
  sortDir?: 'asc' | 'desc'
  page?: number
  perPage?: number
}

type AccountPayload = {
  email?: string
  password?: string
  status?: string
  observations?: string | null
}

const SORTABLE_COLUMNS = {
  email: 'email',
  status: 'status',
  createdAt: 'created_at',
} as const

/**
 * Encapsulates all business logic for streaming accounts. Reused by every
 * platform (Netflix, Disney, Amazon Prime, ...) since accounts are scoped
 * by `platformId`, never by a platform-specific table.
 */
export default class AccountService {
  static findPlatformBySlug(slug: string) {
    return Platform.findByOrFail('slug', slug)
  }

  static list(platformId: number, options: ListAccountsOptions) {
    const { search, status, sortBy = 'createdAt', sortDir = 'desc', page = 1, perPage = 12 } =
      options

    const query = Account.query()
      .where('platformId', platformId)
      .withCount('profiles', (profiles) => profiles.as('profilesCount'))

    if (search) {
      query.where((builder) => {
        builder.whereILike('email', `%${search}%`).orWhereILike('observations', `%${search}%`)
      })
    }

    if (status) {
      query.where('status', status)
    }

    query.orderBy(SORTABLE_COLUMNS[sortBy], sortDir)

    return query.paginate(page, perPage)
  }

  static findOrFail(id: number) {
    return Account.findOrFail(id)
  }

  static create(platformId: number, payload: Required<Pick<AccountPayload, 'email' | 'password'>> & AccountPayload) {
    return Account.create({ platformId, ...payload })
  }

  static async update(account: Account, payload: AccountPayload) {
    account.merge(payload)
    await account.save()
    return account
  }

  static async delete(account: Account) {
    await account.delete()
  }
}
