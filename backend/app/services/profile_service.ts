import { DateTime } from 'luxon'
import Profile from '#models/profile'

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
  assignedUser?: string | null
}

const SORTABLE_COLUMNS = {
  name: 'name',
  status: 'status',
  createdAt: 'created_at',
} as const

/**
 * Encapsulates all business logic for account profiles. `status` and
 * `assignedAt` are never set directly by the caller: they are derived from
 * whether an `assignedUser` is present, so the two can never disagree.
 */
export default class ProfileService {
  static list(accountId: number, options: ListProfilesOptions) {
    const { search, status, sortBy = 'createdAt', sortDir = 'desc', page = 1, perPage = 12 } =
      options

    const query = Profile.query().where('accountId', accountId)

    if (search) {
      query.where((builder) => {
        builder.whereILike('name', `%${search}%`).orWhereILike('assignedUser', `%${search}%`)
      })
    }

    if (status) {
      query.where('status', status)
    }

    query.orderBy(SORTABLE_COLUMNS[sortBy], sortDir)

    return query.paginate(page, perPage)
  }

  static findOrFail(id: number) {
    return Profile.findOrFail(id)
  }

  static create(
    accountId: number,
    payload: Required<Pick<ProfilePayload, 'name' | 'pin'>> & ProfilePayload
  ) {
    return Profile.create({
      accountId,
      name: payload.name,
      pin: payload.pin,
      ...this.resolveAssignment(payload.assignedUser),
    })
  }

  static async update(profile: Profile, payload: ProfilePayload) {
    const { assignedUser, ...rest } = payload
    profile.merge(rest)

    if (assignedUser !== undefined) {
      profile.merge(this.resolveAssignment(assignedUser))
    }

    await profile.save()
    return profile
  }

  static async delete(profile: Profile) {
    await profile.delete()
  }

  private static resolveAssignment(assignedUser?: string | null) {
    const trimmed = assignedUser?.trim() || null

    return trimmed
      ? { assignedUser: trimmed, status: 'ocupado' as const, assignedAt: DateTime.now() }
      : { assignedUser: null, status: 'disponible' as const, assignedAt: null }
  }
}
