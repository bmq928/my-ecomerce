import http from 'http'
import config from 'config'
import winston from 'winston'

import app from './api'
import './logger'


const server = http.createServer(app)
const port = config.get('port')

server.listen(port, () => winston.info('Server is started on port: ' + port))
