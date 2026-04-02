import { useState } from 'react'
import './index.css'

import Header from './components/Header'
import Hero from './components/Hero'
import CollegeGrid from './components/CollegeGrid'
import CollegeDetail from './components/CollegeDetail'
import AboutPage from './components/AboutPage'
import { WhyBangalore, WhySRM, Expertise, Testimonials } from './components/Sections'
import CounselorSidebar from './components/CounselorSidebar'
import Footer from './components/Footer'
import LeadModal from './components/LeadModal'
import { ScrollProgress, WhatsAppFAB } from './components/Floaters'

export default function App() {
  const [showLead, setShowLead] = useState(false)
  const [selectedCollege, setSelectedCollege] = useState(null)
  const [page, setPage] = useState('home')

  const openApply = () => setShowLead(true)

  const openCollege = (college) => {
    setSelectedCollege(college)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  const goNav = (p) => {
    setSelectedCollege(null)
    setPage(p)
    window.scrollTo({ top: 0, behavior: 'instant' })
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
        <Footer />
        <WhatsAppFAB />
        {showLead && <LeadModal onClose={() => setShowLead(false)} />}
      </>
    )
  }

  if (page === 'about') {
    return (
      <>
        <ScrollProgress />
        <Header onApply={openApply} onNav={goNav} />
        <AboutPage onApply={openApply} onBack={() => goNav('home')} />
        <Footer />
        <WhatsAppFAB />
        {showLead && <LeadModal onClose={() => setShowLead(false)} />}
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
      <Footer />

      <WhatsAppFAB />
      {showLead && <LeadModal onClose={() => setShowLead(false)} />}
    </>
  )
}
