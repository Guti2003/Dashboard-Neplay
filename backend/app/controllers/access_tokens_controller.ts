import User from '#models/user'
import JwtService from '#services/jwt_service'
import { loginValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'
import UserTransformer from '#transformers/user_transformer'
import { errors as authErrors } from '@adonisjs/auth'

export default class AccessTokensController {
  async store({ request, response, serialize }: HttpContext) {
    const { email, password, rememberMe } = await request.validateUsing(loginValidator)

    let user: User
    try {
      user = await User.verifyCredentials(email, password)
    } catch (error) {
      if (error instanceof authErrors.E_INVALID_CREDENTIALS) {
        return response.unauthorized({ message: 'Correo o contraseña incorrectos' })
      }
      throw error
    }

    const { token, expiresIn } = JwtService.sign(user, { rememberMe })

    return serialize({
      user: UserTransformer.transform(user),
      token,
      expiresIn,
    })
  }

  async destroy({}: HttpContext) {
    // JWTs are stateless: the client simply discards the token.
    return {
      message: 'Logged out successfully',
    }
  }
}
