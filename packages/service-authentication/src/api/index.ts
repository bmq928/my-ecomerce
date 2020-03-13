import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import 'express-async-errors'

import EntityError from '@buy1s/entity/src/EntityError'

import healthcheckRoute from './healthcheck'
import readyCheckRoute from './readycheck'
import loginRoute from './login'
import registerRoute from './register'

const app = express()

app.use(morgan(':method :url :status - :response-time ms'))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', healthcheckRoute)
app.use('/', readyCheckRoute)
app.use('/', loginRoute)
app.use('/', registerRoute)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof EntityError) {
    res.status(400).json({ message: err.message })
  }
  throw err
})

export default app
