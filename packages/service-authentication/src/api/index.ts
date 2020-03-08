import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import 'express-async-errors'

import EntityError from '@buy1s/entity/src/EntityError'

import healthcheckRoute from './healthcheck'
import loginRoute from './login'
import registerRoute from './register'

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', healthcheckRoute)
app.use('/', loginRoute)
app.use('/', registerRoute)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof EntityError) {
    res.status(400).json({ message: err.message })
  }
  throw err
})

export default app
