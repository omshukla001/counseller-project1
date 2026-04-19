import mongoose from 'mongoose'

const STATUSES = ['new', 'contacted', 'interested', 'converted', 'not-interested']

const leadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    phone: { type: String, required: true, trim: true, maxlength: 20 },
    rank: { type: String, trim: true, maxlength: 40 },
    branch: { type: String, trim: true, maxlength: 60 },
    source: { type: String, trim: true, maxlength: 120 },
    college: { type: String, trim: true, maxlength: 120 },
    status: { type: String, enum: STATUSES, default: 'new', index: true },
    notes: { type: String, default: '', maxlength: 2000 },
  },
  { timestamps: true }
)

leadSchema.index({ createdAt: -1 })

export const Lead = mongoose.model('Lead', leadSchema)
export { STATUSES }
