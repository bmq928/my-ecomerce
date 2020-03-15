import config from 'config'
import jwt from 'jsonwebtoken'

export function generateToken(payload: object, expiresIn: string): string {
  const secret = config.get('secret') as string
  const opt = {
    expiresIn: expiresIn,
  }
  const token = jwt.sign(payload, secret, opt)
  return token
}

export function generateTokenWithPayloadFrom(
  token: string,
  expiresIn: string
): string {
  const payload = jwt.decode(token) as object
  const newToken = generateToken(payload, expiresIn)
  return newToken
}
