import Platform from '#models/platform'
import type { HttpContext } from '@adonisjs/core/http'
import PlatformTransformer from '#transformers/platform_transformer'
import { updatePlatformValidator } from '#validators/platform'

export default class PlatformsController {
  async index({ serialize }: HttpContext) {
    const platforms = await Platform.query().orderBy('name', 'asc')

    return serialize(PlatformTransformer.transform(platforms))
  }

  async show({ params, serialize }: HttpContext) {
    const platform = await Platform.query().where('slug', params.slug).firstOrFail()

    return serialize(PlatformTransformer.transform(platform))
  }

  async update({ params, request, serialize }: HttpContext) {
    const platform = await Platform.query().where('slug', params.slug).firstOrFail()
    const payload = await request.validateUsing(updatePlatformValidator)

    platform.maxProfilesPerAccount = payload.maxProfilesPerAccount
    await platform.save()

    return serialize(PlatformTransformer.transform(platform))
  }
}
