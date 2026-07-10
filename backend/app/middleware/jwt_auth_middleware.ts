import jwt from 'jsonwebtoken'
import User from '#models/user'
import JwtService from '#services/jwt_service'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

/**
 * Verifies the "Authorization: Bearer <token>" header on protected routes
 * and exposes the resolved user as `ctx.authUser`.
 */
export default class JwtAuthMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const authHeader = ctx.request.header('authorization')
    const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null

    if (!token) {
      return ctx.response.unauthorized({ message: 'Token no proporcionado' })
    }

    try {
      const payload = JwtService.verify(token)
      const user = await User.find(payload.userId)

      if (!user) {
        return ctx.response.unauthorized({ message: 'Usuario no encontrado' })
      }

      ctx.authUser = user
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return ctx.response.unauthorized({ message: 'Token expirado' })
      }
      return ctx.response.unauthorized({ message: 'Token inválido' })
    }

    return next()
  }
}

declare module '@adonisjs/core/http' {
  interface HttpContext {
    authUser: User
  }
}
