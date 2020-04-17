import { Router } from 'express'

import { isDbConnected } from '../repositories'

const router = Router()

router.get('/ready', (req, res) => {
  const isRepoReady = isDbConnected()
  
  if (isRepoReady) res.status(200).send('ok')
  else res.status(503).send('not ready')
})

export default router
