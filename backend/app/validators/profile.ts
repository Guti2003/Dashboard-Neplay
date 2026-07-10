import vine from '@vinejs/vine'

const pin = () => vine.string().regex(/^\d{4}$/)

/**
 * Validator to validate the payload when creating
 * a new profile.
 */
export const createProfileValidator = vine.create({
  name: vine.string().trim().minLength(1).maxLength(100),
  pin: pin(),
  clientId: vine.number().min(1),
})

/**
 * Validator to validate the payload when updating
 * an existing profile. `clientId` may be omitted (client unchanged), but
 * a profile can never be unassigned once created.
 */
export const updateProfileValidator = vine.create({
  name: vine.string().trim().minLength(1).maxLength(100).optional(),
  pin: pin().optional(),
  clientId: vine.number().min(1).optional(),
})

/**
 * Validator to validate the payload when creating several profiles for the
 * same client/account in one request (e.g. a client buying N memberships).
 */
export const createProfilesBatchValidator = vine.create({
  clientId: vine.number().min(1),
  profiles: vine
    .array(
      vine.object({
        name: vine.string().trim().minLength(1).maxLength(100),
        pin: pin(),
      })
    )
    .minLength(1)
    .maxLength(20),
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
