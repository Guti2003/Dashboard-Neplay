import { DateTime } from 'luxon'
import db from '@adonisjs/lucid/services/db'
import type { TransactionClientContract } from '@adonisjs/lucid/types/database'
import Profile from '#models/profile'
import Account from '#models/account'
import Client from '#models/client'

type ListProfilesOptions = {
  search?: string
  status?: string
  sortBy?: 'name' | 'status' | 'createdAt'
  sortDir?: 'asc' | 'desc'
  page?: number
  perPage?: number
}

type ProfilePayload = {
  name?: string
  pin?: string
  clientId?: number | null
}

const SORTABLE_COLUMNS = {
  name: 'name',
  status: 'status',
  createdAt: 'created_at',
} as const

/** Thrown when creating profiles would exceed the platform's per-account limit. */
export class ProfileLimitExceededError extends Error {
  constructor(
    public readonly max: number,
    public readonly current: number,
    public readonly requested: number
  ) {
    const remaining = Math.max(max - current, 0)
    super(
      requested > 1
        ? `Esta cuenta solo tiene cupo para ${remaining} perfil(es) más (límite de ${max} por cuenta).`
        : `Esta cuenta ya alcanzó el límite de ${max} perfil(es) permitidos.`
    )
  }
}

/**
 * Encapsulates all business logic for account profiles. `status` and
 * `assignedAt` are never set directly by the caller: they are derived from
 * whether a `clientId` is present, so the two can never disagree.
 */
export default class ProfileService {
  static list(accountId: number, options: ListProfilesOptions) {
    const { search, status, sortBy = 'createdAt', sortDir = 'desc', page = 1, perPage = 12 } =
      options

    const query = Profile.query().where('accountId', accountId).preload('client')

    if (search) {
      query.where((builder) => {
        builder.whereILike('name', `%${search}%`)
      })
    }

    if (status) {
      query.where('status', status)
    }

    query.orderBy(SORTABLE_COLUMNS[sortBy], sortDir)

    return query.paginate(page, perPage)
  }

  static findOrFail(id: number) {
    return Profile.query().where('id', id).preload('client').firstOrFail()
  }

  /**
   * `client` is the already-fetched, already-validated owner (the caller
   * confirmed it exists) — passing the instance instead of just its id lets
   * us hydrate the response's `client` relation without a second query.
   */
  static async create(
    accountId: number,
    payload: Required<Pick<ProfilePayload, 'name' | 'pin'>> & { clientId: number },
    client: Client
  ) {
    const profile = await db.transaction(async (trx) => {
      await this.assertCapacity(trx, accountId, 1)

      return Profile.create(
        {
          accountId,
          name: payload.name,
          pin: payload.pin,
          ...this.resolveAssignment(payload.clientId),
        },
        { client: trx }
      )
    })

    profile.$setRelated('client', client)
    return profile
  }

  /** Creates several profiles for the same account/client in one atomic batch. */
  static async createBatch(
    accountId: number,
    client: Client,
    profiles: { name: string; pin: string }[]
  ) {
    const created = await db.transaction(async (trx) => {
      await this.assertCapacity(trx, accountId, profiles.length)

      return Profile.createMany(
        profiles.map((p) => ({
          accountId,
          name: p.name,
          pin: p.pin,
          clientId: client.id,
          status: 'ocupado' as const,
          assignedAt: DateTime.now(),
        })),
        { client: trx }
      )
    })

    for (const profile of created) {
      profile.$setRelated('client', client)
    }

    return created
  }

  /**
   * Throws if creating `additional` more profiles would exceed the platform's
   * limit. Must run inside the same transaction as the insert it's guarding —
   * `forUpdate()` locks the account row so two concurrent requests serialize
   * on this check instead of both reading a pre-insert count and passing.
   */
  private static async assertCapacity(
    trx: TransactionClientContract,
    accountId: number,
    additional: number
  ) {
    const account = await Account.query({ client: trx })
      .where('id', accountId)
      .preload('platform')
      .forUpdate()
      .firstOrFail()

    const max = account.platform.maxProfilesPerAccount
    if (max == null) return

    const [row] = await Profile.query({ client: trx }).where('accountId', accountId).count('* as total')
    const current = Number(row.$extras.total)

    if (current + additional > max) {
      throw new ProfileLimitExceededError(max, current, additional)
    }
  }

  static async update(profile: Profile, payload: ProfilePayload) {
    const { clientId, ...rest } = payload
    profile.merge(rest)

    if (clientId !== undefined) {
      profile.merge(this.resolveAssignment(clientId))
    }

    await profile.save()
    await profile.load('client')
    return profile
  }

  static async delete(profile: Profile) {
    await profile.delete()
  }

  /** Resets the profile's 30-day cycle to "today" without touching its client. */
  static async renew(profile: Profile) {
    profile.assignedAt = DateTime.now()
    await profile.save()
    await profile.load('client')
    return profile
  }

  private static resolveAssignment(clientId?: number | null) {
    return clientId
      ? { clientId, status: 'ocupado' as const, assignedAt: DateTime.now() }
      : { clientId: null, status: 'disponible' as const, assignedAt: null }
  }
}
