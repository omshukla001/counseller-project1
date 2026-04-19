const API_URL = import.meta.env.VITE_API_URL || ''
const TOKEN_KEY = 'kp360_admin_token'

export function getToken() {
  return localStorage.getItem(TOKEN_KEY) || ''
}
export function setToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token)
  else localStorage.removeItem(TOKEN_KEY)
}

async function request(path, { method = 'GET', body, auth = false } = {}) {
  const headers = { 'Content-Type': 'application/json' }
  if (auth) {
    const token = getToken()
    if (token) headers.Authorization = `Bearer ${token}`
  }
  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }))
    const e = new Error(err.error || 'request failed')
    e.status = res.status
    throw e
  }
  return res.json()
}

export async function loginAdmin(password) {
  const { token } = await request('/api/auth/login', { method: 'POST', body: { password } })
  setToken(token)
  return token
}

export function logoutAdmin() {
  setToken('')
}

export async function saveLead(lead) {
  const created = await request('/api/leads', { method: 'POST', body: lead })
  return normalize(created)
}

export async function getLeads() {
  const leads = await request('/api/leads', { auth: true })
  return leads.map(normalize)
}

export async function updateLead(id, updates) {
  const lead = await request(`/api/leads/${id}`, { method: 'PATCH', body: updates, auth: true })
  return normalize(lead)
}

export async function deleteLead(id) {
  await request(`/api/leads/${id}`, { method: 'DELETE', auth: true })
  return { id }
}

function normalize(lead) {
  return { ...lead, id: lead._id || lead.id, createdAt: lead.createdAt }
}
