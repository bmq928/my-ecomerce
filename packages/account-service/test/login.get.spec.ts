import request from 'supertest'
import config from 'config'

import app from '@app/api'
import { makeLoginSession } from '@entity/login-session'
import { cacheClient } from '@app/repositories'
import jwt from 'jsonwebtoken'

describe('[GET] /login', () => {
  const baseUrl = '/login'
  const defaultIp = '::ffff:127.0.0.1'
  const defaultUserAgent = 'node-superagent/3.8.3'
  const defaultToken = jwt.sign(
    { username: 'kame', id: 'df' },
    config.get('secret')
  )

  it('Should return ok message when user have already logged in', async () => {
    const loggedInSession = makeLoginSession({
      ip: defaultIp,
      token: defaultToken,
      userAgent: defaultUserAgent,
    })
    await cacheClient.set(
      loggedInSession.ip + loggedInSession.userAgent,
      loggedInSession.token
    )

    const resp = await request(app)
      .get(baseUrl)
      .set('User-Agent', defaultUserAgent)

    expect(resp.status).toBe(200)
  })

  it('Should return an error message when user have not logged in', async () => {
    const resp = await request(app).get(baseUrl)
    const respData = JSON.parse(resp.text)

    expect(resp.status).toBeGreaterThanOrEqual(400) //400 or more
    expect(respData.message).toBe('User has not logged in yet')
  })
})
