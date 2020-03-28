import config from 'config'
import { Collection } from 'mongodb'
import { UserAccount, makeUserAccount } from '@entity/user-account'

import { getDb } from './_mongo'

export async function create(userAccount: UserAccount): Promise<void> {
  const accDAO = await getAccDAO()
  await accDAO.insertOne(userAccount)
}

export async function findById(id: string): Promise<UserAccount> {
  const accDAO = await getAccDAO()
  const resp = await accDAO.findOne({ id })
  return makeUserAccount(resp)
}

export async function findByUsername(username: string): Promise<UserAccount> {
  const accDAO = await getAccDAO()
  const resp = await accDAO.findOne({ username })
  return makeUserAccount(resp)
}

async function getAccDAO(): Promise<Collection<UserAccount>> {
  const name = config.get('db.mongo.collection.account.name') as string
  const db = await getDb()
  const accDAO = db.collection(name)
  return accDAO
}
