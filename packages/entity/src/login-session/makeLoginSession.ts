import { LoginSession } from './LoginSession'
import EntityError from '../EntityError'

export type RawLoginSession = {
  userAgent: unknown
  ip: unknown
  token: unknown
}

export function makeLoginSession(o: RawLoginSession): LoginSession {
  if (typeof o.userAgent !== 'string')
    throw new EntityError('userAgent must be a string in LoginSession')
  if (typeof o.ip !== 'string')
    throw new EntityError('ip must be a string in LoginSession')
  if (typeof o.token !== 'string')
    throw new EntityError('token must be a string in LoginSession')

  return {
    userAgent: o.userAgent,
    ip: o.ip,
    token: o.token,
  }
}
