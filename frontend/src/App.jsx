import { useState, useEffect } from 'react'
import { Routes, Route, Outlet, Navigate, useNavigate, useParams, useLocation } from 'react-router-dom'
import './index.css'

import Header from './components/Header'
import Hero from './components/Hero'
import CollegeGrid from './components/CollegeGrid'
import CollegeDetail from './components/CollegeDetail'
import CollegesPage from './components/CollegesPage'
import AboutPage from './components/AboutPage'
import PrivacyPolicy from './components/PrivacyPolicy'
import TermsConditions from './components/TermsConditions'
import Dashboard from './components/Dashboard'
import { WhyBangalore, WhySRM, Expertise, Testimonials } from './components/Sections'
import CounselorSidebar from './components/CounselorSidebar'
import Footer from './components/Footer'
import LeadModal from './components/LeadModal'
import InlineLeadForm from './components/InlineLeadForm'
import { ScrollProgress, WhatsAppFAB, CallFAB, KunalChat } from './components/Floaters'
import LiveTicker from './components/LiveTicker'
import CookieConsent from './components/CookieConsent'
import { COLLEGES, SRM_COLLEGE } from './data'
import { getSettings } from './utils/leads'

const ALL_COLLEGES = [SRM_COLLEGE, ...COLLEGES]

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

function SiteLayout({ onApply, showLead, leadCollege, closeLead, markLeadSubmitted }) {
  const { pathname } = useLocation()
  const hideLead = pathname === '/privacy' || pathname === '/terms'
  return (
    <>
      <ScrollProgress />
      <LiveTicker />
      <Header onApply={onApply} />
      <Outlet />
      <Footer />
      <WhatsAppFAB />
      <CallFAB />
      <KunalChat />
      <CookieConsent />
      {showLead && !hideLead && (
        <LeadModal college={leadCollege} onSubmitted={markLeadSubmitted} onClose={closeLead} />
      )}
    </>
  )
}

function HomePage({ onApply }) {
  const navigate = useNavigate()
  const openCollege = (college) => {
    if (college && college.slug) navigate(`/college/${college.slug}`)
  }
  return (
    <>
      <Hero onApply={onApply} />
      <WhySRM onApply={onApply} />
      <WhyBangalore />

      <div className="bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 lg:flex gap-8 items-start">
          <div className="flex-1 min-w-0">
            <CollegeGrid onApply={onApply} onViewCollege={openCollege} />
          </div>
          <CounselorSidebar onApply={onApply} />
        </div>
      </div>

      <Expertise />
      <Testimonials />
      <InlineLeadForm />
    </>
  )
}

function CollegeDetailRoute({ onApply }) {
  const { slug } = useParams()
  const navigate = useNavigate()
  const college = ALL_COLLEGES.find(c => c.slug === slug)
  if (!college) return <Navigate to="/" replace />
  return <CollegeDetail college={college} onBack={() => navigate('/')} onApply={onApply} />
}

function AboutRoute({ onApply }) {
  const navigate = useNavigate()
  return <AboutPage onApply={onApply} onBack={() => navigate('/')} />
}

function AdminRoute() {
  const navigate = useNavigate()
  return <Dashboard onBack={() => navigate('/')} />
}

export default function App() {
  const [showLead, setShowLead] = useState(false)
  const [leadCollege, setLeadCollege] = useState('')
  const [popupEnabled, setPopupEnabled] = useState(false)
  const [leadSubmitted, setLeadSubmitted] = useState(() => {
    try { return sessionStorage.getItem('kp360_lead_submitted') === '1' } catch { return false }
  })

  useEffect(() => {
    let cancelled = false
    getSettings()
      .then(s => { if (!cancelled) setPopupEnabled(s.formPopupEnabled === true) })
      .catch(() => { if (!cancelled) setPopupEnabled(false) })
    return () => { cancelled = true }
  }, [])

  const openApply = (college) => {
    setLeadCollege(typeof college === 'string' ? college : '')
    setShowLead(true)
  }

  const closeLead = () => {
    setShowLead(false)
    setLeadCollege('')
  }

  const markLeadSubmitted = () => {
    setLeadSubmitted(true)
    try { sessionStorage.setItem('kp360_lead_submitted', '1') } catch {}
  }

  useEffect(() => {
    if (leadSubmitted || !popupEnabled) return
    const open = () => setShowLead(true)
    const initialTimer = setTimeout(open, 2000)
    const intervalTimer = setInterval(open, 45000)
    return () => {
      clearTimeout(initialTimer)
      clearInterval(intervalTimer)
    }
  }, [leadSubmitted, popupEnabled])

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/admin" element={<AdminRoute />} />
        <Route
          element={
            <SiteLayout
              onApply={openApply}
              showLead={showLead}
              leadCollege={leadCollege}
              closeLead={closeLead}
              markLeadSubmitted={markLeadSubmitted}
            />
          }
        >
          <Route path="/" element={<HomePage onApply={openApply} />} />
          <Route path="/colleges" element={<CollegesPage onApply={openApply} />} />
          <Route path="/about" element={<AboutRoute onApply={openApply} />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsConditions />} />
          <Route path="/college/:slug" element={<CollegeDetailRoute onApply={openApply} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </>
  )
}
