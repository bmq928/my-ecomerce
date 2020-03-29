import request from 'supertest'
import jwt from 'jsonwebtoken'
import config from 'config'

import app from '../src/api'
import { cacheClient } from '../src/repositories'

describe('[POST] /refresh-token', () => {
  const baseUrl = '/refresh-token'
  const defaultIp = '::ffff:127.0.0.1'
  const defaultUserAgent = 'node-superagent/3.8.3'

  it('Should create an access-token when refresh-token is valid and existed in db', async () => {
    const refreshToken = jwt.sign(
      { username: 'kame', id: 'kae' },
      config.get('secret') as string,
      { expiresIn: '100h' }
    )
    const sessKey = defaultIp + defaultUserAgent

    cacheClient.set(sessKey, refreshToken)

    const bodyReq = { refreshToken }
    const resp = await request(app)
      .post(baseUrl)
      .set('User-Agent', defaultUserAgent)
      .send(bodyReq)
    const respData = JSON.parse(resp.text)

    expect(resp.status).toBe(201)
    expect(respData).toHaveProperty('accessToken')
    expect(respData.accessToken).toBeTruthy()
    expect(respData.accessToken).not.toEqual(refreshToken)
  })

  it('Should loggout when refresh-token is expired', async () => {
    const refreshToken = jwt.sign(
      { username: 'kame', id: 'kae' },
      config.get('secret') as string,
      { expiresIn: '-10s' }
    )
    const bodyReq = { refreshToken }
    const resp = await request(app)
      .post(baseUrl)
      .send(bodyReq)
    const respData = JSON.parse(resp.text)

    expect(resp.status).toBe(400)
    expect(respData.message).toBe('Token is expired')
  })

  it('Should reply an error message when token is invalid', async () => {
    const refreshToken = 'kame'
    const bodyReq = { refreshToken }
    const resp = await request(app)
      .post(baseUrl)
      .send(bodyReq)
    const respData = JSON.parse(resp.text)

    expect(resp.status).toBe(400)
    expect(respData.message).toBe('Token is invalid')
  })

  it('Should reply an error message when token is empty', async () => {
    const refreshToken = ''
    const bodyReq = { refreshToken }
    const resp = await request(app)
      .post(baseUrl)
      .send(bodyReq)
    const respData = JSON.parse(resp.text)

    expect(resp.status).toBe(400)
    expect(respData.message).toBe('Token is empty')
  })

  it('Should reply an error when refresh provided token is not in db', async () => {
    const storedToken = jwt.sign(
      { username: 'kamek', id: 'kae' },
      config.get('secret') as string,
      { expiresIn: '100h' }
    )
    const sessKey = defaultIp + defaultUserAgent

    cacheClient.set(sessKey, storedToken)

    const refreshToken = jwt.sign(
      { username: 'kame', id: 'kae' },
      config.get('secret') as string,
      { expiresIn: '100h' }
    )
    const bodyReq = { refreshToken }
    const resp = await request(app)
      .post(baseUrl)
      .send(bodyReq)
    const respData = JSON.parse(resp.text)

    expect(resp.status).toBe(400)
    expect(respData.message).toBe('Token is not found')
  })

  it('Should reply an error when session is not logged in', async () => {

    const refreshToken = jwt.sign(
      { username: 'kame', id: 'kae' },
      config.get('secret') as string,
      { expiresIn: '100h' }
    )
    const bodyReq = { refreshToken }
    const resp = await request(app)
      .post(baseUrl)
      .send(bodyReq)
    const respData = JSON.parse(resp.text)

    expect(resp.status).toBe(400)
    expect(respData.message).toBe('User has not logged in yet')
  })
})
