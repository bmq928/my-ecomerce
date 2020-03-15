import request from 'supertest'
import config from 'config'

import app from '../src/api'
import { makeLoginSession } from '@buy1s/entity/src/login-session'
import { disconnectAll, refreshAll } from './_teardown'
import { cacheClient } from '../src/repository'
import jwt from 'jsonwebtoken'

describe('[GET] /login', () => {
  const baseUrl = '/login'
  const defaultIp = '::ffff:127.0.0.1'
  const defaultUserAgent = 'node-superagent/3.8.3'
  const defaultToken = jwt.sign(
    { username: 'kame', id: 'df' },
    config.get('secret')
  )

  afterEach(async done => {
    await refreshAll()
    done()
  })

  afterAll(async done => {
    await disconnectAll()
    done()
  })

  it('Should return a accessToken and refreshToken when user have already logged in', async () => {
    const loggedInSession = makeLoginSession({
      ip: defaultIp,
      token: defaultToken,
      userAgent: defaultUserAgent,
    })
    cacheClient.set(
      loggedInSession.ip + loggedInSession.userAgent,
      loggedInSession.token
    )

    const resp = await request(app)
      .get(baseUrl)
      .set('User-Agent', defaultUserAgent)
    const respData = JSON.parse(resp.text)

    expect(resp.status).toBe(200)
    expect(respData).toHaveProperty('refreshToken')
    expect(respData).toHaveProperty('accessToken')
    expect(respData.refreshToken).toBe(loggedInSession.token)
    expect(respData.accessToken).toBeTruthy()
    expect(respData.refreshToken).not.toEqual(respData.accessToken)
  })

  it('Should return an error message when user have not logged in', async () => {
    const resp = await request(app).get(baseUrl)
    const respData = JSON.parse(resp.text)

    expect(resp.status).toBeGreaterThanOrEqual(400) //400 or more
    expect(respData.message).toBe('User has not logged in yet')
  })
})
