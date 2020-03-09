import { MongoClient, Db } from 'mongodb'
import config from 'config'

const url: string = config.get('db.mongo.url')
const dbName: string = config.get('db.mongo.dbName')
const dbConfig: object = config.get('db.mongo.config')

const MONGO_EVENT_CONNECTED = 'connected'
const MONGO_EVENT_DISCONNECTED = 'disconnected'

export const client = new MongoClient(url, dbConfig)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
client.connect((err, result) => {
  if (err) client.emit(MONGO_EVENT_DISCONNECTED, err)
  client.emit(MONGO_EVENT_CONNECTED)
})


export function getDb(): Promise<Db> {
  return new Promise<Db>((resolve, reject) => {
    if (client.isConnected()) return resolve(client.db(dbName))
    client.once(MONGO_EVENT_CONNECTED, () => resolve(client.db(dbName)))
    client.once(MONGO_EVENT_DISCONNECTED, err => reject(err))
  })
}

export function isConnected(): boolean {
  return client.isConnected()
}
