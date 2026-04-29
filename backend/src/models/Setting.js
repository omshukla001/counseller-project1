import mongoose from 'mongoose'

const settingSchema = new mongoose.Schema(
  {
    _id: { type: String, default: 'site' },
    formPopupEnabled: { type: Boolean, default: false },
  },
  { timestamps: true }
)

export const Setting = mongoose.model('Setting', settingSchema)
