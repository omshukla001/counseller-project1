import { motion } from 'framer-motion'

export default function PrivacyPolicy() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-white pt-20 pb-16">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-gray-500 text-sm mb-8">Last updated: April 2026</p>

        <div className="prose prose-sm md:prose-base max-w-none text-gray-700 space-y-6">

          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">1. Who We Are</h2>
            <p>Knowledge Park 360 ("we", "us", "our") is an independent educational consultancy that provides admission guidance for engineering colleges across India. We are <strong>not</strong> affiliated with, endorsed by, or part of any college or university.</p>
            <p><strong>Bangalore Office:</strong> <a href="https://share.google/tGBSttE3KGMk6fkcH" target="_blank" rel="noreferrer" className="text-blue-700 underline hover:text-blue-900">17/B/5 & 17/B/5, Samruddhi, 3rd Floor, Opp. Rail Wheel Factory, Doddaballapura Road, Bangalore – 560064 ↗</a></p>
            <p><strong>Registered Address:</strong> <a href="https://www.google.com/maps/search/?api=1&query=House+No+43+Kumar+Sinha+Bailey+Road+Kusumpuram+Colony+Patna+Bihar+801503" target="_blank" rel="noreferrer" className="text-blue-700 underline hover:text-blue-900">House No. 43, Kumar Sinha, Bailey Road, Near Shiv Mandir, Kusumpuram Colony, Patna, Bihar – 801503 ↗</a></p>
            <p><strong>Contact:</strong> +91 72960 87953 | knowledgeparkedu360@gmail.com</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">2. Information We Collect</h2>
            <p>We collect the following personal information when you fill out a form or contact us:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Full name</li>
              <li>Phone number</li>
              <li>Email address (if provided)</li>
              <li>KCET / COMEDK / SRMJEE rank or score</li>
              <li>Preferred branch / course</li>
            </ul>
            <p>We also automatically collect non-personal data such as browser type, device type, IP address, pages visited, and referring URL through cookies and analytics tools.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">3. How We Use Your Information</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>To provide personalised admission counselling and guidance</li>
              <li>To contact you regarding your enquiry via phone, WhatsApp, or email</li>
              <li>To send admission alerts, college updates, and relevant notifications</li>
              <li>To improve our website and services</li>
              <li>To run and measure advertising campaigns (Google Ads, Meta Ads)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">4. Cookies & Tracking</h2>
            <p>We use cookies and similar tracking technologies including:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Essential cookies:</strong> Required for the website to function properly.</li>
              <li><strong>Analytics cookies:</strong> Google Analytics to understand how visitors use our site.</li>
              <li><strong>Advertising cookies:</strong> Google Ads and Meta Pixel to measure ad performance and show relevant ads.</li>
            </ul>
            <p>You can manage cookie preferences through your browser settings. Disabling cookies may affect site functionality.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">5. Data Sharing</h2>
            <p>We do <strong>not</strong> sell your personal information. We may share data with:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Google (for ad measurement and analytics)</li>
              <li>Meta / Facebook (for ad measurement)</li>
              <li>Partner colleges (only with your explicit consent, to process your admission)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">6. Data Security</h2>
            <p>We implement reasonable security measures to protect your personal information from unauthorised access, alteration, or disclosure. However, no method of transmission over the internet is 100% secure.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">7. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Request access to the personal data we hold about you</li>
              <li>Request correction or deletion of your data</li>
              <li>Opt out of marketing communications at any time</li>
              <li>Withdraw consent for data processing</li>
            </ul>
            <p>To exercise these rights, contact us at <strong>knowledgeparkedu360@gmail.com</strong> or call <strong>+91 72960 87953</strong>.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">8. Third-Party Links</h2>
            <p>Our website may contain links to third-party websites (colleges, exam portals, etc.). We are not responsible for the privacy practices of these external sites.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">9. Children's Privacy</h2>
            <p>Our services are intended for students aged 16 and above. We do not knowingly collect information from children under 16 without parental consent.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">10. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date.</p>
          </section>

        </div>
      </div>
    </motion.div>
  )
}
