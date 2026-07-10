import vine from '@vinejs/vine'

/**
 * Validator to update a platform's per-account profile limit.
 * `null` means "no limit".
 */
export const updatePlatformValidator = vine.create({
  maxProfilesPerAccount: vine.number().min(1).nullable(),
})
