import Platform from '#models/platform'
import type { HttpContext } from '@adonisjs/core/http'
import PlatformTransformer from '#transformers/platform_transformer'

export default class PlatformsController {
  async index({ serialize }: HttpContext) {
    const platforms = await Platform.query().orderBy('name', 'asc')

    return serialize(PlatformTransformer.transform(platforms))
  }
}
