import vine from '@vinejs/vine'

const pin = () => vine.string().regex(/^\d{4}$/)

/**
 * Validator to validate the payload when creating
 * a new profile.
 */
export const createProfileValidator = vine.create({
  name: vine.string().trim().minLength(1).maxLength(100),
  pin: pin(),
  assignedUser: vine.string().trim().maxLength(100).nullable().optional(),
})

/**
 * Validator to validate the payload when updating
 * an existing profile.
 */
export const updateProfileValidator = vine.create({
  name: vine.string().trim().minLength(1).maxLength(100).optional(),
  pin: pin().optional(),
  assignedUser: vine.string().trim().maxLength(100).nullable().optional(),
})

/**
 * Validator for the profiles listing query params:
 * search, filter by status, sort and paginate.
 */
export const listProfilesValidator = vine.create({
  search: vine.string().trim().optional(),
  status: vine.enum(['disponible', 'ocupado'] as const).optional(),
  sortBy: vine.enum(['name', 'status', 'createdAt'] as const).optional(),
  sortDir: vine.enum(['asc', 'desc'] as const).optional(),
  page: vine.number().min(1).optional(),
  perPage: vine.number().min(1).max(100).optional(),
})
