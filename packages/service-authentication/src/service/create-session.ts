import md5 from 'md5'

import { UserAccount } from '@buy1s/entity/src/user-account'
import { LoginSession } from '@buy1s/entity/src/login-session'
import { accountRepo, sessionRepo } from '../repository'
import { BusinessError } from '../error-handler'
import { generateToken } from './generate-jwt'

export async function createSession(
  acc: UserAccount,
  ip: string,
  userAgent: string
): Promise<LoginSession> {
  const existed = await accountRepo.findByUsername(acc.username)

  if (!existed || existed.password !== md5(acc.password))
    throw new BusinessError('username or password is incorrect')

  const payload = {
    username: existed.username,
    id: existed.id,
  }
  const token = generateToken(payload)
  const sessionInfo = { userAgent, ip, token }
  sessionRepo.create(sessionInfo)

  return sessionInfo
}
