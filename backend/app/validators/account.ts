import vine from '@vinejs/vine'

const status = () => vine.enum(['activo', 'suspendido', 'vencido'] as const)

/**
 * Validator to validate the payload when creating
 * a new account.
 */
export const createAccountValidator = vine.create({
  email: vine.string().trim().email().maxLength(254),
  password: vine.string().minLength(1).maxLength(254),
  status: status().optional(),
  observations: vine.string().trim().maxLength(1000).nullable().optional(),
})

/**
 * Validator to validate the payload when updating
 * an existing account.
 */
export const updateAccountValidator = vine.create({
  email: vine.string().trim().email().maxLength(254).optional(),
  password: vine.string().minLength(1).maxLength(254).optional(),
  status: status().optional(),
  observations: vine.string().trim().maxLength(1000).nullable().optional(),
})

/**
 * Validator for the accounts listing query params:
 * search, filter by status, sort and paginate.
 */
export const listAccountsValidator = vine.create({
  search: vine.string().trim().optional(),
  status: status().optional(),
  sortBy: vine.enum(['email', 'status', 'createdAt'] as const).optional(),
  sortDir: vine.enum(['asc', 'desc'] as const).optional(),
  page: vine.number().min(1).optional(),
  perPage: vine.number().min(1).max(100).optional(),
})
