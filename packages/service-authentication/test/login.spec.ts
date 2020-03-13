import request from 'supertest'
import config from 'config'
import md5 from 'md5'
import faker from 'faker'

import app from '../src/api'
import { dbClient } from '../src/repository'
import { makeUserAccount, UserAccount } from '@buy1s/entity/src/user-account'
import { UserRole } from '@buy1s/entity/src/user-role'

describe('[POST] /login', () => {
  const baseApiUrl = '/login'
  const dbName = config.get('db.mongo.dbName') as string
  const accCollectionName = config.get('db.mongo.collection.account') as string

  let generatedFakeAccs: UserAccount[] = []

  beforeEach(done => {
    const numAutoGenDoc = 5
    insertAutogenerate(numAutoGenDoc)
      .then(docs => (generatedFakeAccs = docs))
      .then(done)
  })

  afterEach(done => {
    dbClient
      .db(dbName)
      .dropDatabase()
      .then(() => (generatedFakeAccs.length = 0))
      .then(done)
  })

  afterAll(done => {
    dbClient.close().then(done)
  })

  it('Login success should return a jsonwebtoken', async () => {
    const username = generatedFakeAccs[0].username
    const password = generatedFakeAccs[0].password
    const bodyReq = { username, password }
    const resp = await request(app)
      .post(baseApiUrl)
      .send(bodyReq)
    const respData = JSON.parse(resp.text)

    expect(resp.ok).toBe(true)
    expect(respData.token).not.toBeFalsy()
  })

  async function insertAutogenerate(numRecord: number): Promise<UserAccount[]> {
    const fakeAccs = []
    for (let i = 0; i < numRecord; i++) {
      const fakeAcc = {
        id: null as string | null,
        username: faker.name.firstName(),
        password: md5(faker.lorem.word()),
        roles: [] as UserRole[],
      }
      fakeAccs.push(makeUserAccount(fakeAcc))
    }

    await dbClient
      .db(dbName)
      .collection(accCollectionName)
      .insertMany(fakeAccs)

    return fakeAccs
  }
})
