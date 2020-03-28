import { Router } from 'express'
import { makeUserAccount } from '@entity/user-account'

import { createAccount } from '../service'

const router = Router()


router.post('/register', async (req, res) => {
  const userAcc = makeUserAccount(req.body, 'CREATE')
  const userAccCreated = await createAccount(userAcc)
  res.status(201).json(userAccCreated)
})

export default router
