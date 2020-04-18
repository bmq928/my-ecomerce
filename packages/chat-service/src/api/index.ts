import express, { Request, Response, NextFunction } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import bodyParser from 'body-parser'
import { EntityError } from '@buy1s/chat-entity'

import healthCheckRoute from './healthcheck'
import readyCheckRoute from './readycheck'
import messageRoute from './message'
import onlineRoute from './online'
import { handleError, BusinessError } from '../error-handler'

const app = express()

app.use(morgan(':method :url :status - :response-time ms'))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', healthCheckRoute)
app.use('/', readyCheckRoute)
app.use('/', messageRoute)
app.use('/', onlineRoute)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  const isSendErrToClient =
    err instanceof EntityError || err instanceof BusinessError

  if (isSendErrToClient) {
    res.status(400).json({ message: err.message })
    return
  }

  handleError(err)
  throw err
})

export default app
