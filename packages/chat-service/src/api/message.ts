import { Router } from 'express'

const router = Router()

router.post('/message', (req, res) => {
  res.send('ok')
})

export default router
