import config from 'config'

import { generateTokenWithPayloadFrom } from './generate-jwt'
import { getSession } from './get-session'
import { BusinessError } from '../error-handler'

export async function createAccessToken(
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
