import { Router } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import rateLimit from 'express-rate-limit'

const router = Router()

// Short window: 5 failed logins per 15 min per IP → 429
const shortLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  skipSuccessfulRequests: true,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'too many login attempts, try again in 15 minutes' },
})

// Long window: 20 failed logins per hour per IP (catches slow brute force)
const longLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 20,
  skipSuccessfulRequests: true,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'too many login attempts, try again later' },
})

router.post('/login', shortLimiter, longLimiter, async (req, res) => {
  const ip = req.ip
  const { password } = req.body || {}
  const hash = process.env.ADMIN_PASSWORD_HASH

  if (!hash) {
    console.error('[auth] ADMIN_PASSWORD_HASH is not set')
    return res.status(500).json({ error: 'server misconfigured' })
  }
  if (!password || typeof password !== 'string') {
    console.warn(`[auth] login rejected (missing password) ip=${ip}`)
    return res.status(400).json({ error: 'password required' })
  }

  const ok = await bcrypt.compare(password, hash)
  if (!ok) {
    console.warn(`[auth] login FAILED ip=${ip} ua=${req.headers['user-agent'] || '-'}`)
    return res.status(401).json({ error: 'invalid credentials' })
  }

  const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  })
  console.log(`[auth] login OK ip=${ip}`)
  res.json({ token })
})

export default router
