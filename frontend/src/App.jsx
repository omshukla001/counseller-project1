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

function getPageFromHash() {
  const hash = window.location.hash.replace('#/', '').replace('#', '')
  if (['about', 'privacy', 'terms', 'dashboard'].includes(hash)) return hash
  return 'home'
}

export default function App() {
  const [showLead, setShowLead] = useState(false)
  const [leadCollege, setLeadCollege] = useState('')
  const [selectedCollege, setSelectedCollege] = useState(null)
  const [page, setPage] = useState(getPageFromHash)

  const openApply = (college) => {
    setLeadCollege(typeof college === 'string' ? college : '')
    setShowLead(true)
  }

  const openCollege = (college) => {
    setSelectedCollege(college)
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
      setSelectedCollege(null)
      setPage(getPageFromHash())
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  // Expose nav function for cookie consent banner
  useEffect(() => {
    window.__navTo = goNav
    return () => { delete window.__navTo }
  }, [])

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
          onBack={() => { setSelectedCollege(null); window.scrollTo({ top: 0, behavior: 'instant' }) }}
          onApply={openApply}
        />
        <Footer onNav={goNav} />
        <WhatsAppFAB />
        <CookieConsent />
        {showLead && <LeadModal college={leadCollege} onClose={() => { setShowLead(false); setLeadCollege('') }} />}
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
        {showLead && <LeadModal college={leadCollege} onClose={() => { setShowLead(false); setLeadCollege('') }} />}
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
      {showLead && <LeadModal college={leadCollege} onClose={() => { setShowLead(false); setLeadCollege('') }} />}
    </>
  )
}
