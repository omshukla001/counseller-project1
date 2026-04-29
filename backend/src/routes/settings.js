import { Router } from 'express'
import { getSettings, updateSettings } from '../controllers/settingsController.js'
import { requireAdmin } from '../middleware/auth.js'

const router = Router()

router.get('/', asyncH(getSettings))
router.patch('/', requireAdmin, asyncH(updateSettings))

function asyncH(fn) {
  return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)
}

export default router
