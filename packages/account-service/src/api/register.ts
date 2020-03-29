import { Router } from 'express'
import { makeUserAccount } from '@buy1s/account-entity'

import { createAccount } from '../use-cases'

const router = Router()


router.post('/register', async (req, res) => {
  const userAcc = makeUserAccount(req.body, 'CREATE')
  const userAccCreated = await createAccount(userAcc)
  res.status(201).json(userAccCreated)
})

export default router
