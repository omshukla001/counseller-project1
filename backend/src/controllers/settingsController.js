import { Setting } from '../models/Setting.js'

async function loadOrCreate() {
  let doc = await Setting.findById('site')
  if (!doc) doc = await Setting.create({ _id: 'site' })
  return doc
}

export async function getSettings(_req, res) {
  const doc = await loadOrCreate()
  res.json({ formPopupEnabled: doc.formPopupEnabled })
}

export async function updateSettings(req, res) {
  const { formPopupEnabled } = req.body
  const update = {}
  if (typeof formPopupEnabled === 'boolean') update.formPopupEnabled = formPopupEnabled
  const doc = await Setting.findByIdAndUpdate(
    'site',
    { $set: update },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  )
  res.json({ formPopupEnabled: doc.formPopupEnabled })
}
