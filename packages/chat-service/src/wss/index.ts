import { Server } from 'http'
import makeSocketIo from 'socket.io'
import winston from 'winston'
import config from 'config'
import redisAdapter from 'socket.io-redis'

export function allowWebsocketForServer(server: Server): void {
  const io = makeSocketIo(server)
  io.adapter(
    redisAdapter({
      host: config.get('db.redis.host') as string,
      port: config.get('db.redis.port') as number,
    })
  )

  io.on('connection', () => {
    winston.info('Socket io is connected')
  })
}
