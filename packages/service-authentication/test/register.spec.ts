import request from 'supertest'
import config from 'config'
import md5 from 'md5'

import app from '../src/api'
import { dbClient } from '../src/repository'

describe('Router route', () => {
  const baseApiUrl = '/register'
  const dbName: string = config.get('db.mongo.dbName')
  const accCollectionName: string = config.get('db.mongo.collection.account')

  afterEach(() => {
    dbClient.db(dbName).dropDatabase()
  })

  afterAll(() => {
    dbClient.close()
  })

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
    expect(respData.message).toBe(
      'password is required for creating user account'
    )
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

    const db = dbClient.db(dbName)
    const createdUserInDb = db
      .collection(accCollectionName)
      .findOne({ username })
    expect(createdUserInDb).not.toBeFalsy()
  })

  it('Password should be encrypted before saving to db', async () => {
    const username = 'koka'
    const password = '12345678'
    const bodyReq = { username, password }

    await request(app)
      .post(baseApiUrl)
      .send(bodyReq)

    const db = dbClient.db(dbName)
    const createdUserInDb = await db
      .collection(accCollectionName)
      .findOne({ username })

    expect(createdUserInDb).toHaveProperty('password')
    expect(createdUserInDb.password).toBe(md5(password))
  })

  it('Should not exist 2 user in db with same username', async () => {
    const username = 'koka'
    const password = '12345678'
    const bodyReq = { username, password }

    const db = dbClient.db(dbName)
    await db.collection(accCollectionName).insertOne({ username })

    const resp = await request(app)
      .post(baseApiUrl)
      .send(bodyReq)
    const respData = JSON.parse(resp.text)

    expect(respData.message).toBe('account is existed')
  })
})
