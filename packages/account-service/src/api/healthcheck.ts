import { Router } from 'express'

const router = Router()

router.get('/health', (req, res) => res.send('ok').status(200))

export default router
