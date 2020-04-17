import { Router } from 'express'

const router = Router()

router.get('/online', (req, res) => {
  res.send('ok')
})

export default router
