import config from 'config'
import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken'
import { BusinessError } from '../error-handler'

export function validateToken(token: string): void {
  const secret = config.get('secret') as string
  if (!token) throw new BusinessError('Token is empty')

  jwt.verify(token, secret, err => {
    if (err instanceof TokenExpiredError) throw new BusinessError('Token is expired')
    if (err instanceof JsonWebTokenError) throw new BusinessError('Token is invalid')
  })
}
