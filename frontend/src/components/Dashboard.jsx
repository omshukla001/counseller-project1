import { useState, useEffect } from 'react'
import { getLeads, updateLead, deleteLead, loginAdmin, logoutAdmin, getToken } from '../utils/leads'
import {
  Users, Phone, Clock, CheckCircle, XCircle, Search,
  Trash2, Eye, ArrowLeft, PhoneCall, MessageCircle,
  Filter, Download, RefreshCw, UserCheck, AlertCircle
} from 'lucide-react'

const STATUS_CONFIG = {
  new: { label: 'New', color: 'bg-blue-100 text-blue-800', dot: 'bg-blue-500' },
  contacted: { label: 'Contacted', color: 'bg-yellow-100 text-yellow-800', dot: 'bg-yellow-500' },
  interested: { label: 'Interested', color: 'bg-purple-100 text-purple-800', dot: 'bg-purple-500' },
  converted: { label: 'Converted', color: 'bg-green-100 text-green-800', dot: 'bg-green-500' },
  'not-interested': { label: 'Not Interested', color: 'bg-gray-100 text-gray-600', dot: 'bg-gray-400' },
}

function timeAgo(date) {
  const s = Math.floor((Date.now() - new Date(date)) / 1000)
  if (s < 60) return 'Just now'
  if (s < 3600) return `${Math.floor(s / 60)}m ago`
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`
  return `${Math.floor(s / 86400)}d ago`
}

function formatDate(iso) {
  return new Date(iso).toLocaleString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit', hour12: true,
  })
}

function StatCard({ icon: Icon, label, value, color }) {
  return (
    <div className="bg-white rounded-2xl p-4 md:p-7 border border-gray-100 shadow-sm">
      <div className="flex items-center gap-3 md:gap-5">
        <div className={`w-11 h-11 md:w-14 md:h-14 ${color} rounded-xl flex items-center justify-center shrink-0`}>
          <Icon size={20} className="text-white" />
        </div>
        <div>
          <p className="text-2xl md:text-4xl font-black text-gray-900">{value}</p>
          <p className="text-gray-500 text-xs md:text-base">{label}</p>
        </div>
      </div>
    </div>
  )
}

function LeadDetail({ lead, onBack, onUpdate }) {
  const [notes, setNotes] = useState(lead.notes || '')
  const [status, setStatus] = useState(lead.status)
  const save = () => onUpdate(lead.id, { notes, status })

  return (
    <div className="max-w-2xl mx-auto px-4 md:px-0">
      <button onClick={onBack} className="flex items-center gap-2 text-gray-500 hover:text-gray-800 text-[15px] font-medium mb-6">
        <ArrowLeft size={18} /> Back to Leads
      </button>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="bg-[#102C57] px-5 md:px-8 py-5 md:py-7">
          <h2 className="text-white font-black text-xl md:text-2xl">{lead.name}</h2>
          <p className="text-white/60 text-sm mt-1">Lead from {lead.source} · {formatDate(lead.createdAt)}</p>
          {lead.college && (
            <span className="inline-block mt-2 bg-white/10 border border-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full">
              {lead.college}
            </span>
          )}
        </div>

        <div className="p-5 md:p-8 space-y-6 md:space-y-7">
          {/* Contact */}
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            <div>
              <p className="text-[11px] md:text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1.5">Phone</p>
              <a href={`tel:${lead.phone}`} className="text-blue-700 font-bold text-[15px] md:text-lg flex items-center gap-2">
                <Phone size={16} /> {lead.phone}
              </a>
            </div>
            <div>
              <p className="text-[11px] md:text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1.5">WhatsApp</p>
              <a href={`https://wa.me/${lead.phone.replace(/\D/g, '')}`} target="_blank" rel="noreferrer"
                className="text-green-600 font-bold text-[15px] md:text-lg flex items-center gap-2">
                <MessageCircle size={16} /> Message
              </a>
            </div>
          </div>

          {/* Details */}
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            {lead.rank && (
              <div>
                <p className="text-[11px] md:text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1.5">Rank / Score</p>
                <p className="text-gray-800 font-semibold text-[15px] md:text-base">{lead.rank}</p>
              </div>
            )}
            {lead.branch && (
              <div>
                <p className="text-[11px] md:text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1.5">Preferred Branch</p>
                <p className="text-gray-800 font-semibold text-[15px] md:text-base">{lead.branch}</p>
              </div>
            )}
          </div>

          {/* Status */}
          <div>
            <p className="text-[11px] md:text-xs text-gray-400 font-semibold uppercase tracking-wider mb-2.5">Status</p>
            <div className="flex flex-wrap gap-2">
              {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
                <button key={key} onClick={() => setStatus(key)}
                  className={`px-3.5 md:px-4 py-2 rounded-full text-[13px] md:text-sm font-bold border-2 transition-all ${status === key
                    ? `${cfg.color} border-current`
                    : 'bg-gray-50 text-gray-400 border-transparent hover:border-gray-200'}`}>
                  {cfg.label}
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <p className="text-[11px] md:text-xs text-gray-400 font-semibold uppercase tracking-wider mb-2.5">Notes</p>
            <textarea value={notes} onChange={e => setNotes(e.target.value)}
              placeholder="Add notes about this lead..."
              className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-[15px] md:text-sm leading-relaxed focus:outline-none focus:border-[#1E3A8A] resize-none h-28 md:h-32" />
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button onClick={save}
              className="flex-1 bg-[#1E3A8A] hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 text-[15px] md:text-lg">
              <CheckCircle size={18} /> Save Changes
            </button>
            <a href={`tel:${lead.phone}`}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 px-5 md:px-8 rounded-xl transition-colors flex items-center gap-2 text-[15px] md:text-lg">
              <PhoneCall size={18} /> Call
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Dashboard({ onBack }) {
  const [authed, setAuthed] = useState(!!getToken())
  const [pass, setPass] = useState('')
  const [passError, setPassError] = useState(false)
  const [loggingIn, setLoggingIn] = useState(false)
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selected, setSelected] = useState(null)
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  const fetchLeads = async () => {
    setLoading(true)
    try {
      setLeads(await getLeads())
    } catch (err) {
      if (err.status === 401) { logoutAdmin(); setAuthed(false) }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (authed) fetchLeads()
  }, [authed])

  const refresh = () => fetchLeads()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoggingIn(true)
    setPassError(false)
    try {
      await loginAdmin(pass)
      setAuthed(true)
    } catch {
      setPassError(true)
    } finally {
      setLoggingIn(false)
    }
  }

  const handleLogout = () => { logoutAdmin(); setAuthed(false); setLeads([]) }

  const handleUpdate = async (id, updates) => {
    const updated = await updateLead(id, updates)
    setLeads(prev => prev.map(l => (l.id === id ? updated : l)))
    setSelected(null)
  }
  const handleDelete = async (id) => {
    await deleteLead(id)
    setLeads(prev => prev.filter(l => l.id !== id))
    setDeleteConfirm(null)
  }
  const handleStatusQuick = async (id, status) => {
    const updated = await updateLead(id, { status })
    setLeads(prev => prev.map(l => (l.id === id ? updated : l)))
  }

  const exportCSV = () => {
    const headers = ['Name', 'Phone', 'Rank', 'Branch', 'College', 'Source', 'Status', 'Notes', 'Date']
    const rows = filteredLeads.map(l => [
      l.name, l.phone, l.rank || '', l.branch || '', l.college || '', l.source || '',
      STATUS_CONFIG[l.status]?.label || l.status, l.notes || '', formatDate(l.createdAt)
    ])
    const csv = [headers, ...rows].map(r => r.map(c => `"${c}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = `leads_${new Date().toISOString().slice(0, 10)}.csv`; a.click()
    URL.revokeObjectURL(url)
  }

  const filteredLeads = leads.filter(l => {
    const matchSearch = !search || l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.phone.includes(search) || (l.branch || '').toLowerCase().includes(search.toLowerCase()) ||
      (l.college || '').toLowerCase().includes(search.toLowerCase())
    const matchStatus = filterStatus === 'all' || l.status === filterStatus
    return matchSearch && matchStatus
  })

  const stats = {
    total: leads.length,
    new: leads.filter(l => l.status === 'new').length,
    contacted: leads.filter(l => l.status === 'contacted').length,
    converted: leads.filter(l => l.status === 'converted').length,
    today: leads.filter(l => new Date(l.createdAt).toDateString() === new Date().toDateString()).length,
  }

  // ── Login ──
  if (!authed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-[#102C57] to-gray-900 flex items-center justify-center p-5">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">
          <div className="bg-[#102C57] px-6 py-7 text-center">
            <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Users size={26} className="text-white" />
            </div>
            <h2 className="text-white font-black text-xl">Lead Dashboard</h2>
            <p className="text-white/60 text-sm mt-1">Knowledge Park 360</p>
          </div>
          <form onSubmit={handleLogin} className="p-6 space-y-4">
            <div>
              <label className="text-gray-700 text-sm font-semibold block mb-1.5">Password</label>
              <input type="password" required value={pass} onChange={e => { setPass(e.target.value); setPassError(false) }}
                placeholder="Enter dashboard password"
                className={`w-full border rounded-xl px-4 py-3.5 text-base focus:outline-none focus:border-[#1E3A8A] ${passError ? 'border-red-400 bg-red-50' : 'border-gray-200'}`} />
              {passError && <p className="text-red-500 text-sm mt-1.5 flex items-center gap-1"><AlertCircle size={14} /> Incorrect password</p>}
            </div>
            <button type="submit" disabled={loggingIn} className="w-full bg-[#1E3A8A] hover:bg-blue-700 disabled:opacity-60 text-white font-bold py-3.5 rounded-xl transition-colors text-base">
              {loggingIn ? 'Signing in…' : 'Login'}
            </button>
            <button type="button" onClick={onBack} className="w-full text-gray-400 hover:text-gray-600 text-sm font-medium py-2">
              ← Back to Website
            </button>
          </form>
        </div>
      </div>
    )
  }

  // ── Lead detail ──
  if (selected) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] py-5 md:p-10">
        <LeadDetail lead={selected} onBack={() => setSelected(null)} onUpdate={handleUpdate} />
      </div>
    )
  }

  // ── Main dashboard ──
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 md:py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 md:w-12 md:h-12 bg-[#102C57] rounded-xl flex items-center justify-center">
              <Users size={16} className="text-white md:hidden" />
              <Users size={22} className="text-white hidden md:block" />
            </div>
            <div>
              <h1 className="font-black text-gray-900 text-base md:text-2xl">Lead Dashboard</h1>
              <p className="text-gray-400 text-[11px] md:text-sm">Knowledge Park 360</p>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <button onClick={refresh} className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Refresh">
              <RefreshCw size={16} className="text-gray-500" />
            </button>
            <button onClick={exportCSV} className="hidden md:flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-base font-semibold px-5 py-2.5 rounded-xl transition-colors">
              <Download size={16} /> Export CSV
            </button>
            <button onClick={exportCSV} className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Export">
              <Download size={16} className="text-gray-500" />
            </button>
            <button onClick={handleLogout} className="text-gray-400 hover:text-gray-600 text-sm font-medium px-2 md:px-4 py-2 hidden md:inline">
              Logout
            </button>
            <button onClick={onBack} className="text-gray-400 hover:text-gray-600 text-sm font-medium px-2 md:px-4 py-2">
              ← Site
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-5 md:py-8 space-y-5 md:space-y-8">

        {/* Stats — 2 cols on mobile, scrollable */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
          <StatCard icon={Users} label="Total Leads" value={stats.total} color="bg-[#1E3A8A]" />
          <StatCard icon={AlertCircle} label="New" value={stats.new} color="bg-blue-500" />
          <StatCard icon={PhoneCall} label="Contacted" value={stats.contacted} color="bg-yellow-500" />
          <StatCard icon={UserCheck} label="Converted" value={stats.converted} color="bg-green-500" />
          <StatCard icon={Clock} label="Today" value={stats.today} color="bg-purple-500" />
        </div>

        {/* Search + Filters */}
        <div className="space-y-3 md:space-y-0 md:flex md:flex-row md:gap-4">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search name, phone, college..."
              className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-[15px] md:text-lg focus:outline-none focus:border-[#1E3A8A] bg-white" />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
            {['all', ...Object.keys(STATUS_CONFIG)].map(s => (
              <button key={s} onClick={() => setFilterStatus(s)}
                className={`px-3.5 py-2 rounded-full text-[13px] md:text-base font-bold transition-all whitespace-nowrap shrink-0 ${filterStatus === s
                  ? 'bg-[#1E3A8A] text-white'
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
                {s === 'all' ? 'All' : STATUS_CONFIG[s].label}
              </button>
            ))}
          </div>
        </div>

        {/* Leads */}
        {filteredLeads.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-10 md:p-20 text-center">
            <Users size={48} className="text-gray-200 mx-auto mb-4" />
            <p className="text-gray-400 font-semibold text-[15px] md:text-lg">
              {leads.length === 0 ? 'No leads yet. They will appear here when someone fills a form.' : 'No leads match your search.'}
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/50">
                    {['Name', 'Phone', 'College / Branch', 'Source', 'Status', 'Time', 'Actions'].map((h, i) => (
                      <th key={h} className={`${i === 6 ? 'text-right' : 'text-left'} text-sm font-semibold text-gray-400 uppercase tracking-wider px-6 py-4`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map(l => (
                    <tr key={l.id} className="border-b border-gray-50 hover:bg-blue-50/30 transition-colors">
                      <td className="px-6 py-5">
                        <p className="font-bold text-gray-900 text-base">{l.name}</p>
                        {l.rank && <p className="text-gray-400 text-sm mt-0.5">Rank: {l.rank}</p>}
                      </td>
                      <td className="px-6 py-5">
                        <a href={`tel:${l.phone}`} className="text-blue-700 text-base font-medium hover:underline">{l.phone}</a>
                      </td>
                      <td className="px-6 py-5">
                        {l.college && <p className="text-gray-800 text-sm font-semibold">{l.college}</p>}
                        <p className="text-gray-400 text-sm">{l.branch || '—'}</p>
                      </td>
                      <td className="px-6 py-5 text-base text-gray-400">{l.source || '—'}</td>
                      <td className="px-6 py-5">
                        <select value={l.status} onChange={e => handleStatusQuick(l.id, e.target.value)}
                          className={`text-sm font-bold px-3.5 py-1.5 rounded-full border-0 cursor-pointer ${STATUS_CONFIG[l.status]?.color || 'bg-gray-100'}`}>
                          {Object.entries(STATUS_CONFIG).map(([k, v]) => (
                            <option key={k} value={k}>{v.label}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-6 py-5 text-base text-gray-400">{timeAgo(l.createdAt)}</td>
                      <td className="px-6 py-5">
                        <div className="flex items-center justify-end gap-2.5">
                          <button onClick={() => setSelected(l)} className="p-2.5 hover:bg-blue-100 rounded-lg"><Eye size={18} className="text-blue-600" /></button>
                          <a href={`https://wa.me/${l.phone.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="p-2.5 hover:bg-green-100 rounded-lg"><MessageCircle size={18} className="text-green-600" /></a>
                          <a href={`tel:${l.phone}`} className="p-2.5 hover:bg-blue-100 rounded-lg"><PhoneCall size={18} className="text-blue-600" /></a>
                          {deleteConfirm === l.id ? (
                            <div className="flex items-center gap-1.5">
                              <button onClick={() => handleDelete(l.id)} className="p-2.5 bg-red-100 hover:bg-red-200 rounded-lg"><CheckCircle size={18} className="text-red-600" /></button>
                              <button onClick={() => setDeleteConfirm(null)} className="p-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg"><XCircle size={18} className="text-gray-500" /></button>
                            </div>
                          ) : (
                            <button onClick={() => setDeleteConfirm(l.id)} className="p-2.5 hover:bg-red-100 rounded-lg"><Trash2 size={18} className="text-red-400" /></button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden divide-y divide-gray-100">
              {filteredLeads.map(l => (
                <div key={l.id} className="p-4 space-y-3">
                  {/* Row 1: Name + Status */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-bold text-gray-900 text-[16px]">{l.name}</p>
                      <a href={`tel:${l.phone}`} className="text-blue-700 text-[14px] font-medium block mt-0.5">{l.phone}</a>
                    </div>
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full shrink-0 ${STATUS_CONFIG[l.status]?.color}`}>
                      {STATUS_CONFIG[l.status]?.label}
                    </span>
                  </div>

                  {/* Row 2: Meta info */}
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-gray-400">
                    {l.college && <span className="text-gray-600 font-semibold">{l.college}</span>}
                    {l.branch && <span>{l.branch}</span>}
                    {l.rank && <span>Rank: {l.rank}</span>}
                    <span>{timeAgo(l.createdAt)}</span>
                  </div>

                  {/* Row 3: Actions */}
                  <div className="flex gap-2">
                    <button onClick={() => setSelected(l)}
                      className="flex-1 bg-gray-50 border border-gray-200 text-gray-700 text-[14px] font-semibold py-2.5 rounded-xl flex items-center justify-center gap-1.5 active:scale-[0.97] transition-transform">
                      <Eye size={15} /> View
                    </button>
                    <a href={`tel:${l.phone}`}
                      className="flex-1 bg-blue-50 border border-blue-200 text-blue-700 text-[14px] font-semibold py-2.5 rounded-xl flex items-center justify-center gap-1.5 active:scale-[0.97] transition-transform">
                      <PhoneCall size={15} /> Call
                    </a>
                    <a href={`https://wa.me/${l.phone.replace(/\D/g, '')}`} target="_blank" rel="noreferrer"
                      className="flex-1 bg-green-50 border border-green-200 text-green-700 text-[14px] font-semibold py-2.5 rounded-xl flex items-center justify-center gap-1.5 active:scale-[0.97] transition-transform">
                      <MessageCircle size={15} /> WA
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <p className="text-center text-sm text-gray-300 py-4">
          Showing {filteredLeads.length} of {leads.length} leads · Stored locally
        </p>
      </div>
    </div>
  )
}
