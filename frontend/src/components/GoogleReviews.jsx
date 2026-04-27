import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, ExternalLink, Camera } from 'lucide-react'

const REVIEWS = [
  {
    name: 'Divya Issar',
    initials: 'DI',
    reviewCount: 2,
    rating: 5,
    when: '5 hours ago',
    text: "I recently took admission through Knowledge Park Education Consultancy, and I'm really happy with their service. They helped me at every step and cleared all my doubts patiently. The process was quick and stress-free. Thank you for the amazing support.",
  },
  {
    name: 'Sai Sundar',
    initials: 'SS',
    reviewCount: 2,
    photoCount: 5,
    rating: 5,
    when: '6 hours ago',
    text: "If you're looking for hassle-free admission, Knowledge Park Consultancy is the best choice. They guided me at every step and made the entire process smooth and transparent. Very professional and reliable team.",
  },
  {
    name: 'Barenyam Kumar',
    initials: 'BK',
    reviewCount: 3,
    rating: 5,
    when: '16 hours ago',
    text: 'The admission experience was truly delightful — everything felt seamless, transparent, and handled with remarkable professionalism by the team.',
  },
  {
    name: 'Nikhil Kumar',
    initials: 'NK',
    isLocalGuide: true,
    reviewCount: 20,
    photoCount: 9,
    rating: 5,
    when: '17 hours ago',
    text: 'Knowledge Park is a good consultancy — very professional and knowledgeable consultants here. You can ping them for higher education guidance.',
  },
  {
    name: 'Piyush Sinha',
    initials: 'PS',
    reviewCount: 4,
    rating: 5,
    when: '19 hours ago',
    text: 'Best consultancy of Bangalore.',
  },
  {
    name: 'Om Shukla',
    initials: 'OS',
    rating: 5,
    when: '19 hours ago',
    text: 'I was confused about admission options after my exams, but their guidance really helped. They explained different colleges in Bangalore and the complete process clearly. Based on my budget and marks, they suggested the right options and supported me step by step. Overall, a smooth and helpful experience.',
  },
  {
    name: 'IIT Bombay CSE',
    initials: 'IB',
    rating: 5,
    when: '19 hours ago',
    text: 'I was exploring different ways to get admission in Bangalore colleges. They gave clear information about exams as well as alternative options based on budget and availability. The guidance was practical and helped me make a better decision. Recommended for anyone looking for admission support.',
  },
  {
    name: 'Trending Music',
    initials: 'TM',
    rating: 5,
    when: '19 hours ago',
    text: 'Good guidance for college admissions in Bangalore. They explain everything clearly and help you choose the right option based on your situation.',
  },
  {
    name: 'KD Jha',
    initials: 'KJ',
    reviewCount: 3,
    rating: 5,
    when: '18 hours ago',
    text: 'Best loyal services.',
  },
]

const MAP_URL = 'https://share.google/tGBSttE3KGMk6fkcH'

const AVATAR_COLORS = [
  'from-blue-500 to-indigo-600',
  'from-emerald-500 to-teal-600',
  'from-orange-500 to-amber-600',
  'from-pink-500 to-rose-600',
  'from-violet-500 to-purple-600',
  'from-cyan-500 to-blue-600',
  'from-red-500 to-orange-600',
  'from-lime-500 to-emerald-600',
  'from-fuchsia-500 to-pink-600',
]

// Inline Google "G" mark — public Google brand asset (used millions of places)
function GoogleG({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/>
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.6 8.3 6.3 14.7z"/>
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.5-5.2l-6.3-5.3C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"/>
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.1 5.7l6.3 5.3C41.5 35.6 44 30.2 44 24c0-1.3-.1-2.4-.4-3.5z"/>
    </svg>
  )
}

function StarsRow({ count = 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={14}
          className={i < count ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'} />
      ))}
    </div>
  )
}

