import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Phone, ArrowLeft, MessageCircle, Sparkles, Clock, Award, Zap, ChevronRight } from 'lucide-react'
import { saveLead } from '../utils/leads'
import { COLLEGES, SRM_COLLEGE } from '../data'

// Scroll progress bar
export function ScrollProgress() {
  const [pct, setPct] = useState(0)
  useEffect(() => {
    const fn = () => {
      const el = document.documentElement
      setPct((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100)
    }
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return (
    <div className="fixed top-0 left-0 w-full h-1 z-[100] bg-transparent">
      <div className="h-full bg-[#1E3A8A] transition-all duration-100" style={{ width: `${pct}%` }} />
    </div>
  )
}

// Real WhatsApp SVG icon
function WhatsAppIcon({ size = 28 }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} fill="white">
      <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.5 1.132 6.745 3.054 9.378L1.056 31.22l6.088-1.96a15.9 15.9 0 008.86 2.684C24.828 31.944 32 24.77 32 16.004 32 7.176 24.828 0 16.004 0zm9.35 22.614c-.396 1.116-1.97 2.042-3.234 2.312-.864.182-1.992.328-5.794-1.246-4.862-2.012-7.988-6.94-8.23-7.262-.232-.32-1.952-2.6-1.952-4.96s1.234-3.518 1.672-3.998c.438-.48.956-.6 1.276-.6.32 0 .636.002.914.016.294.014.688-.112 1.076.822.396.954 1.35 3.278 1.468 3.516.118.238.198.516.04.832-.158.316-.238.514-.476.792-.238.278-.5.62-.714.832-.238.238-.486.496-.208.972.278.476 1.234 2.034 2.65 3.296 1.82 1.622 3.354 2.124 3.83 2.362.476.238.754.198 1.032-.118.278-.318 1.192-1.39 1.51-1.868.316-.478.634-.396 1.07-.238.438.16 2.762 1.302 3.236 1.54.476.238.792.356.91.554.118.198.118 1.148-.278 2.264v-.006z" />
    </svg>
  )
}

// ─── Kunal chatbot — categorised topics + keyword brain + lead form ───

// KCET rank → college tier mapping (slugs from data.js)
const KCET_TIERS = [
  { range: [0, 500], slugs: ['rvce'] },
  { range: [501, 1200], slugs: ['rvce', 'bmsce', 'msrit'] },
  { range: [1201, 3000], slugs: ['bmsce', 'msrit', 'pesu', 'dsce'] },
  { range: [3001, 7000], slugs: ['dsce', 'bmsit', 'bit', 'nmit'] },
  { range: [7001, 20000], slugs: ['bmsit', 'bit', 'nmit', 'rnsit', 'smvit'] },
  { range: [20001, 99999], slugs: ['rnsit', 'smvit', 'jain'] },
]
const COMEDK_TIERS = [
  { range: [0, 1000], slugs: ['rvce', 'bmsce', 'msrit'] },
  { range: [1001, 3500], slugs: ['msrit', 'pesu', 'dsce'] },
  { range: [3501, 10000], slugs: ['dsce', 'bmsit', 'bit', 'nmit'] },
  { range: [10001, 30000], slugs: ['bit', 'nmit', 'rnsit', 'smvit'] },
  { range: [30001, 99999], slugs: ['rnsit', 'smvit', 'jain'] },
]

const BRANCHES = ['Computer Science', 'AI & ML', 'Data Science', 'ECE', 'Mechanical', 'Civil', 'Other']

const ALL_COLLEGES = [SRM_COLLEGE, ...COLLEGES]

function findCollegeMatches({ exam, rank, branch }) {
  if (exam === 'srmjee') return [SRM_COLLEGE]
  if (exam === 'unsure') return [SRM_COLLEGE, COLLEGES[0], COLLEGES[1]]
  const r = parseInt(String(rank).replace(/[^\d]/g, ''), 10)
  if (!r || r < 1) return ALL_COLLEGES.slice(0, 3)
  const tiers = exam === 'comedk' ? COMEDK_TIERS : KCET_TIERS
  const tier = tiers.find(t => r >= t.range[0] && r <= t.range[1])
  if (!tier) return ALL_COLLEGES.slice(0, 3)
  return tier.slugs.map(slug => ALL_COLLEGES.find(c => c.slug === slug)).filter(Boolean)
}

function matchStrength(exam, rank, college) {
  const r = parseInt(String(rank).replace(/[^\d]/g, ''), 10)
  if (exam === 'srmjee' || !r) return { label: '🎯 Top match', cls: 'bg-emerald-100 text-emerald-700 border-emerald-200' }
  const m = String(college.cutoff || '').match(/(\d[\d,]*)/)
  if (!m) return { label: '✅ Good fit', cls: 'bg-blue-100 text-blue-700 border-blue-200' }
  const cutoff = parseInt(m[1].replace(/,/g, ''), 10)
  if (r <= cutoff * 0.6) return { label: '🎯 Strong fit', cls: 'bg-emerald-100 text-emerald-700 border-emerald-200' }
  if (r <= cutoff) return { label: '✅ Good fit', cls: 'bg-blue-100 text-blue-700 border-blue-200' }
  return { label: '⚡ Stretch', cls: 'bg-orange-100 text-orange-700 border-orange-200' }
}

// Countdown to next deadline (rolling — next Friday at 11:59 PM)
function nextFridayDeadline() {
  const now = new Date()
  const d = new Date(now)
  const daysUntilFri = (5 - now.getDay() + 7) % 7 || 7
  d.setDate(now.getDate() + daysUntilFri)
  d.setHours(23, 59, 59, 0)
  return d
}

function formatCountdown(target) {
  const ms = target.getTime() - Date.now()
  if (ms <= 0) return null
  const d = Math.floor(ms / 86400000)
  const h = Math.floor((ms % 86400000) / 3600000)
  const m = Math.floor((ms % 3600000) / 60000)
  return `${d}d ${h}h ${m}m`
}

const TOPICS = [
  {
    id: 'colleges',
    icon: '🏛️',
    label: 'Colleges & Cutoffs',
    questions: [
      {
        q: 'Which colleges can I get with my KCET rank?',
        a: "Quick KCET guide: under 500 → RVCE • under 1000 → BMSCE / MSRIT • under 3000 → PES University / DSCE • under 7000 → BMSIT, BIT, NMIT, RNSIT, Sir MVIT. Share your exact rank for a personalised list.",
      },
      {
        q: 'Top 5 engineering colleges in Bangalore',
        a: '1️⃣ RVCE  2️⃣ BMSCE  3️⃣ MSRIT  4️⃣ PES University  5️⃣ Dayananda Sagar (DSCE). All NAAC A/A+ accredited with strong placements (avg 7–12 LPA, highest 67 LPA at RVCE).',
      },
      {
        q: 'Tell me about RVCE',
        a: 'RVCE — #1 ranked in Karnataka, est. 1963, 52-acre campus on Mysore Road. KCET cutoff < 500. Highest placement 67 LPA, 98% placement rate. Top recruiters: Google, Microsoft, Amazon.',
      },
      {
        q: 'Tell me about SRM Chennai',
        a: 'SRM Institute of Science & Technology, Kattankulathur. Top 10 NIRF ranked, 50,000+ students. Highest package 92 LPA. Accepts SRMJEE Phase 1 & 2 + management quota for CSE / AI&ML / Data Science.',
      },
    ],
  },
  {
    id: 'process',
    icon: '📝',
    label: 'Admission Process',
    questions: [
      {
        q: 'How does KCET counselling work?',
        a: 'KCET counselling has 3 rounds: Round 1 (early seat allotment), Round 2 (option entry), Mock & Final. You log in to the KEA portal, fill college-branch options in priority order, and get an allotment based on your rank + reservation category. We guide you on smart option entry strategies.',
      },
      {
        q: 'COMEDK vs KCET — which is better?',
        a: 'KCET is for Karnataka state quota (cheaper fees, ~₹70k–₹1.2L/yr). COMEDK is for private colleges via Karnataka private engineering association (₹2–4L/yr). Most students apply to both for maximum options. SRMJEE is separate — for SRM Chennai admissions.',
      },
      {
        q: 'SRMJEE Phase 1 vs Phase 2',
        a: 'Phase 1 (Jan–Apr) = early advantage, more seat options, higher chance for top branches like CSE. Phase 2 (May–Jun) = backup if Phase 1 score wasn\'t great. We recommend appearing in Phase 1 first.',
      },
      {
        q: 'Documents needed for admission',
        a: '10th & 12th marksheets, JEE/KCET/COMEDK/SRMJEE scorecard, transfer certificate, migration certificate, caste/income certificate (if applicable), Aadhaar, passport-size photos, allotment letter. We provide a full checklist via WhatsApp.',
      },
    ],
  },
  {
    id: 'fees',
    icon: '💰',
    label: 'Fees & Quota',
    questions: [
      {
        q: 'How does management quota work?',
        a: "Management quota is a direct seat reserved by private colleges for students who don't qualify through merit cutoffs. Fees are higher (₹2–8L/yr depending on college). We have tie-ups across 12+ Bangalore colleges & SRM Chennai. Call us for exact college quotes.",
      },
      {
        q: 'Average fees in top colleges',
        a: 'Government quota (KCET): ₹70k–₹1.2L/yr. COMEDK private: ₹2–4L/yr. Management quota: ₹3–8L/yr depending on college & branch. Hostel + mess: extra ₹1.5–2.5L/yr. We share exact fee structures during counselling.',
      },
      {
        q: 'Are scholarships available?',
        a: 'Yes — KCET government scholarships (SC/ST/OBC), private college merit scholarships (RVCE, PESU offer up to 50% off for top KCET ranks), and central schemes like AICTE Pragati / Saksham. We help you apply.',
      },
      {
        q: 'NRI / Direct admission options',
        a: 'NRI quota requires foreign citizenship or passport with NRE/NRO documentation. Most colleges reserve 5–15% seats for NRI at higher fees ($4k–$10k/yr). Direct admission (without entrance) is via management quota — call us for college-wise availability.',
      },
    ],
  },
  {
    id: 'us',
    icon: '👥',
    label: 'About Knowledge Park 360',
    questions: [
      {
        q: 'Is your guidance really free?',
        a: "Yes — counselling is 100% free for students. We earn from college tie-ups, not from you. No hidden charges. You only pay the college's official admission fee directly to them.",
      },
      {
        q: 'How many colleges do you cover?',
        a: '12+ engineering colleges across Bangalore (RVCE, BMSCE, MSRIT, PES, DSCE, BMSIT, BIT, NMIT, RNSIT, Sir MVIT, Jain) plus SRM Chennai (Kattankulathur). 6+ years of admission expertise.',
      },
      {
        q: 'Where are your offices?',
        a: '📍 Bangalore: Samruddhi, Doddaballapura Road, near Rail Wheel Factory. 📍 Patna: Bailey Road, Kusumpuram. Visit anytime or book a video consultation.',
      },
      {
        q: 'Talk to a real counsellor',
        a: '📞 Call +91 72960 87953 or tap WhatsApp below. Our counsellors reply within 5 minutes during 9 AM – 9 PM IST.',
      },
    ],
  },
]

// Free-text keyword brain — returns response or null for fallback
function brainReply(text) {
  const t = text.toLowerCase().trim()
  if (!t) return null
  if (/^(hi|hello|hey|namaste|hola)\b/.test(t)) return "Hi there! 👋 I'm Kunal. Pick a topic below or ask me anything about engineering admissions."
  if (/(thank|thx|thanks)/.test(t)) return "You're welcome! Anything else I can help with?"
  if (/(bye|goodbye|later)/.test(t)) return 'Bye! Reach out anytime — we\'re here 9 AM – 9 PM IST.'
  if (/(kcet)/.test(t)) return 'KCET (Karnataka Common Entrance Test) is conducted by KEA for engineering admissions in Karnataka government & private colleges. Cutoffs vary — share your rank for a personalised college list.'
  if (/(comedk)/.test(t)) return 'COMEDK UGET is for admission to private engineering colleges in Karnataka (separate from KCET). Conducted online in May. Score valid only for COMEDK-affiliated colleges.'
  if (/(srmjee|srm jee)/.test(t)) return 'SRMJEE has Phase 1 (Jan–Apr) and Phase 2 (May–Jun). Apply Phase 1 first for best branch options at SRM Chennai. We can help you prep & apply.'
  if (/\b(srm)\b/.test(t)) return 'SRM Chennai (Kattankulathur) — Top 10 NIRF, highest package 92 LPA, popular for CSE / AI&ML / Data Science. Accepts SRMJEE + management quota.'
  if (/(rvce|rv college)/.test(t)) return 'RVCE — #1 in Karnataka. KCET cutoff under 500, highest package 67 LPA, est. 1963, NAAC A+. Strong CSE / ECE / ISE programs.'
  if (/(bmsce|bms college)/.test(t)) return 'BMSCE — established 1946 (oldest private engineering college in India), Basavanagudi, KCET cutoff under 800, highest package 52 LPA.'
  if (/(bmsit)/.test(t)) return 'BMSIT — Yelahanka, sister college of BMSCE. KCET cutoff under 8,000. Solid placements & infrastructure.'
  if (/(pes|pesu|pesit)/.test(t)) return 'PES University — RR Campus, Bangalore. PESSAT entrance. Tier 1 infrastructure, popular for CSE & AI&ML, average 8–12 LPA placements.'
  if (/(msrit|ramaiah)/.test(t)) return 'MSRIT — Ramaiah Road, est. 1962, NAAC A. Strong industry ties, average 6–9 LPA, highest 45 LPA. KCET cutoff under 1,200.'
  if (/(jain)/.test(t)) return 'Jain University — deemed-to-be university. JET entrance. Strong for BBA / Liberal Arts / Engineering. We handle full JET counselling.'
  if (/(dsce|dayananda)/.test(t)) return 'Dayananda Sagar (DSCE) — Banashankari. NAAC A. KCET cutoff under 3,500. Good CSE & ISE placements.'
  if (/(nmit|nitte)/.test(t)) return 'NMIT (Nitte Meenakshi) — Yelahanka, est. 2001. NAAC A+. Constituent of Nitte University. Modern campus & active placements.'
  if (/(rnsit|rns)/.test(t)) return 'RNSIT — RR Nagar. Est. 2001 by Dr. R.N. Shetty. Autonomous, NAAC A+. Strong CSE & EC departments.'
  if (/(mvit|visvesvaraya)/.test(t)) return 'Sir MVIT — Yelahanka, on NH-7. 53.8-acre campus. 13 BE programs incl. AI&ML, Data Science, Robotics.'
  if (/(bit)\b/.test(t)) return 'BIT (Bangalore Institute of Technology) — V V Puram, Basavanagudi. Est. 1979. Autonomous, VTU affiliated. Popular for core branches.'
  if (/(fee|cost|price|expensive|cheap|charge)/.test(t)) return 'Fees vary widely: KCET government quota ₹70k–₹1.2L/yr • COMEDK ₹2–4L/yr • Management quota ₹3–8L/yr. Plus hostel ~₹1.5–2.5L. Counselling is free!'
  if (/(rank|score|cutoff)/.test(t)) return 'Share your rank + exam (KCET/COMEDK/SRMJEE) and I\'ll suggest realistic college options. You can also tap "Get my college list" below.'
  if (/(management|quota|direct)/.test(t)) return "Management quota = direct admission without merit cutoff. Higher fees but guaranteed seat. We have tie-ups in 12+ Bangalore colleges + SRM. Call for exact quotes."
  if (/(scholarship|aid|financial)/.test(t)) return 'Scholarships: KCET government (SC/ST/OBC), college merit scholarships at RVCE/PESU (up to 50% off for top ranks), AICTE Pragati/Saksham. We help you apply.'
  if (/(nri|foreign|abroad)/.test(t)) return 'NRI quota needs foreign citizenship or NRE/NRO docs. 5–15% seats reserved at private colleges, fees ~$4k–$10k/yr. We process the paperwork.'
  if (/(call|whatsapp|phone|number|contact)/.test(t)) return '📞 +91 72960 87953 (also +91 91087 83191, +91 82170 33492). WhatsApp button below 👇'
  if (/(office|location|address|where)/.test(t)) return '📍 Main: Samruddhi, Doddaballapura Road, Bangalore 560064. 📍 Patna: Bailey Road, Kusumpuram. Visit anytime or video call.'
  if (/(branch|cse|ece|ai|ml|mechanical|civil|data)/.test(t)) return 'Popular branches: CSE, ISE, ECE, AI&ML, Data Science, Cyber Security. Demand-wise: CSE > AI&ML > Data Science > ECE > Mechanical. Need branch-specific cutoffs?'
  if (/(2024|2025|2026|placement|package|salary|lpa)/.test(t)) return 'Top packages 2024–25: RVCE 67 LPA • BMSCE 52 LPA • MSRIT 45 LPA • PESU 40 LPA • SRM Chennai 92 LPA. Average 6–12 LPA across branches.'
  return null
}

const MSGS_KEY = 'kp360_chat_messages'
const TEASER_KEY = 'kp360_chat_teaser_shown'

const INITIAL_MESSAGES = [
  { from: 'bot', text: "Hi! I'm Kunal — your career guide at Knowledge Park 360. 👋" },
  { from: 'bot', text: 'Pick a topic below or type your question. I can also send you a personalised college list.' },
]

export function KunalChat() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem(MSGS_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length > 0) return parsed
      }
    } catch {}
    return INITIAL_MESSAGES
  })
  // view: 'topics' | 'questions' | 'lead-form' | 'idle' | 'finder-exam' | 'finder-rank' | 'finder-branch' | 'finder-results'
  const [view, setView] = useState('topics')
  const [currentTopicId, setCurrentTopicId] = useState(null)
  const [typing, setTyping] = useState(false)
  const [input, setInput] = useState('')
  const [hasOpened, setHasOpened] = useState(false)
  const [showTeaser, setShowTeaser] = useState(false)
  const [leadForm, setLeadForm] = useState({ name: '', phone: '', rank: '' })
  const [leadSubmitting, setLeadSubmitting] = useState(false)
  const scrollRef = useRef(null)

  // Wizard answers + match results
  const [wizard, setWizard] = useState({ exam: '', rank: '', branch: '' })
  const [matches, setMatches] = useState([])

  // Countdown to next Friday
  const [countdown, setCountdown] = useState(() => formatCountdown(nextFridayDeadline()))
  useEffect(() => {
    const target = nextFridayDeadline()
    const t = setInterval(() => setCountdown(formatCountdown(target)), 60000)
    return () => clearInterval(t)
  }, [])

  // Persist messages to localStorage
  useEffect(() => {
    try { localStorage.setItem(MSGS_KEY, JSON.stringify(messages.slice(-30))) } catch {}
  }, [messages])

  // Auto-scroll to latest
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [messages, open, typing, view])

  // Auto-greet teaser bubble after 15s if user hasn't opened chat
  useEffect(() => {
    let t1, t2
    try { if (sessionStorage.getItem(TEASER_KEY) === '1') return } catch {}
    if (hasOpened) return
    t1 = setTimeout(() => setShowTeaser(true), 15000)
    t2 = setTimeout(() => {
      setShowTeaser(false)
      try { sessionStorage.setItem(TEASER_KEY, '1') } catch {}
    }, 15000 + 12000)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [hasOpened])

  // Lock body scroll on mobile when open
  useEffect(() => {
    if (!open) return
    const isMobile = window.matchMedia('(max-width: 767px)').matches
    if (!isMobile) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [open])

  const pushBot = (text, delay = 700) => {
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMessages(m => [...m, { from: 'bot', text }])
    }, delay)
  }

  const handleTopic = (topic) => {
    setMessages(m => [...m, { from: 'user', text: `${topic.icon} ${topic.label}` }])
    setCurrentTopicId(topic.id)
    setView('questions')
    pushBot(`Sure — what would you like to know about ${topic.label.toLowerCase()}?`, 500)
  }

  const handleQuestion = (qa) => {
    setMessages(m => [...m, { from: 'user', text: qa.q }])
    pushBot(qa.a, 800)
  }

  const handleSendText = (e) => {
    e?.preventDefault()
    const text = input.trim()
    if (!text) return
    setInput('')
    setMessages(m => [...m, { from: 'user', text }])
    const reply = brainReply(text)
    if (reply) {
      pushBot(reply, 700)
    } else {
      pushBot("Hmm, I'm not sure about that one. Want me to connect you with a real counsellor? Tap 'Get a callback' below 👇 or message us on WhatsApp.", 800)
    }
  }

  const handleLeadSubmit = async (e) => {
    e.preventDefault()
    setLeadSubmitting(true)
    try {
      await saveLead({ ...leadForm, source: 'Kunal Chatbot', college: '' })
      setMessages(m => [
        ...m,
        { from: 'user', text: `📝 Sent details: ${leadForm.name}, ${leadForm.phone}` },
      ])
      setView('idle')
      setLeadForm({ name: '', phone: '', rank: '' })
      pushBot(`Got it, ${leadForm.name.split(' ')[0]}! 🎉 A counsellor will call ${leadForm.phone} within 30 minutes. Save +91 72960 87953 so you don't miss the call.`, 700)
    } catch (err) {
      pushBot("Couldn't send that — please try WhatsApp or call +91 72960 87953 directly.", 500)
    } finally {
      setLeadSubmitting(false)
    }
  }

  const resetChat = () => {
    setMessages(INITIAL_MESSAGES)
    setView('topics')
    setCurrentTopicId(null)
    setWizard({ exam: '', rank: '', branch: '' })
    setMatches([])
  }

  const startWizard = () => {
    setMessages(m => [...m, { from: 'user', text: '🎯 Find my college' }])
    setWizard({ exam: '', rank: '', branch: '' })
    setMatches([])
    pushBot('Awesome — let me find your perfect college match. 🚀\n\nWhich entrance exam did you take?', 600)
    setTimeout(() => setView('finder-exam'), 800)
  }

  const handleWizardExam = (exam, label) => {
    setMessages(m => [...m, { from: 'user', text: label }])
    setWizard(w => ({ ...w, exam }))
    if (exam === 'srmjee' || exam === 'unsure') {
      pushBot('Got it. What branch are you most interested in?', 500)
      setTimeout(() => setView('finder-branch'), 700)
    } else {
      pushBot(`Great — what's your ${exam.toUpperCase()} rank? Just type the number.`, 500)
      setTimeout(() => setView('finder-rank'), 700)
    }
  }

  const handleWizardRank = (e) => {
    e?.preventDefault()
    const r = wizard.rank.trim()
    if (!r) return
    setMessages(m => [...m, { from: 'user', text: `Rank: ${r}` }])
    pushBot('Nice. And which branch are you targeting?', 500)
    setTimeout(() => setView('finder-branch'), 700)
  }

  const handleWizardBranch = (branch) => {
    setMessages(m => [...m, { from: 'user', text: branch }])
    setWizard(w => ({ ...w, branch }))
    const finalWizard = { ...wizard, branch }
    const result = findCollegeMatches(finalWizard)
    setMatches(result)
    pushBot(`✨ Done! Based on your profile, here are your top ${result.length} matches:`, 700)
    setTimeout(() => setView('finder-results'), 900)
  }

  const currentTopic = TOPICS.find(t => t.id === currentTopicId)

  const toggle = () => {
    setOpen(o => !o)
    if (!hasOpened) setHasOpened(true)
    setShowTeaser(false)
    try { sessionStorage.setItem(TEASER_KEY, '1') } catch {}
  }

  return (
    <>
      {/* Floating launcher */}
      <div className="fixed bottom-6 left-6 z-50 flex items-end gap-3">
        <AnimatePresence>
          {showTeaser && !open && (
            <motion.button
              type="button" onClick={toggle}
              initial={{ opacity: 0, x: -10, y: 4 }} animate={{ opacity: 1, x: 0, y: 0 }} exit={{ opacity: 0, x: -10 }}
              className="hidden md:flex flex-col items-start bg-white rounded-2xl shadow-2xl border border-gray-100 px-3.5 py-2.5 max-w-[220px] mb-1 hover:shadow-xl transition-shadow text-left">
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Kunal · online</span>
              <span className="text-sm text-[#102C57] font-semibold leading-snug mt-0.5">👋 Need help finding your college?</span>
              <span className="absolute -bottom-2 left-6 w-3 h-3 bg-white border-r border-b border-gray-100 rotate-45" />
            </motion.button>
          )}
        </AnimatePresence>

        <button onClick={toggle}
          aria-label={open ? 'Close chat' : 'Open chat with Kunal'}
          className="relative group">
          {!open && !hasOpened && (
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white">
              <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping" />
            </span>
          )}
          <span className="block w-14 h-14 rounded-full overflow-hidden shadow-lg shadow-blue-900/30 ring-4 ring-white group-hover:scale-110 transition-transform">
            {open
              ? <span className="w-full h-full flex items-center justify-center bg-[#1E3A8A]"><X size={22} className="text-white" /></span>
              : <img src="/kunal.jpg" alt="Kunal" className="w-full h-full object-cover object-top" />}
          </span>
        </button>
      </div>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring', damping: 24, stiffness: 280 }}
            className="fixed bottom-24 left-6 right-6 md:right-auto md:bottom-24 md:left-6 md:w-[380px] z-50 bg-white rounded-2xl shadow-2xl shadow-black/30 overflow-hidden flex flex-col"
            style={{ maxHeight: 'min(620px, calc(100vh - 8rem))' }}>

            {/* Header */}
            <div className="bg-gradient-to-br from-[#102C57] via-[#1e3a8a] to-[#102C57] px-4 py-3 flex items-center gap-3 shrink-0">
              <div className="relative">
                <img src="/kunal.jpg" alt="Kunal" className="w-11 h-11 rounded-full object-cover object-top ring-2 ring-white/30" />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#102C57]">
                  <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping" />
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-bold text-sm leading-tight">Kunal — Career Guide</p>
                <p className="text-white/70 text-[11px] mt-0.5">Online · replies in minutes</p>
              </div>
              <button onClick={resetChat} aria-label="Restart chat" title="Restart chat"
                className="p-1.5 rounded-full hover:bg-white/10 transition-colors">
                <MessageCircle size={16} className="text-white/80" />
              </button>
              <button onClick={() => setOpen(false)} aria-label="Close"
                className="p-1.5 rounded-full hover:bg-white/10 transition-colors">
                <X size={18} className="text-white/80" />
              </button>
            </div>


            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-[#F8FAFC]">
              {messages.map((m, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                    m.from === 'user'
                      ? 'bg-[#1E3A8A] text-white rounded-br-sm'
                      : 'bg-white border border-gray-200 text-gray-800 rounded-bl-sm shadow-sm'
                  }`}>
                    {m.text}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {typing && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-sm shadow-sm px-3.5 py-3 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}

              {/* Topics view */}
              {view === 'topics' && !typing && (
                <div className="pt-1 space-y-2">
                  {/* Hero CTA — Find My College wizard */}
                  <button onClick={startWizard}
                    className="relative w-full text-left bg-gradient-to-br from-[#1E3A8A] via-indigo-700 to-[#1E3A8A] rounded-2xl p-4 overflow-hidden group hover:scale-[1.02] transition-transform shadow-lg shadow-blue-900/30">
                    <span className="absolute -top-6 -right-6 w-24 h-24 bg-yellow-400/20 rounded-full blur-2xl pointer-events-none" />
                    <span className="absolute top-2 right-2 inline-flex items-center gap-1 bg-yellow-400 text-yellow-900 text-[9px] font-black px-2 py-0.5 rounded-full">
                      <Sparkles size={9} /> NEW
                    </span>
                    <div className="relative flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/15 rounded-xl flex items-center justify-center shrink-0 backdrop-blur">
                        <Zap size={20} className="text-yellow-300" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-white font-black text-sm">🎯 Find My Perfect College</div>
                        <div className="text-white/70 text-[11px] mt-0.5">Get top 3 matches in 30 seconds</div>
                      </div>
                      <ChevronRight size={16} className="text-white/60 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </button>

                  {/* Countdown card */}
                  {countdown && (
                    <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-3 py-2">
                      <Clock size={14} className="text-red-600 shrink-0" />
                      <div className="text-[11px] flex-1 min-w-0">
                        <span className="font-bold text-red-700">Counselling deadline: </span>
                        <span className="text-red-900 font-mono font-semibold">{countdown}</span>
                      </div>
                    </div>
                  )}

                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider pt-2">Browse topics</p>
                  <div className="grid grid-cols-2 gap-2">
                    {TOPICS.map(topic => (
                      <button key={topic.id} onClick={() => handleTopic(topic)}
                        className="text-left bg-white border border-blue-200 hover:bg-blue-50 hover:border-blue-300 transition-colors rounded-xl p-3">
                        <div className="text-xl mb-1">{topic.icon}</div>
                        <div className="text-[12px] font-bold text-[#1E3A8A] leading-tight">{topic.label}</div>
                      </button>
                    ))}
                  </div>
                  <button onClick={() => { setView('lead-form'); setMessages(m => [...m, { from: 'bot', text: 'Sure — share your details and I\'ll have a counsellor call you back.' }]) }}
                    className="w-full text-left bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-300 hover:border-yellow-400 transition-colors rounded-xl p-3">
                    <div className="text-[12px] font-bold text-orange-900 leading-tight">📞 Get a callback in 30 minutes</div>
                    <div className="text-[10px] text-orange-700 mt-0.5">Limited free slots today · No obligation</div>
                  </button>
                </div>
              )}

              {/* Wizard — Step 1: Exam */}
              {view === 'finder-exam' && !typing && (
                <div className="pt-1 space-y-2">
                  <p className="text-[11px] text-gray-500 font-semibold">Step 1 of 3 · Choose your exam</p>
                  {[
                    { id: 'kcet', label: 'KCET', sub: 'Karnataka government quota' },
                    { id: 'comedk', label: 'COMEDK UGET', sub: 'Karnataka private colleges' },
                    { id: 'srmjee', label: 'SRMJEE', sub: 'SRM Chennai' },
                    { id: 'unsure', label: "I haven't decided yet", sub: "I'll guide you" },
                  ].map(opt => (
                    <button key={opt.id} onClick={() => handleWizardExam(opt.id, opt.label)}
                      className="w-full text-left bg-white border border-blue-200 hover:bg-blue-50 hover:border-blue-400 transition-colors rounded-xl p-3 flex items-center gap-3">
                      <div className="flex-1">
                        <div className="text-sm font-bold text-[#1E3A8A]">{opt.label}</div>
                        <div className="text-[11px] text-gray-500 mt-0.5">{opt.sub}</div>
                      </div>
                      <ChevronRight size={16} className="text-blue-400" />
                    </button>
                  ))}
                </div>
              )}

              {/* Wizard — Step 2: Rank */}
              {view === 'finder-rank' && !typing && (
                <form onSubmit={handleWizardRank} className="pt-1 space-y-2 bg-white border border-blue-200 rounded-2xl p-3">
                  <p className="text-[11px] text-gray-500 font-semibold">Step 2 of 3 · Your {wizard.exam.toUpperCase()} rank</p>
                  <input autoFocus required type="text" inputMode="numeric"
                    placeholder="e.g. 5000"
                    value={wizard.rank}
                    onChange={e => setWizard(w => ({ ...w, rank: e.target.value }))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#1E3A8A] focus:ring-2 focus:ring-blue-100" />
                  <div className="flex gap-2">
                    <button type="button" onClick={() => setView('finder-exam')}
                      className="px-3 py-2 text-xs font-semibold text-gray-600 hover:text-gray-800 flex items-center gap-1">
                      <ArrowLeft size={12} /> Back
                    </button>
                    <button type="submit" disabled={!wizard.rank.trim()}
                      className="flex-1 bg-[#1E3A8A] hover:bg-blue-900 disabled:opacity-40 text-white font-bold text-sm py-2 rounded-lg transition-colors">
                      Continue →
                    </button>
                  </div>
                </form>
              )}

              {/* Wizard — Step 3: Branch */}
              {view === 'finder-branch' && !typing && (
                <div className="pt-1 space-y-2">
                  <p className="text-[11px] text-gray-500 font-semibold">Step 3 of 3 · Preferred branch</p>
                  <div className="grid grid-cols-2 gap-2">
                    {BRANCHES.map(b => (
                      <button key={b} onClick={() => handleWizardBranch(b)}
                        className="text-left text-[12px] font-semibold bg-white border border-blue-200 hover:bg-blue-50 hover:border-blue-400 text-[#1E3A8A] px-3 py-2.5 rounded-xl transition-colors">
                        {b}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Wizard — Results */}
              {view === 'finder-results' && !typing && (
                <div className="pt-1 space-y-2.5">
                  {matches.length === 0 ? (
                    <div className="bg-white border border-gray-200 rounded-xl p-3 text-sm text-gray-600">
                      Hmm — let me connect you with a counsellor for a custom match.
                    </div>
                  ) : (
                    matches.slice(0, 3).map((c, i) => {
                      const strength = matchStrength(wizard.exam, wizard.rank, c)
                      return (
                        <motion.div key={c.slug}
                          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.12 }}
                          className="relative bg-white border-2 border-blue-100 rounded-2xl overflow-hidden shadow-sm">
                          {i === 0 && (
                            <span className="absolute top-2 right-2 z-10 inline-flex items-center gap-1 bg-yellow-400 text-yellow-900 text-[9px] font-black px-2 py-0.5 rounded-full shadow">
                              <Award size={9} /> BEST MATCH
                            </span>
                          )}
                          <div className="relative h-24 overflow-hidden">
                            <img src={c.img} alt={c.name} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute bottom-1.5 left-2.5 right-2.5">
                              <p className="text-white font-black text-sm leading-tight drop-shadow">{c.short || c.name}</p>
                              <p className="text-white/85 text-[10px]">{c.location}</p>
                            </div>
                          </div>
                          <div className="p-2.5 space-y-1.5">
                            <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full border ${strength.cls}`}>
                              {strength.label}
                            </span>
                            <div className="grid grid-cols-3 gap-1 text-center">
                              <div className="bg-gray-50 rounded-lg py-1">
                                <p className="text-[9px] text-gray-500 uppercase font-semibold">Cutoff</p>
                                <p className="text-[11px] font-black text-gray-800">{c.cutoff || '—'}</p>
                              </div>
                              <div className="bg-gray-50 rounded-lg py-1">
                                <p className="text-[9px] text-gray-500 uppercase font-semibold">Highest</p>
                                <p className="text-[11px] font-black text-emerald-700">{c.highestPkg || '—'}</p>
                              </div>
                              <div className="bg-gray-50 rounded-lg py-1">
                                <p className="text-[9px] text-gray-500 uppercase font-semibold">Seats</p>
                                <p className="text-[11px] font-black text-gray-800">{c.seats || '—'}</p>
                              </div>
                            </div>
                            <button onClick={() => { setLeadForm(f => ({ ...f, rank: wizard.rank })); setView('lead-form'); setMessages(m => [...m, { from: 'bot', text: `Great choice! Share your details and we'll process your ${c.short || c.name} application.` }]) }}
                              className="w-full bg-gradient-to-r from-[#1E3A8A] to-indigo-700 hover:from-blue-900 text-white font-bold text-xs py-2 rounded-lg transition-colors flex items-center justify-center gap-1">
                              Apply for {c.short || c.name} <ChevronRight size={12} />
                            </button>
                          </div>
                        </motion.div>
                      )
                    })
                  )}
                  <button onClick={() => setView('topics')}
                    className="w-full text-xs text-gray-500 hover:text-gray-700 py-2 flex items-center justify-center gap-1.5">
                    <ArrowLeft size={12} /> Try another search
                  </button>
                </div>
              )}

              {/* Questions view */}
              {view === 'questions' && currentTopic && !typing && (
                <div className="pt-1 flex flex-col gap-2">
                  {currentTopic.questions.map((qa, i) => (
                    <button key={i} onClick={() => handleQuestion(qa)}
                      className="text-left text-sm bg-white border border-blue-200 text-[#1E3A8A] font-medium px-3.5 py-2 rounded-xl hover:bg-blue-50 hover:border-blue-300 transition-colors">
                      {qa.q}
                    </button>
                  ))}
                  <button onClick={() => setView('topics')}
                    className="text-left text-xs text-gray-500 hover:text-gray-700 px-3.5 py-1.5 flex items-center gap-1.5">
                    <ArrowLeft size={12} /> Back to topics
                  </button>
                </div>
              )}

              {/* Lead form view */}
              {view === 'lead-form' && !typing && (
                <form onSubmit={handleLeadSubmit} className="bg-white border border-blue-200 rounded-2xl p-3 space-y-2">
                  <input required type="text" placeholder="Your name" value={leadForm.name}
                    autoComplete="name"
                    onChange={e => setLeadForm({ ...leadForm, name: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#1E3A8A]" />
                  <input required type="tel" placeholder="Phone (e.g. +91 98xxx xxxxx)" value={leadForm.phone}
                    inputMode="tel" autoComplete="tel"
                    onChange={e => setLeadForm({ ...leadForm, phone: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#1E3A8A]" />
                  <input type="text" placeholder="KCET / COMEDK / SRMJEE rank (optional)" value={leadForm.rank}
                    onChange={e => setLeadForm({ ...leadForm, rank: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#1E3A8A]" />
                  <div className="flex gap-2 pt-1">
                    <button type="button" onClick={() => setView('topics')}
                      className="px-3 py-2 text-xs font-semibold text-gray-600 hover:text-gray-800">
                      Cancel
                    </button>
                    <button type="submit" disabled={leadSubmitting}
                      className="flex-1 bg-[#1E3A8A] hover:bg-blue-900 disabled:opacity-60 text-white font-bold text-sm py-2 rounded-lg transition-colors">
                      {leadSubmitting ? 'Sending…' : 'Request callback'}
                    </button>
                  </div>
                </form>
              )}

              {/* After answering — show "ask another" prompts */}
              {view === 'idle' && !typing && (
                <div className="pt-1 flex flex-col gap-2">
                  <button onClick={() => setView('topics')}
                    className="text-left text-sm bg-white border border-blue-200 text-[#1E3A8A] font-medium px-3.5 py-2 rounded-xl hover:bg-blue-50 hover:border-blue-300 transition-colors">
                    📚 Browse topics
                  </button>
                  <button onClick={() => { setView('lead-form'); setMessages(m => [...m, { from: 'bot', text: 'Share your details for a personalised callback.' }]) }}
                    className="text-left text-sm bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-300 text-orange-900 font-medium px-3.5 py-2 rounded-xl hover:border-yellow-400 transition-colors">
                    📞 Get a callback (30 min)
                  </button>
                </div>
              )}
            </div>

            {/* Free text input */}
            <form onSubmit={handleSendText} className="shrink-0 border-t border-gray-100 bg-white px-3 py-2 flex items-center gap-2">
              <input type="text" placeholder="Type your question…" value={input}
                onChange={e => setInput(e.target.value)}
                onFocus={() => { if (view !== 'lead-form') setView('idle') }}
                className="flex-1 px-3 py-2.5 text-sm bg-gray-100 rounded-full focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-200" />
              <button type="submit" disabled={!input.trim()}
                aria-label="Send"
                className="w-10 h-10 rounded-full bg-[#1E3A8A] hover:bg-blue-900 disabled:opacity-40 disabled:cursor-not-allowed text-white flex items-center justify-center transition-colors shrink-0">
                <Send size={16} />
              </button>
            </form>

            {/* Footer CTAs */}
            <div className="shrink-0 border-t border-gray-100 bg-white px-3 py-2 flex gap-2">
              <a href="https://wa.me/917296087953" target="_blank" rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#1da851] text-white font-semibold py-2 rounded-xl text-xs transition-colors">
                <Send size={12} /> WhatsApp
              </a>
              <a href="tel:+917296087953"
                className="flex-1 flex items-center justify-center gap-1.5 bg-[#1E3A8A] hover:bg-blue-900 text-white font-semibold py-2 rounded-xl text-xs transition-colors">
                <Phone size={12} /> Call now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// WhatsApp FAB — bottom-right
export function WhatsAppFAB() {
  const [tip, setTip] = useState(false)
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5">
      {tip && (
        <div className="bg-white text-[#102C57] text-xs font-semibold px-3.5 py-2.5 rounded-xl shadow-xl whitespace-nowrap border border-gray-100">
          Chat on WhatsApp
        </div>
      )}
      <a href="https://wa.me/917296087953" target="_blank" rel="noreferrer"
        onMouseEnter={() => setTip(true)} onMouseLeave={() => setTip(false)}
        onClick={() => setTip(false)}
        aria-label="Chat on WhatsApp"
        className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg shadow-[#25D366]/30 hover:scale-110 hover:shadow-xl hover:shadow-[#25D366]/40 transition-all">
        <WhatsAppIcon size={28} />
      </a>
    </div>
  )
}

// Call FAB — sits just above the WhatsApp FAB
export function CallFAB() {
  const [tip, setTip] = useState(false)
  return (
    <div className="fixed bottom-24 right-6 z-50 flex items-center gap-2.5">
      {tip && (
        <div className="bg-white text-[#102C57] text-xs font-semibold px-3.5 py-2.5 rounded-xl shadow-xl whitespace-nowrap border border-gray-100">
          Call now
        </div>
      )}
      <a href="tel:+917296087953"
        onMouseEnter={() => setTip(true)} onMouseLeave={() => setTip(false)}
        onClick={() => setTip(false)}
        aria-label="Call counsellor"
        className="relative w-14 h-14 bg-[#1E3A8A] rounded-full flex items-center justify-center shadow-lg shadow-[#1E3A8A]/30 hover:scale-110 hover:shadow-xl hover:shadow-[#1E3A8A]/40 transition-all">
        <span className="absolute inset-0 rounded-full bg-[#1E3A8A] opacity-40 animate-ping" />
        <Phone size={26} className="relative text-white" />
      </a>
    </div>
  )
}
