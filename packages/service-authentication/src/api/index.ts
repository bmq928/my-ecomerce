import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import 'express-async-errors'

import EntityError from '@buy1s/entity/src/EntityError'
import { BusinessError, handleError } from '../error-handler'
import healthcheckRoute from './healthcheck'
import readyCheckRoute from './readycheck'
import loginRoute from './login'
import registerRoute from './register'
import logoutRoute from './logout'

const app = express()

app.use(morgan(':method :url :status - :response-time ms'))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', healthcheckRoute)
app.use('/', readyCheckRoute)
app.use('/', loginRoute)
app.use('/', registerRoute)
app.use('/', logoutRoute)

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
