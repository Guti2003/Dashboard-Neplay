import type { HttpContext } from '@adonisjs/core/http'
import AccountService from '#services/account_service'
import ProfileService, { ProfileLimitExceededError } from '#services/profile_service'
import Client from '#models/client'
import ProfileTransformer from '#transformers/profile_transformer'
import {
  createProfileValidator,
  createProfilesBatchValidator,
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
    const client = await Client.findOrFail(payload.clientId)

    try {
      const profile = await ProfileService.create(account.id, payload, client)
      response.status(201)
      return serialize(ProfileTransformer.transform(profile))
    } catch (error) {
      if (error instanceof ProfileLimitExceededError) {
        return response.conflict({ message: error.message })
      }
      throw error
    }
  }

  async storeBatch({ params, request, response, serialize }: HttpContext) {
    const account = await AccountService.findOrFail(params.id)
    const payload = await request.validateUsing(createProfilesBatchValidator)
    const client = await Client.findOrFail(payload.clientId)

    try {
      const profiles = await ProfileService.createBatch(account.id, client, payload.profiles)
      response.status(201)
      return serialize(ProfileTransformer.transform(profiles))
    } catch (error) {
      if (error instanceof ProfileLimitExceededError) {
        return response.conflict({ message: error.message })
      }
      throw error
    }
  }

  async update({ params, request, serialize }: HttpContext) {
    const profile = await ProfileService.findOrFail(params.id)
    const payload = await request.validateUsing(updateProfileValidator)

    if (payload.clientId) {
      await Client.findOrFail(payload.clientId)
    }

    await ProfileService.update(profile, payload)

    return serialize(ProfileTransformer.transform(profile))
  }

  async destroy({ params, response }: HttpContext) {
    const profile = await ProfileService.findOrFail(params.id)
    await ProfileService.delete(profile)

    return response.noContent()
  }

  async renew({ params, serialize }: HttpContext) {
    const profile = await ProfileService.findOrFail(params.id)
    await ProfileService.renew(profile)

    return serialize(ProfileTransformer.transform(profile))
  }
}
