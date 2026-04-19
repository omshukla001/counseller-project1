import { Lead, STATUSES } from '../models/Lead.js'

export async function createLead(req, res) {
  const { name, phone, rank, branch, source, college } = req.body
  if (!name || !phone) return res.status(400).json({ error: 'name and phone are required' })
  const lead = await Lead.create({ name, phone, rank, branch, source, college })
  res.status(201).json(lead)
}

export async function listLeads(req, res) {
  const { status, q, limit = 200 } = req.query
  const filter = {}
  if (status && STATUSES.includes(status)) filter.status = status
  if (q) {
    const rx = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i')
    filter.$or = [{ name: rx }, { phone: rx }, { college: rx }, { source: rx }]
  }
  const leads = await Lead.find(filter).sort({ createdAt: -1 }).limit(Math.min(Number(limit), 1000))
  res.json(leads)
}

export async function updateLead(req, res) {
  const { status, notes } = req.body
  const update = {}
  if (status !== undefined) {
    if (!STATUSES.includes(status)) return res.status(400).json({ error: 'invalid status' })
    update.status = status
  }
  if (notes !== undefined) update.notes = notes
  const lead = await Lead.findByIdAndUpdate(req.params.id, update, { new: true })
  if (!lead) return res.status(404).json({ error: 'not found' })
  res.json(lead)
}

export async function deleteLead(req, res) {
  const lead = await Lead.findByIdAndDelete(req.params.id)
  if (!lead) return res.status(404).json({ error: 'not found' })
  res.json({ ok: true })
}
