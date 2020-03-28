import config from 'config'
import { Collection } from 'mongodb'
import { UserAccount, makeUserAccount } from '@entity/user-account'

import { getDb } from './_db'

export async function create(userAccount: UserAccount): Promise<void> {
  const accDTO = await getAccDTO()
  await accDTO.insertOne(userAccount)
}

export async function findById(id: string): Promise<UserAccount> {
  const accDTO = await getAccDTO()
  const resp = await accDTO.findOne({ id })
  return makeUserAccount(resp)
}

export async function findByUsername(username: string): Promise<UserAccount> {
  const accDTO = await getAccDTO()
  const resp = await accDTO.findOne({ username })
  return makeUserAccount(resp)
}

async function getAccDTO(): Promise<Collection<UserAccount>> {
  const name = config.get('db.mongo.collection.account') as string
  const db = await getDb()
  const accDTO = db.collection(name)
  return accDTO
}
