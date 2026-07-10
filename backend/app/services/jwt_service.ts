import jwt from 'jsonwebtoken'
import env from '#start/env'
import type User from '#models/user'

export type JwtPayload = {
  userId: number
}

/**
 * Signs and verifies the JWTs used to authenticate API requests.
 * "Remember me" logins get a long-lived token instead of a session-length one.
 */
export default class JwtService {
  static sign(user: User, options: { rememberMe?: boolean } = {}) {
    const expiresIn = options.rememberMe
      ? env.get('JWT_REMEMBER_EXPIRES_IN')
      : env.get('JWT_ACCESS_EXPIRES_IN')

    const payload: JwtPayload = { userId: user.id }
    const token = jwt.sign(payload, env.get('JWT_SECRET').release(), {
      expiresIn: expiresIn as jwt.SignOptions['expiresIn'],
    })

    return { token, expiresIn }
  }

  static verify(token: string): JwtPayload {
    return jwt.verify(token, env.get('JWT_SECRET').release()) as unknown as JwtPayload
  }
}
