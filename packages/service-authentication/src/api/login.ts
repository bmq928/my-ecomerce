import { Router } from 'express'
import config from 'config'
import { makeUserAccount } from '@buy1s/entity/src/user-account'
import {
  generateTokenWithPayloadFrom,
  getSession,
  createSession,
} from '../service'

const router = Router()

router.get('/login', async (req, res) => {
  const sess = await getSession(req.ip, req.headers['user-agent'])
  const refreshToken = sess.token
  const accessTokenExpiredIn = config.get('accessTokenExpiredIn') as string
  const accessToken = generateTokenWithPayloadFrom(
    refreshToken,
    accessTokenExpiredIn
  )

  res.status(200).json({ refreshToken, accessToken })
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
