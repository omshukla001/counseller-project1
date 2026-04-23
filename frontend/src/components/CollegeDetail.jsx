import { motion } from 'framer-motion'
import { ArrowLeft, TrendingUp, Building2, Award, Shield, CheckCircle, Phone, MapPin, Users, BookOpen, Star, Quote } from 'lucide-react'

export default function CollegeDetail({ college, onBack, onApply }) {
  const stats = [
    { value: college.highestPkg, label: 'HIGHEST PACKAGE', icon: TrendingUp, bg: 'bg-blue-50', color: 'text-blue-600' },
    { value: college.type, label: 'COLLEGE TYPE', icon: Building2, bg: 'bg-orange-50', color: 'text-orange-500' },
    { value: college.accreditation, label: 'ACCREDITATION', icon: Award, bg: 'bg-green-50', color: 'text-green-600' },
    { value: college.approval, label: 'APPROVAL', icon: Shield, bg: 'bg-purple-50', color: 'text-purple-600' },
  ]

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-white pt-16">

      {/* Hero Banner */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img src={college.bannerImg} alt={college.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/55" />
        <button onClick={onBack}
          className="absolute top-6 left-6 flex items-center gap-2 bg-white/20 backdrop-blur text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-white/30 transition-colors border border-white/30 z-10">
          <ArrowLeft size={16} /> Back to Colleges
        </button>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-3xl md:text-5xl font-black text-white text-center drop-shadow-lg px-6">
            {college.fullName}
          </h1>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-5xl mx-auto px-4 -mt-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {stats.map((s) => (
            <motion.div key={s.label}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-lg p-3 md:p-4 flex items-center gap-3 border border-gray-100">
              <div className={`${s.bg} rounded-xl p-2 md:p-2.5 shrink-0`}>
                <s.icon size={18} className={s.color} />
              </div>
              <div>
                <p className="font-black text-gray-900 text-sm md:text-base leading-tight">{s.value}</p>
                <p className="text-gray-500 text-[10px] md:text-xs font-semibold uppercase tracking-wider mt-0.5">{s.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-8">

        {/* Left — full width on mobile */}
        <div className="md:col-span-2 space-y-10">

          {/* About */}
          <section>
            <h2 className="text-2xl font-black text-[#102C57] mb-1">{college.fullName}</h2>
            <div className="w-16 h-1 bg-[#1E3A8A] rounded mb-4" />
            {college.about.split('\n\n').map((p, i) => (
              <p key={i} className="text-gray-700 leading-relaxed mb-3 text-sm md:text-base">{p}</p>
            ))}
          </section>

          {/* Placements */}
          <section>
            <h3 className="text-xl font-black text-[#102C57] mb-4 flex items-center gap-2">
              <TrendingUp size={20} className="text-[#1E3A8A]" />
              Placement at {college.fullName}
            </h3>
            <div className="grid grid-cols-3 gap-3 mb-5">
              {[['Placement Rate', college.placements.rate], ['Avg Package', college.placements.avg], ['Highest Package', college.placements.highest]].map(([l, v]) => (
                <div key={l} className="bg-[#F8FAFC] rounded-xl p-3 text-center border border-gray-100">
                  <p className="font-black text-[#102C57] text-lg">{v}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{l}</p>
                </div>
              ))}
            </div>
            <ul className="space-y-2 mb-5">
              {college.placements.points.map((pt, i) => (
                <li key={i} className="flex gap-2 text-sm md:text-base text-gray-700">
                  <CheckCircle size={15} className="text-[#1E3A8A] shrink-0 mt-0.5" />{pt}
                </li>
              ))}
            </ul>
            <p className="text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wider">Top Recruiters</p>
            <div className="flex flex-wrap gap-2">
              {college.placements.companies.map(c => (
                <span key={c} className="bg-[#102C57]/5 text-[#102C57] text-sm font-semibold px-3 py-1.5 rounded-full border border-[#102C57]/10">{c}</span>
              ))}
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 mt-5">
              <p className="text-yellow-800 text-xs md:text-sm leading-relaxed">
                <strong>Note:</strong> Placement figures and package data represent historical information from the respective institution based on publicly available sources. Individual outcomes depend on academic performance, skills, and market conditions. Past results do not guarantee future outcomes.
              </p>
            </div>
          </section>

          {/* Courses */}
          <section>
            <h3 className="text-xl font-black text-[#102C57] mb-4 flex items-center gap-2">
              <BookOpen size={20} className="text-[#1E3A8A]" />
              Courses Offered at {college.short}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {college.courses.map((c, i) => (
                <div key={i} className="flex items-center gap-2 bg-[#F8FAFC] rounded-lg px-3 py-2.5 text-sm md:text-base text-gray-800 border border-gray-100">
                  <div className="w-1.5 h-1.5 bg-[#1E3A8A] rounded-full shrink-0" />{c}
                </div>
              ))}
            </div>
          </section>

          {/* Admission */}
          <section>
            <h3 className="text-xl font-black text-[#102C57] mb-2 flex items-center gap-2">
              <Shield size={20} className="text-[#1E3A8A]" />
              Admission Process
            </h3>
            <p className="text-base font-semibold text-gray-800 mb-3">Eligibility Criteria</p>
            <ul className="space-y-2 mb-6">
              {college.eligibility.map((e, i) => (
                <li key={i} className="flex gap-2 text-sm md:text-base text-gray-700">
                  <CheckCircle size={15} className="text-[#1E3A8A] shrink-0 mt-0.5" />{e}
                </li>
              ))}
            </ul>
            <p className="text-base font-semibold text-gray-800 mb-3">Admission Guidance</p>
            <ul className="space-y-2">
              {['Expert Guidance on eligibility, documentation, and admission process.', 'Personalized Counseling based on academic background and career goals.', 'Document Preparation: certificates, identity proofs, and paperwork.', 'Application Strategy: personal statement and timeline planning.'].map((pt, i) => (
                <li key={i} className="flex gap-2 text-sm md:text-base text-gray-700">
                  <CheckCircle size={15} className="text-[#1E3A8A] shrink-0 mt-0.5" />{pt}
                </li>
              ))}
            </ul>
          </section>

          {/* Reviews */}
          {college.reviews && college.reviews.length > 0 && (
            <section>
              <h3 className="text-xl font-black text-[#102C57] mb-1 flex items-center gap-2">
                <Star size={20} className="text-[#1E3A8A]" />
                Student Reviews — {college.short}
              </h3>
              <div className="w-16 h-1 bg-[#1E3A8A] rounded mb-4" />
              <p className="text-gray-600 text-sm md:text-base mb-5">What current & past students say about {college.fullName}.</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {college.reviews.map((r, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                    className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm relative">
                    <Quote size={28} className="text-blue-100 absolute top-3 right-3" />
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(r.stars)].map((_, s) => (
                        <Star key={s} size={14} className="fill-yellow-400 text-yellow-400" />
                      ))}
                      {[...Array(5 - r.stars)].map((_, s) => (
                        <Star key={`e${s}`} size={14} className="text-gray-200" />
                      ))}
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed mb-4">"{r.text}"</p>
                    <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1e3a8a] to-indigo-600 flex items-center justify-center text-white font-black text-sm shrink-0">
                        {r.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-sm leading-tight">{r.name}</p>
                        <p className="text-[#1E3A8A] text-xs font-medium">{r.batch}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 mt-5">
                <p className="text-blue-800 text-xs md:text-sm leading-relaxed">
                  <strong>Note:</strong> Reviews are collected from students counselled by Knowledge Park 360. Experiences are individual and may vary. Names may be abbreviated for privacy.
                </p>
              </div>
            </section>
          )}
        </div>

        {/* Right Sticky — desktop only */}
        <div className="hidden md:block">
          <div className="sticky top-20 space-y-4">
            <div className="bg-[#102C57] rounded-2xl p-5 text-white">
              <h4 className="font-black text-lg mb-1">Need Admission Guidance?</h4>
              <p className="text-white/70 text-sm mb-4">Our expert will call you within 30 minutes</p>
              <button onClick={onApply}
                className="w-full bg-[#1E3A8A] hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 mb-2">
                <Phone size={16} /> Get Free Guidance
              </button>
              <a href="tel:+917296087953"
                className="w-full border border-white/20 text-white/80 hover:border-[#1E3A8A] hover:text-[#1E3A8A] font-semibold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm">
                Call: +91-72960-87953
              </a>
            </div>

            <div className="bg-[#F8FAFC] rounded-2xl p-4 border border-gray-100 space-y-2.5">
              <p className="font-bold text-[#102C57] text-sm mb-1">Quick Info</p>
              {[
                [MapPin, college.location],
                [Users, `${college.seats} total seats`],
                [Award, college.accreditation],
              ].map(([Icon, text], i) => (
                <div key={i} className="flex gap-2 text-sm text-gray-700">
                  <Icon size={13} className="text-[#1E3A8A] shrink-0 mt-0.5" />{text}
                </div>
              ))}
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
              <p className="text-amber-800 text-sm leading-relaxed">
                <strong>Disclaimer:</strong> Knowledge Park 360 is an independent educational consultancy. Not the official admission office of any college. Institution names used for informational purposes only.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile bottom CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 p-3 flex gap-3 shadow-2xl">
        <a href="tel:+917296087953"
          className="flex-1 border-2 border-blue-700 text-blue-800 font-bold py-3 rounded-xl text-sm text-center">
          📞 Call Expert
        </a>
        <button onClick={onApply}
          className="flex-1 bg-[#1E3A8A] text-white font-bold py-3 rounded-xl text-sm">
          Get Free Guidance
        </button>
      </div>
    </motion.div>
  )
}
