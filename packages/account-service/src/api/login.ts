import { Router } from 'express'
import { makeUserAccount } from '@entity/user-account'

import {
  getSession,
  createSession,
} from '../use-cases'

const router = Router()

router.get('/login', async (req, res) => {
  await getSession(req.ip, req.headers['user-agent'])
  res.status(200).send('ok')
})

router.post('/login', async (req, res) => {
  const userAcc = makeUserAccount(req.body)
  const sessInfo = await createSession(
    userAcc,
    req.ip,
    req.headers['user-agent']
  )

  res.status(200).json(sessInfo)
})

export default router