function ReviewCard({ review, idx }) {
  const colors = AVATAR_COLORS[idx % AVATAR_COLORS.length]
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay: Math.min(idx * 0.05, 0.3) }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all p-5 flex flex-col">

      {/* Reviewer header */}
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${colors} flex items-center justify-center text-white font-black text-sm shrink-0 shadow`}>
          {review.initials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-gray-900 text-sm leading-tight truncate">{review.name}</p>
          <div className="flex items-center gap-1.5 text-[11px] text-gray-500 mt-0.5 flex-wrap">
            {review.isLocalGuide && (
              <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 font-semibold px-1.5 py-0.5 rounded text-[10px]">
                Local Guide
              </span>
            )}
            {review.reviewCount && <span>{review.reviewCount} reviews</span>}
            {review.photoCount && (
              <span className="inline-flex items-center gap-0.5">
                <Camera size={10} /> {review.photoCount}
              </span>
            )}
          </div>
        </div>
        <GoogleG size={20} />
      </div>

      {/* Stars + when */}
      <div className="flex items-center gap-2 mb-3">
        <StarsRow count={review.rating} />
        <span className="text-[11px] text-gray-400">{review.when}</span>
      </div>

      {/* Text */}
      <p className="text-gray-700 text-sm leading-relaxed">{review.text}</p>
    </motion.div>
  )
}

export default function GoogleReviews() {
  const [showAll, setShowAll] = useState(false)
  const total = REVIEWS.length
  const avg = (REVIEWS.reduce((s, r) => s + r.rating, 0) / total).toFixed(1)
  const visible = showAll ? REVIEWS : REVIEWS.slice(0, 6)

  return (
    <section className="bg-[#F8FAFC] py-14 md:py-20 relative overflow-hidden">
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-yellow-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-8 md:mb-10">
          <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-3.5 py-1.5 mb-4 shadow-sm">
            <GoogleG size={14} />
            <span className="text-[11px] font-bold text-gray-700 tracking-wider uppercase">Verified Google Reviews</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight">
            Loved by Students on{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-yellow-500 to-emerald-600">
              Google
            </span>
          </h2>

          {/* Big rating */}
          <div className="mt-5 inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-4 bg-white rounded-2xl px-5 py-3 shadow-md border border-gray-100">
            <div className="text-center sm:text-left">
              <div className="flex items-baseline gap-1 justify-center sm:justify-start">
                <span className="text-4xl md:text-5xl font-black text-gray-900">{avg}</span>
                <span className="text-gray-400 text-sm">/ 5</span>
              </div>
              <div className="mt-0.5"><StarsRow count={Math.round(avg)} /></div>
            </div>
            <div className="hidden sm:block w-px h-10 bg-gray-200" />
            <div className="text-center sm:text-left">
              <p className="text-[11px] uppercase tracking-wider text-gray-500 font-bold">Based on</p>
              <p className="text-sm font-bold text-gray-900">{total}+ Google reviews</p>
            </div>
            <div className="hidden sm:block w-px h-10 bg-gray-200" />
            <a href={MAP_URL} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-full transition-colors">
              See all <ExternalLink size={11} />
            </a>
          </div>
        </motion.div>

        {/* Reviews grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {visible.map((r, i) => <ReviewCard key={r.name} review={r} idx={i} />)}
        </div>

        {/* Show more / less */}
        {total > 6 && (
          <div className="text-center mt-8">
            <button onClick={() => setShowAll(s => !s)}
              className="text-sm font-bold text-[#1E3A8A] hover:text-blue-900 underline underline-offset-4">
              {showAll ? '— Show fewer reviews' : `+ Show all ${total} reviews`}
            </button>
          </div>
        )}

        {/* Footer CTA */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="mt-10 md:mt-14 bg-gradient-to-br from-[#102C57] via-[#1e3a8a] to-[#102C57] rounded-3xl px-6 py-8 md:py-10 text-center text-white relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-yellow-400/15 rounded-full blur-3xl pointer-events-none" />
          <h3 className="text-xl md:text-2xl font-black">Want to be our next happy student?</h3>
          <p className="text-white/70 text-sm mt-2 max-w-md mx-auto">
            Free counselling · Real counsellors · Honest college recommendations
          </p>
          <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="tel:+917296087953"
              className="bg-white text-[#102C57] font-bold px-6 py-3 rounded-full text-sm hover:scale-105 transition-transform">
              📞 Call +91 72960 87953
            </a>
            <a href={MAP_URL} target="_blank" rel="noreferrer"
              className="text-white/90 hover:text-white text-sm font-semibold underline underline-offset-4">
              Read all reviews on Google →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
