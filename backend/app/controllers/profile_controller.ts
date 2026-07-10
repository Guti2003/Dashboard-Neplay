import UserTransformer from '#transformers/user_transformer'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProfileController {
  async show({ authUser, serialize }: HttpContext) {
    return serialize(UserTransformer.transform(authUser))
  }
}
