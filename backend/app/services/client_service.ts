import Client from '#models/client'

type ListClientsOptions = {
  search?: string
  sortBy?: 'name' | 'phone' | 'createdAt'
  sortDir?: 'asc' | 'desc'
  page?: number
  perPage?: number
}

type ClientPayload = {
  name?: string
  phone?: string
}

const SORTABLE_COLUMNS = {
  name: 'name',
  phone: 'phone',
  createdAt: 'created_at',
} as const

/** Thrown when trying to delete a client who still has profiles assigned. */
export class ClientHasProfilesError extends Error {}

export default class ClientService {
  static list(options: ListClientsOptions) {
    const { search, sortBy = 'createdAt', sortDir = 'desc', page = 1, perPage = 12 } = options

    const query = Client.query().preload('profiles', (profiles) =>
      profiles.preload('account', (account) => account.preload('platform'))
    )

    if (search) {
      query.where((builder) => {
        builder.whereILike('name', `%${search}%`).orWhereILike('phone', `%${search}%`)
      })
    }

    query.orderBy(SORTABLE_COLUMNS[sortBy], sortDir)

    return query.paginate(page, perPage)
  }

  static findOrFail(id: number) {
    return Client.query()
      .where('id', id)
      .preload('profiles', (profiles) =>
        profiles.preload('account', (account) => account.preload('platform'))
      )
      .firstOrFail()
  }

  static create(payload: Required<ClientPayload>) {
    return Client.create(payload)
  }

  static async update(client: Client, payload: ClientPayload) {
    client.merge(payload)
    await client.save()
    return client
  }

  static async delete(client: Client) {
    const profilesCount = await client.related('profiles').query().count('* as total')
    if (Number(profilesCount[0].$extras.total) > 0) {
      throw new ClientHasProfilesError(
        'No se puede eliminar un cliente que todavía tiene perfiles asignados.'
      )
    }

    try {
      await client.delete()
    } catch (error) {
      // A profile could have been assigned to this client between the count
      // check above and this delete; the FK's ON DELETE RESTRICT then makes
      // Postgres reject the delete instead of the count catching it.
      if ((error as { code?: string })?.code === '23503') {
        throw new ClientHasProfilesError(
          'No se puede eliminar un cliente que todavía tiene perfiles asignados.'
        )
      }
      throw error
    }
  }
}
