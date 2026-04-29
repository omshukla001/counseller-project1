import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'

import { connectDB } from './config/db.js'
import leadRoutes from './routes/leads.js'
import authRoutes from './routes/auth.js'
import settingsRoutes from './routes/settings.js'
import { errorHandler, notFound } from './middleware/error.js'

const app = express()
const PORT = process.env.PORT || 5000

app.set('trust proxy', 1)
app.use(helmet())
app.use(cors({ origin: process.env.CORS_ORIGIN?.split(',') || '*', credentials: true }))
app.use(express.json({ limit: '100kb' }))
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'))

app.use('/api/', rateLimit({ windowMs: 15 * 60 * 1000, max: 300 }))

app.get('/health', (_req, res) => res.json({ status: 'ok', ts: Date.now() }))

app.use('/api/auth', authRoutes)
app.use('/api/leads', leadRoutes)
app.use('/api/settings', settingsRoutes)

app.use(notFound)
app.use(errorHandler)

connectDB().then(() => {
  app.listen(PORT, () => console.log(`API listening on :${PORT}`))
})
