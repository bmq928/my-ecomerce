import app from '.'
import request from 'supertest'

import { accountRepo } from '../repository'

describe('Router route', () => {
  const baseApiUrl = '/register'

  it('Missing username should return an error', async () => {
    const bodyReq = {}

    const resp = await request(app)
      .post(baseApiUrl)
      .send(bodyReq)
    const respData = JSON.parse(resp.text)

    expect(resp.status).toBe(400)
    expect(respData).toHaveProperty('message')
    expect(respData.message).toBe('username must be a string in UserAccount')
  })

  it('Missing password should return an error', async () => {
    const username = 'user'
    const bodyReq = { username }

    const resp = await request(app)
      .post(baseApiUrl)
      .send(bodyReq)
    const respData = JSON.parse(resp.text)

    expect(resp.status).toBe(400)
    expect(respData).toHaveProperty('message')
    expect(respData.message).toBe('password is required for creating user account')
  })

  it('Wrong type username should return an error', async () => {
    const bodyReq = {}

    const resp = await request(app)
      .post(baseApiUrl)
      .send(bodyReq)
    const respData = JSON.parse(resp.text)

    expect(resp.status).toBe(400)
    expect(respData).toHaveProperty('message')
    expect(respData.message).toBe('username must be a string in UserAccount')
  })

  it('Wrong type password should return an error', async () => {
    const username = 'user'
    const password = {}
    const bodyReq = { username, password }

    const resp = await request(app)
      .post(baseApiUrl)
      .send(bodyReq)
    const respData = JSON.parse(resp.text)

    expect(resp.status).toBe(400)
    expect(respData).toHaveProperty('message')
    expect(respData.message).toBe('password must be string in UserAccount')
  })

  it('Should create an user when infomation is correct', async () => {
    const username = 'koka'
    const password = '12345678'
    const bodyReq = { username, password }

    const resp = await request(app)
      .post(baseApiUrl)
      .send(bodyReq)
    const respData = JSON.parse(resp.text)

    expect(resp.status).toBe(201)
    expect(respData.username).toBe(username)
    expect(await accountRepo.findByUsername(username)).not.toBe(null)
  })
})