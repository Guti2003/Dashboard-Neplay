import vine from '@vinejs/vine'

const name = () => vine.string().trim().minLength(1).maxLength(120)
const phone = () => vine.string().trim().minLength(6).maxLength(20)

/**
 * Validator to validate the payload when creating
 * a new client.
 */
export const createClientValidator = vine.create({
  name: name(),
  phone: phone().unique({ table: 'clients', column: 'phone' }),
})

/**
 * Validator to validate the payload when updating
 * an existing client.
 */
export const updateClientValidator = vine.create({
  name: name().optional(),
  phone: phone()
    .unique({
      table: 'clients',
      column: 'phone',
      filter: (db, _value, field) => {
        db.whereNot('id', field.meta.clientId as number)
      },
    })
    .optional(),
})

/**
 * Validator for the clients listing query params:
 * search, sort and paginate.
 */
export const listClientsValidator = vine.create({
  search: vine.string().trim().optional(),
  sortBy: vine.enum(['name', 'phone', 'createdAt'] as const).optional(),
  sortDir: vine.enum(['asc', 'desc'] as const).optional(),
  page: vine.number().min(1).optional(),
  perPage: vine.number().min(1).max(100).optional(),
})
