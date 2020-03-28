import { Router } from 'express'
import { createAccessToken, validateToken } from '../use-cases'

const router = Router()

router.post('/refresh-token', async (req, res) => {
  const refreshToken = req.body.refreshToken as string

  validateToken(refreshToken)
  const accessToken = await createAccessToken(
    refreshToken,
    req.ip,
    req.headers['user-agent']
  )

  res.status(201).json({ accessToken })
})

export default router
