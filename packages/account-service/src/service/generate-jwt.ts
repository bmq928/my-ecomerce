import config from 'config'
import jwt from 'jsonwebtoken'
import { getSession } from './get-session'
import { BusinessError } from '../error-handler'

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
  const decoded = jwt.decode(token) as object
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const payload = {...decoded} as any
  delete payload.iat 
  delete payload.exp 

  const newToken = generateToken(payload, expiresIn)
  return newToken
}

export async function generateAccessToken(
  refreshToken: string,
  ip: string,
  userAgent: string
): Promise<string> {
  const sess = await getSession(ip, userAgent)
  const storedRefreshToken = sess.token

  if (refreshToken !== storedRefreshToken)
    throw new BusinessError('Token is not found')

  const accessTokenExpiredIn = config.get('accessTokenExpiredIn') as string
  const accessToken = generateTokenWithPayloadFrom(
    refreshToken,
    accessTokenExpiredIn
  )
  return accessToken
}
