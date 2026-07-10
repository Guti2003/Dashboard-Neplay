import type { HttpContext } from '@adonisjs/core/http'
import AccountService from '#services/account_service'
import ProfileService from '#services/profile_service'
import ProfileTransformer from '#transformers/profile_transformer'
import {
  createProfileValidator,
  listProfilesValidator,
  updateProfileValidator,
} from '#validators/profile'

/**
 * CRUD for the profiles that belong to a single streaming account.
 */
export default class ProfilesController {
  async index({ params, request, serialize }: HttpContext) {
    const account = await AccountService.findOrFail(params.id)
    const options = await request.validateUsing(listProfilesValidator)

    const profiles = await ProfileService.list(account.id, options)

    return serialize(ProfileTransformer.paginate(profiles.all(), profiles.getMeta()))
  }

  async store({ params, request, response, serialize }: HttpContext) {
    const account = await AccountService.findOrFail(params.id)
    const payload = await request.validateUsing(createProfileValidator)

    const profile = await ProfileService.create(account.id, payload)

    response.status(201)
    return serialize(ProfileTransformer.transform(profile))
  }

  async update({ params, request, serialize }: HttpContext) {
    const profile = await ProfileService.findOrFail(params.id)
    const payload = await request.validateUsing(updateProfileValidator)

    await ProfileService.update(profile, payload)

    return serialize(ProfileTransformer.transform(profile))
  }

  async destroy({ params, response }: HttpContext) {
    const profile = await ProfileService.findOrFail(params.id)
    await ProfileService.delete(profile)

    return response.noContent()
  }
}
