const LEADS_KEY = 'kp360_leads'

export function getLeads() {
  try {
    return JSON.parse(localStorage.getItem(LEADS_KEY) || '[]')
  } catch { return [] }
}

export function saveLead(lead) {
  const leads = getLeads()
  const newLead = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    ...lead,
    status: 'new',
    createdAt: new Date().toISOString(),
    notes: '',
  }
  leads.unshift(newLead)
  localStorage.setItem(LEADS_KEY, JSON.stringify(leads))
  return newLead
}

export function updateLead(id, updates) {
  const leads = getLeads()
  const idx = leads.findIndex(l => l.id === id)
  if (idx !== -1) {
    leads[idx] = { ...leads[idx], ...updates }
    localStorage.setItem(LEADS_KEY, JSON.stringify(leads))
  }
  return leads
}

export function deleteLead(id) {
  const leads = getLeads().filter(l => l.id !== id)
  localStorage.setItem(LEADS_KEY, JSON.stringify(leads))
  return leads
}
