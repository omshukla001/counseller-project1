import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { createLead, listLeads, updateLead, deleteLead } from '../controllers/leadController.js'
import { requireAdmin } from '../middleware/auth.js'

const router = Router()

const createLimiter = rateLimit({ windowMs: 10 * 60 * 1000, max: 20 })

router.post('/', createLimiter, asyncH(createLead))
router.get('/', requireAdmin, asyncH(listLeads))
router.patch('/:id', requireAdmin, asyncH(updateLead))
router.delete('/:id', requireAdmin, asyncH(deleteLead))

function asyncH(fn) {
  return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)
}

export default router
