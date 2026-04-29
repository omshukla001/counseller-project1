import { motion } from 'framer-motion'
import { Award, Users, Star, CheckCircle, Phone, ArrowRight, GraduationCap, Heart } from 'lucide-react'

const VALUES = [
  { icon: Heart, title: 'Student-First Approach', desc: 'Every decision is made keeping the student\'s best interest at heart.' },
  { icon: Award, title: 'Transparent Guidance', desc: 'No hidden fees, no false promises — just honest, expert advice.' },
  { icon: Users, title: 'Personalised Counselling', desc: 'One-on-one sessions tailored to your rank, branch preference and budget.' },
  { icon: GraduationCap, title: 'End-to-End Support', desc: 'From entrance exam to final admission — we are with you every step.' },
]

export default function AboutPage({ onApply, onBack }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-white pt-16">

      {/* Hero banner */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-blue-950 py-20 px-4 text-center relative overflow-hidden">
        <motion.div className="absolute top-10 right-10 w-64 h-64 bg-blue-700/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 6, repeat: Infinity }} />
        <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="inline-block bg-blue-700/20 text-blue-400 text-xs font-bold px-4 py-1.5 rounded-full border border-blue-700/30 mb-4">
          About Us
        </motion.span>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl font-black text-white mb-4">
          Helping Students Find Their<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-400">Dream College</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="text-white/70 max-w-xl mx-auto text-base">
          Knowledge Park 360 is Bangalore's most trusted engineering admission consultancy, founded with one mission — making quality engineering education accessible to every deserving student.
        </motion.p>
      </div>

      {/* Meet Kunal — Main Counsellor */}
      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <span className="inline-block bg-blue-50 text-blue-800 text-sm font-bold px-4 py-1.5 rounded-full border border-blue-200 mb-3">
            Meet Our Expert
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900">The Face Behind Your Admission</h2>
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="bg-gradient-to-br from-[#F8FAFC] to-white rounded-3xl overflow-hidden shadow-xl border border-gray-100">
          <div className="grid md:grid-cols-2 gap-0">

            {/* Photo side */}
            <div className="relative bg-gradient-to-br from-blue-950 to-gray-900 flex items-center justify-center p-10 min-h-72">
              <motion.div whileHover={{ scale: 1.03 }} className="relative">
                <div className="w-52 h-52 md:w-64 md:h-64 rounded-3xl overflow-hidden border-4 border-blue-500/40 shadow-2xl">
                  <img src="/kunal.jpg" alt="Kunal — Senior Admission Counsellor"
                    className="w-full h-full object-cover object-top" />
                </div>
                {/* Badge */}
                <div className="absolute -bottom-4 -right-4 bg-blue-700 text-white text-xs font-bold px-3 py-2 rounded-xl shadow-lg flex items-center gap-1.5">
                  <Star size={12} className="fill-white" /> Top Counsellor
                </div>
              </motion.div>
            </div>

            {/* Info side */}
            <div className="p-8 md:p-10 flex flex-col justify-center">
              <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-1">Kunal Issar</h3>
              <p className="text-blue-800 font-bold text-base mb-1">Senior Admission Counsellor & Founder</p>
              <p className="text-gray-500 text-sm mb-5">Knowledge Park 360 · Bangalore, Karnataka</p>

              <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-6">
                With over <strong>6 years of experience</strong> in engineering admissions, Kunal Issar has guided students into top colleges like RVCE, BMSCE, PES University, SRM, and Jain University. His deep knowledge of KCET, COMEDK, SRMJEE, and Management Quota processes has made him the go-to counsellor for families across Karnataka and beyond.
              </p>

              <div className="space-y-2 mb-6">
                {[
                  'Expert in KCET, COMEDK, SRMJEE & Management Quota',
                  'Hands-on with every counselling round, start to finish',
                  'Strong network with Jain, SRM, RV, PES & top colleges',
                  'Free, transparent & student-first counselling',
                ].map((pt, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm md:text-base text-gray-700">
                    <CheckCircle size={14} className="text-blue-700 shrink-0 mt-0.5" /> {pt}
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <button onClick={onApply}
                  className="bg-[#1E3A8A] hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-full text-sm transition-all hover:scale-105 flex items-center gap-2">
                  <Phone size={14} /> Talk to Kunal Issar
                </button>
                <a href="tel:+917296087953"
                  className="border-2 border-blue-700 text-blue-800 font-bold px-6 py-3 rounded-full text-sm hover:bg-blue-50 transition-colors">
                  +91-72960-87953
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Our Values */}
      <div className="bg-[#F8FAFC] py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block bg-blue-50 text-blue-800 text-sm font-bold px-4 py-1.5 rounded-full border border-blue-200 mb-3">
              Our Values
            </span>
            <h2 className="text-3xl font-black text-gray-900">What We Stand For</h2>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
            {VALUES.map((v, i) => (
              <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <v.icon size={22} className="text-blue-800" />
                </div>
                <h4 className="font-bold text-gray-900 text-sm md:text-base mb-1">{v.title}</h4>
                <p className="text-gray-600 text-xs md:text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-16 px-4 text-center bg-white">
        <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-3">Ready to Secure Your Seat?</h2>
        <p className="text-gray-600 mb-6 text-base">Book a free 30-minute session with Kunal Issar today.</p>
        <button onClick={onApply}
          className="bg-[#1E3A8A] hover:bg-blue-700 text-white font-bold px-10 py-4 rounded-full text-base transition-all hover:scale-105 hover:shadow-xl hover:shadow-blue-700/30 inline-flex items-center gap-2">
          Get Free Consultation <ArrowRight size={16} />
        </button>
      </div>
    </motion.div>
  )
}
