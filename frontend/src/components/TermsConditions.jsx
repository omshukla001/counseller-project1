import { motion } from 'framer-motion'

export default function TermsConditions() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-white pt-20 pb-16">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">Terms & Conditions</h1>
        <p className="text-gray-500 text-sm mb-8">Last updated: April 2026</p>

        <div className="prose prose-sm md:prose-base max-w-none text-gray-700 space-y-6">

          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">1. About Knowledge Park 360</h2>
            <p>Knowledge Park 360 is an <strong>independent educational consultancy</strong> that provides admission guidance and counselling services for engineering colleges in Bangalore, Chennai (SRM), and across India.</p>
            <p><strong>Important:</strong> We are NOT the official admission office of any college or university. We are NOT affiliated with, endorsed by, or authorised representatives of any institution mentioned on this website. All college and university names, logos, and trademarks belong to their respective owners and are used here for informational purposes only.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">2. Services We Provide</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Personalised admission counselling based on your rank, score, and preferences</li>
              <li>Guidance on KCET, COMEDK, SRMJEE, and other entrance exams</li>
              <li>Information about colleges, courses, cutoffs, and placements</li>
              <li>Documentation support and application assistance</li>
              <li>Guidance on management quota and other quota-based admission processes</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">3. No Guarantee of Admission</h2>
            <p>While we strive to provide the best guidance, we <strong>do not guarantee</strong> admission to any specific college, course, or seat. Admission decisions are made solely by the respective institutions based on their own criteria, policies, and seat availability.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">4. Accuracy of Information</h2>
            <p>We make every effort to provide accurate and up-to-date information about colleges, courses, fees, cutoffs, and placements. However, this information is sourced from publicly available data and may change without notice. We recommend verifying all details directly with the respective institutions before making decisions.</p>
            <p>Placement figures, package amounts, and rankings mentioned on this site are based on publicly reported data and are provided for informational purposes only.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">5. Fees & Payments</h2>
            <p>Initial counselling is provided free of charge. Any service fees for admission assistance will be communicated clearly and transparently before you engage our paid services. All fees and payment terms will be agreed upon in writing.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">6. User Responsibilities</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>You agree to provide accurate and truthful information when contacting us</li>
              <li>You understand that final admission decisions rest with the colleges</li>
              <li>You will not hold Knowledge Park 360 liable for admission outcomes</li>
              <li>You consent to being contacted via phone, WhatsApp, or email after submitting an enquiry</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">7. Intellectual Property</h2>
            <p>All content on this website — including text, graphics, logos, and design — is the property of Knowledge Park 360 unless otherwise stated. College names, logos, and images belong to their respective institutions.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">8. Limitation of Liability</h2>
            <p>Knowledge Park 360 shall not be liable for any direct, indirect, incidental, or consequential damages arising from the use of this website or our services. Our total liability shall not exceed the amount paid by you for our services.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">9. Governing Law</h2>
            <p>These terms shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the jurisdiction of the courts in Patna, Bihar.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">10. Contact</h2>
            <p>For questions about these Terms & Conditions:</p>
            <p><strong>Knowledge Park 360</strong><br />
            <strong>Bangalore Office:</strong> <a href="https://share.google/tGBSttE3KGMk6fkcH" target="_blank" rel="noreferrer" className="text-blue-700 underline hover:text-blue-900">17/B/5 & 17/B/5, Samruddhi, 3rd Floor, Opp. Rail Wheel Factory, Doddaballapura Road, Bangalore – 560064 ↗</a><br />
            <strong>Registered:</strong> <a href="https://www.google.com/maps/search/?api=1&query=House+No+43+Kumar+Sinha+Bailey+Road+Kusumpuram+Colony+Patna+Bihar+801503" target="_blank" rel="noreferrer" className="text-blue-700 underline hover:text-blue-900">House No. 43, Kumar Sinha, Bailey Road, Near Shiv Mandir, Kusumpuram Colony, Patna, Bihar – 801503 ↗</a><br />
            Phone: +91 72960 87953<br />
            Email: knowledgeparkedu360@gmail.com</p>
          </section>

        </div>
      </div>
    </motion.div>
  )
}
