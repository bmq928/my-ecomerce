import { Router } from 'express'
import { makeUserAccount } from '@buy1s/entity/src/user-account'
import { createSession } from '../service/create-session'

const router = Router()

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
