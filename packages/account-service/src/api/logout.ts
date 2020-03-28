import { Router } from 'express'
import { removeSession } from '../service'

const router = Router()

router.put('/logout', async (req, res) => {
  await removeSession(req.ip, req.headers['user-agent'])
  res.status(204).send('')
})

export default router
