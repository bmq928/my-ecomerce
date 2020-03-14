import config from 'config'
import jwt from 'jsonwebtoken'

export function generateToken(payload: object): string {
  const secret = config.get('secret') as string
  const opt = {
    expiresIn: config.get('loginExpiredIn') as string,
  }
  const token = jwt.sign(payload, secret, opt)
  return token
}