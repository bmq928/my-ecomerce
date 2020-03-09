import http from 'http'
import config from 'config'
import winston from 'winston'

import app from './api'
import { handleError } from './error-handler'
import './logger'

process.on('unhandledRejection', (reason: string) => {
  throw reason
})

process.on('uncaughtException', (error: Error) => {
  handleError(error)
  process.exit(1)
})

const server = http.createServer(app)
const port = config.get('port')

server.listen(port, () => winston.info('Server is started on port: ' + port))
