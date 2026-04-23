import { useState, useEffect } from 'react'
import './index.css'

import Header from './components/Header'
import Hero from './components/Hero'
import CollegeGrid from './components/CollegeGrid'
import CollegeDetail from './components/CollegeDetail'
import AboutPage from './components/AboutPage'
import PrivacyPolicy from './components/PrivacyPolicy'
import TermsConditions from './components/TermsConditions'
import Dashboard from './components/Dashboard'
import { WhyBangalore, WhySRM, Expertise, Testimonials } from './components/Sections'
import CounselorSidebar from './components/CounselorSidebar'
import Footer from './components/Footer'
import LeadModal from './components/LeadModal'
import { ScrollProgress, WhatsAppFAB } from './components/Floaters'
import CookieConsent from './components/CookieConsent'
import { COLLEGES, SRM_COLLEGE } from './data'

const ALL_COLLEGES = [SRM_COLLEGE, ...COLLEGES]

function parseHash() {
  const raw = window.location.hash.replace(/^#\/?/, '')
  if (!raw) return { page: 'home', slug: null }
  if (['about', 'privacy', 'terms', 'dashboard'].includes(raw)) return { page: raw, slug: null }
  if (raw.startsWith('college/')) {
    return { page: 'home', slug: raw.slice('college/'.length) }
  }
  return { page: 'home', slug: null }
}

export default function App() {
  const [showLead, setShowLead] = useState(false)
  const [leadCollege, setLeadCollege] = useState('')
  const [leadSubmitted, setLeadSubmitted] = useState(() => {
    try { return sessionStorage.getItem('kp360_lead_submitted') === '1' } catch { return false }
  })
  const initial = parseHash()
  const [selectedCollege, setSelectedCollege] = useState(() =>
    initial.slug ? (ALL_COLLEGES.find(c => c.slug === initial.slug) || null) : null
  )
  const [page, setPage] = useState(initial.page)

  const openApply = (college) => {
    setLeadCollege(typeof college === 'string' ? college : '')
    setShowLead(true)
  }

  const openCollege = (college) => {
    setSelectedCollege(college)
    if (college && college.slug) {
      window.location.hash = `/college/${college.slug}`
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  const closeCollege = () => {
    setSelectedCollege(null)
    window.location.hash = ''
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  const goNav = (p) => {
    setSelectedCollege(null)
    setPage(p)
    window.location.hash = p === 'home' ? '' : p
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  // Listen for hash changes (back/forward browser buttons)
  useEffect(() => {
    const onHash = () => {
      const h = parseHash()
      if (h.slug) {
        const c = ALL_COLLEGES.find(x => x.slug === h.slug)
        setSelectedCollege(c || null)
        setPage('home')
      } else {
        setSelectedCollege(null)
        setPage(h.page)
      }
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  // Expose nav function for cookie consent banner
  useEffect(() => {
    window.__navTo = goNav
    return () => { delete window.__navTo }
  }, [])

  // Auto-popup lead modal: 10s after load, then every 30s — stops once submitted
  useEffect(() => {
    if (leadSubmitted) return
    let intervalId
    const trigger = () => {
      setShowLead(prev => {
        if (prev) return prev
        setLeadCollege('')
        return true
      })
    }
    const timeoutId = setTimeout(() => {
      trigger()
      intervalId = setInterval(trigger, 30000)
    }, 10000)
    return () => {
      clearTimeout(timeoutId)
      if (intervalId) clearInterval(intervalId)
    }
  }, [leadSubmitted])

  const markLeadSubmitted = () => {
    setLeadSubmitted(true)
    try { sessionStorage.setItem('kp360_lead_submitted', '1') } catch {}
  }

  // Dashboard — full screen, no header/footer
  if (page === 'dashboard') {
    return <Dashboard onBack={() => goNav('home')} />
  }

  if (selectedCollege) {
    return (
      <>
        <ScrollProgress />
        <Header onApply={openApply} onNav={goNav} />
        <CollegeDetail
          college={selectedCollege}
          onBack={closeCollege}
          onApply={openApply}
        />
        <Footer onNav={goNav} />
        <WhatsAppFAB />
        <CookieConsent />
        {showLead && <LeadModal college={leadCollege} onSubmitted={markLeadSubmitted} onClose={() => { setShowLead(false); setLeadCollege('') }} />}
      </>
    )
  }

  if (page === 'about') {
    return (
      <>
        <ScrollProgress />
        <Header onApply={openApply} onNav={goNav} />
        <AboutPage onApply={openApply} onBack={() => goNav('home')} />
        <Footer onNav={goNav} />
        <WhatsAppFAB />
        <CookieConsent />
        {showLead && <LeadModal college={leadCollege} onSubmitted={markLeadSubmitted} onClose={() => { setShowLead(false); setLeadCollege('') }} />}
      </>
    )
  }

  if (page === 'privacy') {
    return (
      <>
        <ScrollProgress />
        <Header onApply={openApply} onNav={goNav} />
        <PrivacyPolicy />
        <Footer onNav={goNav} />
        <WhatsAppFAB />
        <CookieConsent />
      </>
    )
  }

  if (page === 'terms') {
    return (
      <>
        <ScrollProgress />
        <Header onApply={openApply} onNav={goNav} />
        <TermsConditions />
        <Footer onNav={goNav} />
        <WhatsAppFAB />
        <CookieConsent />
      </>
    )
  }

  return (
    <>
      <ScrollProgress />
      <Header onApply={openApply} onNav={goNav} />
      <Hero onApply={openApply} />
      <WhySRM onApply={openApply} />
      <WhyBangalore />

      <div className="bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 lg:flex gap-8 items-start">
          <div className="flex-1 min-w-0">
            <CollegeGrid onApply={openApply} onViewCollege={openCollege} />
          </div>
          <CounselorSidebar onApply={openApply} />
        </div>
      </div>

      <Expertise />
      <Testimonials />
      <Footer onNav={goNav} />

      <WhatsAppFAB />
      <CookieConsent />
      {showLead && <LeadModal college={leadCollege} onSubmitted={markLeadSubmitted} onClose={() => { setShowLead(false); setLeadCollege('') }} />}
    </>
  )
}
