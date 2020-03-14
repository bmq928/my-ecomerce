import request from 'supertest'
import config from 'config'
import md5 from 'md5'
import faker from 'faker'
import jwt from 'jsonwebtoken'

import app from '../src/api'
import { disconnectAll, refreshAll } from './_teardown'
import { dbClient, cacheClient } from '../src/repository'
import { makeUserAccount, UserAccount } from '@buy1s/entity/src/user-account'
import { UserRole } from '@buy1s/entity/src/user-role'

describe('[POST] /login', () => {
  const baseApiUrl = '/login'
  const dbName = config.get('db.mongo.dbName') as string
  const accCollectionName = config.get('db.mongo.collection.account') as string

  let generatedFakeAccs: UserAccount[] = []

  beforeEach(async done => {
    const numAutoGenDoc = 5
    const docs = await insertAutogenerate(numAutoGenDoc)
    
    generatedFakeAccs = docs
    done()
  })

  afterEach(async done => {
    await refreshAll()
    done()
  })

  afterAll(async done => {
    await disconnectAll()
    done()
  })

  it('Login success should return a jsonwebtoken', async () => {
    const username = generatedFakeAccs[0].username
    const password = generatedFakeAccs[0].password
    const bodyReq = { username, password }
    const resp = await request(app)
      .post(baseApiUrl)
      .send(bodyReq)
    const respData = JSON.parse(resp.text)

    expect(resp.status).toBe(200)
    expect(respData.token).not.toBeFalsy()
  })

  it('Payload of token should contain ip and username', async () => {
    const username = generatedFakeAccs[0].username
    const password = generatedFakeAccs[0].password
    const bodyReq = { username, password }
    const resp = await request(app)
      .post(baseApiUrl)
      .send(bodyReq)
    const respData = JSON.parse(resp.text)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const payload = jwt.decode(respData.token) as any

    expect(payload).toHaveProperty('id')
    expect(payload.username).toBe(username)
  })

  it('Login success should create a session', async () => {
    const username = generatedFakeAccs[0].username
    const password = generatedFakeAccs[0].password
    const bodyReq = { username, password }

    const resp = await request(app)
      .post(baseApiUrl)
      .send(bodyReq)
    const respData = JSON.parse(resp.text)
    const sessionKey = respData.ip + respData.userAgent

    cacheClient.get(sessionKey, (err, token) => {
      if (err) throw err

      expect(token).toBeTruthy()
    })
  })

  async function insertAutogenerate(numRecord: number): Promise<UserAccount[]> {
    const fakeAccs = []
    for (let i = 0; i < numRecord; i++) {
      const fakeAcc = {
        id: null as string | null,
        username: faker.name.firstName(),
        password: faker.lorem.word(),
        roles: [] as UserRole[],
      }
      fakeAccs.push(makeUserAccount(fakeAcc))
    }

    const hashedPasswordAccounts = fakeAccs.map(acc => ({
      ...acc,
      password: md5(acc.password),
    }))
    await dbClient
      .db(dbName)
      .collection(accCollectionName)
      .insertMany(hashedPasswordAccounts)

    return fakeAccs
  }
})
