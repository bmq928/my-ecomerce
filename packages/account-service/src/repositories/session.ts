import { client as cacheClient } from './_redis'
import { LoginSession } from '@buy1s/account-entity'

export function create(sess: LoginSession): Promise<void> {
  return new Promise((resolve, reject) => {
    const key = makeSessionKey(sess.ip, sess.userAgent)
    const val = sess.token

    cacheClient.set(key, val, err => {
      if (err) return reject(err)
      resolve()
    })
  })
}

export function get(ip: string, userAgent: string): Promise<LoginSession> {
  return new Promise<LoginSession>((resolve, reject) => {
    const key = makeSessionKey(ip, userAgent)
    cacheClient.get(key, (err, token) => {
      if (err) return reject(err)
      if (!token) return resolve(null)

      const sessionInfo = { ip, userAgent, token }
      resolve(sessionInfo)
    })
  })
}

export function remove(ip: string, userAgent: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const key = makeSessionKey(ip, userAgent)
    
    cacheClient.del(key, err => {
      if (err) return reject(err)

      resolve()
    })
  })
}

function makeSessionKey(ip: string, userAgent: string): string {
  return ip + userAgent
}
