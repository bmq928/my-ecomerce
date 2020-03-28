import config from 'config'

import { dbClient, cacheClient } from '../src/repository'

export async function disconnectAll(): Promise<void> {
  await Promise.all([disconnectCache(), disconnectDb()])
}

export async function disconnectDb(): Promise<void> {
  await dbClient.close()
}

export function disconnectCache(): Promise<void> {
  return new Promise((resolve, reject) => {
    cacheClient.quit(err => {
      if (err) reject(err)
      else resolve()
    })
  })
}

export async function refreshAll(): Promise<void> {
  await Promise.all([refreshCache(), refreshDb()])
}

export async function refreshDb(): Promise<void> {
  const dbName = config.get('db.mongo.dbName') as string
  await dbClient.db(dbName).dropDatabase()
}

export function refreshCache(): Promise<void> {
  return new Promise(resolve => cacheClient.flushall(() => resolve()))
}
