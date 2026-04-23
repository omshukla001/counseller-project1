export const COLLEGES = [
  {
    rank: 1, slug: 'rvce', short: 'RVCE', name: 'RV College of Engineering', fullName: 'RV College Of Engineering',
    location: 'Mysore Road, Bangalore', highlight: '#1 Ranked in Karnataka',
    badge: 'AICTE | VTU', color: 'from-[#1e3a8a] to-[#0f172a]',
    img: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/RV_College_Admin_block.JPG',
    bannerImg: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/RV_College_Admin_block.JPG',
    seats: '1,560', cutoff: 'KCET < 500',
    highestPkg: '67 LPA', type: 'Private, Autonomous', accreditation: 'NAAC A+ / NBA', approval: 'AICTE, VTU',
    about: `RV College of Engineering (RVCE), located in Bangalore, India, is one of the country's leading engineering institutions. Established in 1963, it is affiliated with Visvesvaraya Technological University (VTU) and accredited by the National Board of Accreditation (NBA) and the National Assessment and Accreditation Council (NAAC). The college offers undergraduate and postgraduate programs across various engineering disciplines, including Computer Science, Electrical, Mechanical, Civil, and more.\n\nRVCE is known for its strong emphasis on research, innovation, and development. It has well-equipped laboratories, a modern library, and numerous research centers that facilitate advanced study and experimentation. The campus spans over 52 acres, providing a conducive environment with facilities such as hostels, sports complexes, and auditoriums.`,
    placements: {
      rate: '98%', avg: '₹8–12 LPA', highest: '67 LPA',
      companies: ['Google', 'Microsoft', 'Amazon', 'IBM', 'Accenture', 'Infosys', 'Wipro', 'TCS'],
      points: [
        'High Placement Rates: Strong placement record across most programs.',
        'Diverse Recruiters: Google, Microsoft, Amazon, IBM, Accenture, Infosys, Wipro, and TCS.',
        'Competitive Salaries: Average 6–8 LPA; top performers 20+ LPA in CSE & ECE.',
        'Internships: Facilitated with leading companies, often leading to PPOs.',
        'Support: Resume workshops, mock interviews, soft skills & technical training.',
        'Alumni Network: Strong network for job opportunities and mentorship.',
      ]
    },
    courses: ['Computer Science and Engineering (CSE)', 'Information Science and Engineering (ISE)', 'Electronics and Communication Engineering (ECE)', 'Electrical and Electronics Engineering (EEE)', 'Mechanical Engineering', 'Civil Engineering', 'Biotechnology', 'Artificial Intelligence and Machine Learning', 'Data Science', 'Cyber Security', 'Aerospace Engineering', 'Chemical Engineering'],
    eligibility: ['Must have completed 10+2 from a recognized board', 'Mandatory: Physics and Mathematics', 'Optional: Chemistry / Biology / Biotechnology / CS / Electronics', 'Valid KCET / COMEDK UGET score', 'Minimum aggregate as per VTU norms'],
    reviews: [
      { name: 'Aditya Ranjan', batch: 'CSE 2025', stars: 5, text: 'RVCE has been a life-changing experience. The faculty is top-notch, placements are amazing, and the campus culture encourages innovation. Got placed at a top product company with a great package.' },
      { name: 'Sneha Rao', batch: 'ECE 2024', stars: 5, text: 'Excellent labs and research opportunities. The industry collaborations are strong and professors genuinely care about student growth. Highly recommend for serious engineering aspirants.' },
      { name: 'Karthik Menon', batch: 'ISE 2024', stars: 4, text: 'Great academic rigor and placement support. The coding culture among students pushes everyone to do better. Hostel life could be improved but overall a top-tier college.' },
    ],
  },
  {
    rank: 2, slug: 'bmsce', short: 'BMSCE', name: 'BMS College of Engineering', fullName: 'BMS College Of Engineering',
    location: 'Basavanagudi, Bangalore', highlight: 'Oldest Private College',
    badge: 'AICTE | VTU', color: 'from-[#1e40af] to-[#0f172a]',
    img: '/bmsce1.webp',
    bannerImg: '/bmsce1.webp',
    seats: '1,200', cutoff: 'KCET < 800',
    highestPkg: '52 LPA', type: 'Private, Autonomous', accreditation: 'NAAC A+ / NBA', approval: 'AICTE, VTU',
    about: `BMS College of Engineering (BMSCE), established in 1946, is one of the oldest and most prestigious private engineering colleges in India. Located in Basavanagudi, Bangalore, it is affiliated with VTU and accredited by NAAC with A+ grade. The college is known for its strong academic culture, excellent infrastructure, and industry connections.\n\nBMSCE offers a wide range of undergraduate and postgraduate programs. The campus features modern labs, a central library, sports facilities, and student activity centers. The college has a strong alumni network spread across the globe.`,
    placements: {
      rate: '95%', avg: '₹7–10 LPA', highest: '52 LPA',
      companies: ['Flipkart', 'Oracle', 'Cisco', 'Bosch', 'SAP', 'Cognizant', 'Capgemini', 'L&T'],
      points: ['95%+ placement rate across engineering branches.', 'Top recruiters include Flipkart, Oracle, Cisco, Bosch, SAP.', 'Average package 7–10 LPA; highest 52 LPA.', 'Strong internship program with PPO opportunities.', 'Dedicated placement cell with year-round training.']
    },
    courses: ['Computer Science and Engineering', 'Electronics and Communication Engineering', 'Mechanical Engineering', 'Civil Engineering', 'Information Science', 'Electrical Engineering', 'AI & ML', 'Data Science'],
    eligibility: ['10+2 with Physics and Mathematics', 'Valid KCET / COMEDK score', 'Minimum 45% aggregate in PCM'],
    reviews: [
      { name: 'Vishal Patil', batch: 'ECE 2024', stars: 5, text: 'BMSCE gave me strong fundamentals and an excellent peer group. The legacy of the college shows in the quality of faculty and alumni network. Placements were smooth.' },
      { name: 'Priya Shetty', batch: 'CSE 2025', stars: 5, text: 'Loved the vibrant campus and the blend of academics and fests. The central Basavanagudi location is a huge plus. Core CSE placements were excellent this year.' },
      { name: 'Rahul Nair', batch: 'Mech 2024', stars: 4, text: 'Strong mechanical department with good lab infrastructure. Placement cell is active and supportive. Would definitely recommend BMSCE for core branches.' },
    ],
  },
  {
    rank: 3, slug: 'msrit', short: 'MSRIT', name: 'MS Ramaiah Institute of Technology', fullName: 'MS Ramaiah Institute Of Technology',
    location: 'Ramaiah Road, Bangalore', highlight: 'Top Placements',
    badge: 'AICTE | VTU', color: 'from-[#1d4ed8] to-[#0f172a]',
    img: 'https://upload.wikimedia.org/wikipedia/commons/a/af/MSRIT_from_front_gate.jpg',
    bannerImg: 'https://upload.wikimedia.org/wikipedia/commons/a/af/MSRIT_from_front_gate.jpg',
    seats: '1,380', cutoff: 'KCET < 1200',
    highestPkg: '45 LPA', type: 'Private, Autonomous', accreditation: 'NAAC A / NBA', approval: 'AICTE, VTU',
    about: `MS Ramaiah Institute of Technology (MSRIT), established in 1962, is a premier engineering institution in Bangalore. Affiliated with VTU and accredited by NAAC, MSRIT is known for its excellent placement record and industry-oriented curriculum.\n\nThe campus spans 25 acres with state-of-the-art labs, a well-stocked library, and modern classrooms. MSRIT has strong ties with the IT industry and regularly hosts hackathons, tech fests, and industry visits.`,
    placements: {
      rate: '92%', avg: '₹6–9 LPA', highest: '45 LPA',
      companies: ['Infosys', 'Wipro', 'TCS', 'HCL', 'Mindtree', 'Mphasis', 'Honeywell', 'ABB'],
      points: ['92% placement rate.', 'Top recruiters: Infosys, Wipro, TCS, HCL, Mindtree.', 'Average 6–9 LPA; highest 45 LPA.', 'Active internship and PPO program.']
    },
    courses: ['Computer Science', 'ECE', 'Mechanical', 'Civil', 'ISE', 'EEE', 'AI & ML', 'Biotechnology'],
    eligibility: ['10+2 with Physics and Mathematics', 'Valid KCET / COMEDK score', 'Minimum 45% in PCM'],
    reviews: [
      { name: 'Arjun Krishnan', batch: 'CSE 2024', stars: 5, text: 'MSRIT offered me the right balance of academics and exposure. Placement drives began early and I got multiple offers. Faculty mentorship was a big plus.' },
      { name: 'Divya Hegde', batch: 'ISE 2025', stars: 4, text: 'Good college with active tech clubs and hackathons. Placement support is strong for IT branches. Infrastructure could use upgrades but curriculum is solid.' },
      { name: 'Manoj Kumar', batch: 'ECE 2024', stars: 5, text: 'MSRIT is a hidden gem in Bangalore. Research opportunities and alumni network helped me secure an internship at a top MNC which converted to a full-time offer.' },
    ],
  },
  {
    rank: 4, slug: 'pesu', short: 'PESU', name: 'PES University', fullName: 'PES University',
    location: 'RR Campus, Bangalore', highlight: 'Tier 1 Infrastructure',
    badge: 'AICTE | UGC', color: 'from-[#1e3a8a] to-[#172554]',
    img: '/pes12.jpeg',
    bannerImg: '/pes12.jpeg',
    seats: '960', cutoff: 'COMEDK < 2000',
    highestPkg: '58 LPA', type: 'Private University', accreditation: 'NAAC A+', approval: 'AICTE, UGC',
    about: `PES University, established in 1972, is one of Bangalore's top private universities. Known for its world-class infrastructure, research culture, and strong industry connections, PESU consistently ranks among the top engineering institutions in India.\n\nThe university offers programs in engineering, management, and sciences. Its RR Campus in Bangalore is equipped with cutting-edge labs, innovation centers, and a vibrant student community.`,
    placements: {
      rate: '96%', avg: '₹9–14 LPA', highest: '58 LPA',
      companies: ['Google', 'Amazon', 'Microsoft', 'Goldman Sachs', 'Morgan Stanley', 'Uber', 'Ola', 'Zomato'],
      points: ['96% placement rate.', 'Top tech and finance recruiters.', 'Average 9–14 LPA; highest 58 LPA.', 'Strong startup ecosystem and entrepreneurship support.']
    },
    courses: ['Computer Science', 'ECE', 'Mechanical', 'AI & ML', 'Data Science', 'Robotics', 'Biotechnology'],
    eligibility: ['10+2 with Physics and Mathematics', 'Valid COMEDK / JEE / PESSAT score', 'Minimum 60% in PCM'],
    reviews: [
      { name: 'Meghna Iyer', batch: 'AI&ML 2025', stars: 5, text: 'PES University has world-class infrastructure and faculty. The emphasis on research and projects pushed me to build a strong portfolio. Placed at a top fintech company.' },
      { name: 'Siddharth Rao', batch: 'CSE 2024', stars: 5, text: 'PESU is one of the best private universities. The coding culture, startup ecosystem, and campus life are unmatched. Highly competitive but extremely rewarding.' },
      { name: 'Ananya Prakash', batch: 'Data Science 2025', stars: 4, text: 'Great exposure to industry projects and live mentorship. The Data Science program is well-designed with real-world applications. Placement support is phenomenal.' },
    ],
  },
  {
    rank: 5, slug: 'bmsit', short: 'BMSIT', name: 'BMS Institute of Technology', fullName: 'BMS Institute Of Technology',
    location: 'Yelahanka, Bangalore', highlight: 'High Growth / Research',
    badge: 'AICTE | VTU', color: 'from-[#1e40af] to-[#172554]',
    img: '/bmsit1.webp',
    bannerImg: '/bmsit1.webp',
    seats: '1,080', cutoff: 'KCET < 3000',
    highestPkg: '38 LPA', type: 'Private, Autonomous', accreditation: 'NAAC A', approval: 'AICTE, VTU',
    about: `BMS Institute of Technology and Management (BMSIT&M), established in 2002, is a rapidly growing engineering college in Yelahanka, Bangalore. Affiliated with VTU and accredited by NAAC, BMSIT is known for its research-oriented approach and modern infrastructure.\n\nThe campus features advanced labs, a digital library, innovation hub, and excellent sports facilities. BMSIT has strong industry partnerships and a growing placement record.`,
    placements: {
      rate: '88%', avg: '₹5–8 LPA', highest: '38 LPA',
      companies: ['Infosys', 'Wipro', 'Cognizant', 'Capgemini', 'Tech Mahindra', 'Accenture', 'IBM'],
      points: ['88% placement rate.', 'Growing recruiter base with top IT companies.', 'Average 5–8 LPA; highest 38 LPA.', 'Active research and innovation programs.']
    },
    courses: ['Computer Science', 'ECE', 'Mechanical', 'Civil', 'ISE', 'AI & ML', 'Data Science'],
    eligibility: ['10+2 with Physics and Mathematics', 'Valid KCET / COMEDK score', 'Minimum 45% in PCM'],
    reviews: [
      { name: 'Harsh Gupta', batch: 'CSE 2025', stars: 4, text: 'BMSIT has a beautiful campus in Yelahanka with modern labs. Placement support has grown significantly and I landed a good role through campus drives.' },
      { name: 'Lavanya Pai', batch: 'ISE 2024', stars: 4, text: 'Great research exposure and supportive faculty. The innovation hub helped me build real projects. Placements are improving year over year.' },
      { name: 'Rohit Verma', batch: 'ECE 2025', stars: 5, text: 'Loved my time at BMSIT. Clean campus, supportive seniors, and the placement cell pushed us through mock interviews and soft skills training.' },
    ],
  },
  {
    rank: 6, slug: 'bit', short: 'BIT', name: 'Bangalore Institute of Technology', fullName: 'Bangalore Institute Of Technology',
    location: 'V.V. Puram, Bangalore', highlight: 'Central City Location',
    badge: 'AICTE | VTU', color: 'from-[#1d4ed8] to-[#0f172a]',
    img: '/bit1.webp',
    bannerImg: '/bit1.webp',
    seats: '900', cutoff: 'KCET < 4000',
    highestPkg: '32 LPA', type: 'Private, Autonomous', accreditation: 'NAAC A', approval: 'AICTE, VTU',
    about: `Bangalore Institute of Technology (BIT), established in 1979, is centrally located in V.V. Puram, Bangalore. Affiliated with VTU, BIT is known for its strong academic foundation and convenient city-center location.\n\nThe college offers a range of engineering programs and has a dedicated placement cell. Its central location makes it easily accessible and well-connected to Bangalore's IT corridor.`,
    placements: {
      rate: '85%', avg: '₹5–7 LPA', highest: '32 LPA',
      companies: ['TCS', 'Infosys', 'Wipro', 'HCL', 'Mphasis', 'Mindtree'],
      points: ['85% placement rate.', 'Strong core engineering and IT placements.', 'Average 5–7 LPA; highest 32 LPA.']
    },
    courses: ['Computer Science', 'ECE', 'Mechanical', 'Civil', 'EEE', 'ISE'],
    eligibility: ['10+2 with Physics and Mathematics', 'Valid KCET / COMEDK score'],
    reviews: [
      { name: 'Aakash Bhat', batch: 'CSE 2024', stars: 4, text: 'BIT\'s central location is a huge advantage — close to Bangalore\'s tech hubs. Faculty is experienced and the curriculum is well-structured. Placements are decent.' },
      { name: 'Shreya Kulkarni', batch: 'ECE 2025', stars: 4, text: 'The legacy and accessibility of BIT make it a solid choice. Labs are well-maintained and professors encourage hands-on learning. Good placement record.' },
      { name: 'Nikhil Das', batch: 'ISE 2024', stars: 5, text: 'Being in the heart of Bangalore means easy access to internships and tech events. Great peer group and supportive placement cell.' },
    ],
  },
  {
    rank: 7, slug: 'dsce', short: 'DSCE', name: 'Dayananda Sagar College of Engineering', fullName: 'Dayananda Sagar College Of Engineering',
    location: 'Kumaraswamy Layout, Bangalore', highlight: 'Diverse Campus Life',
    badge: 'AICTE | VTU', color: 'from-[#1e3a8a] to-[#1e40af]',
    img: '/dsce12.webp',
    bannerImg: '/dsce12.webp',
    seats: '1,020', cutoff: 'KCET < 5000',
    highestPkg: '30 LPA', type: 'Private, Autonomous', accreditation: 'NAAC A', approval: 'AICTE, VTU',
    about: `Dayananda Sagar College of Engineering (DSCE), established in 1979, is part of the Dayananda Sagar Institutions group. Located in Kumaraswamy Layout, Bangalore, DSCE is known for its vibrant campus life, diverse student community, and strong academic programs.\n\nThe college offers a wide range of engineering disciplines and has excellent sports, cultural, and technical clubs. DSCE has a growing placement record with increasing industry partnerships.`,
    placements: {
      rate: '82%', avg: '₹4–7 LPA', highest: '30 LPA',
      companies: ['Infosys', 'Wipro', 'TCS', 'Cognizant', 'Accenture', 'L&T Infotech'],
      points: ['82% placement rate.', 'Diverse recruiter base.', 'Average 4–7 LPA; highest 30 LPA.']
    },
    courses: ['Computer Science', 'ECE', 'Mechanical', 'Civil', 'ISE', 'EEE', 'AI & ML'],
    eligibility: ['10+2 with Physics and Mathematics', 'Valid KCET / COMEDK score'],
    reviews: [
      { name: 'Pooja Reddy', batch: 'CSE 2025', stars: 4, text: 'DSCE has a lively campus with tons of cultural and technical events. Faculty is approachable and the placement cell works hard to bring diverse recruiters.' },
      { name: 'Tanmay Joshi', batch: 'ECE 2024', stars: 4, text: 'Good college with varied student community. The sports and cultural clubs are vibrant. Placements are steadily improving for core branches.' },
      { name: 'Sanjana Gowda', batch: 'AI&ML 2025', stars: 5, text: 'Enjoyed the multidisciplinary exposure at DSCE. Group projects and hackathons gave me a real-world edge before placements. Recommend it for all-rounders.' },
    ],
  },
  {
    rank: 8, slug: 'nmit', short: 'NMIT', name: 'Nitte Meenakshi Institute of Technology', fullName: 'Nitte Meenakshi Institute Of Technology',
    location: 'Yelahanka, Bangalore', highlight: 'Autonomous Excellence',
    badge: 'AICTE | VTU', color: 'from-[#1d4ed8] to-[#172554]',
    img: '/nmit1.webp',
    bannerImg: '/nmit1.webp',
    seats: '840', cutoff: 'KCET < 6000',
    highestPkg: '28 LPA', type: 'Private, Autonomous', accreditation: 'NAAC A+', approval: 'AICTE, VTU',
    about: `Nitte Meenakshi Institute of Technology (NMIT), established in 2001, is an autonomous institution affiliated with VTU and accredited by NAAC with A+ grade. Located in Yelahanka, Bangalore, NMIT is known for its academic excellence and research culture.\n\nThe campus has modern infrastructure, well-equipped labs, and a strong focus on innovation. NMIT has a growing placement record and strong industry connections.`,
    placements: {
      rate: '86%', avg: '₹5–8 LPA', highest: '28 LPA',
      companies: ['Infosys', 'Wipro', 'TCS', 'HCL', 'Bosch', 'Siemens'],
      points: ['86% placement rate.', 'Strong core and IT placements.', 'Average 5–8 LPA; highest 28 LPA.']
    },
    courses: ['Computer Science', 'ECE', 'Mechanical', 'Civil', 'ISE', 'AI & ML', 'Data Science'],
    eligibility: ['10+2 with Physics and Mathematics', 'Valid KCET / COMEDK score'],
    reviews: [
      { name: 'Akhil Sharma', batch: 'CSE 2024', stars: 5, text: 'NMIT\'s autonomous status reflects in its flexible curriculum and quality teaching. Placement record is strong and faculty mentorship is exceptional.' },
      { name: 'Riya Pillai', batch: 'Data Science 2025', stars: 4, text: 'The Data Science program at NMIT is well-structured with industry collaborations. Campus is peaceful and ideal for focused learning.' },
      { name: 'Varun Shetty', batch: 'ECE 2024', stars: 4, text: 'Good autonomous college with modern labs and research focus. Placement cell is active and many core companies visit annually.' },
    ],
  },
  {
    rank: 9, slug: 'rnsit', short: 'RNSIT', name: 'RNS Institute of Technology', fullName: 'RNS Institute Of Technology',
    location: 'Channasandra, Bangalore', highlight: 'Top CSE Placements',
    badge: 'AICTE | VTU', color: 'from-[#1e40af] to-[#0f172a]',
    img: '/rnsit1.webp',
    bannerImg: '/rnsit1.webp',
    seats: '780', cutoff: 'KCET < 7000',
    highestPkg: '26 LPA', type: 'Private, Autonomous', accreditation: 'NAAC A', approval: 'AICTE, VTU',
    about: `RNS Institute of Technology (RNSIT), established in 2001, is located in Channasandra, Bangalore. Affiliated with VTU and accredited by NAAC, RNSIT is particularly known for its strong Computer Science placements.\n\nThe college has modern labs, a digital library, and active student clubs. RNSIT has a dedicated placement cell that works year-round to connect students with top recruiters.`,
    placements: {
      rate: '84%', avg: '₹5–7 LPA', highest: '26 LPA',
      companies: ['TCS', 'Infosys', 'Wipro', 'Cognizant', 'Capgemini', 'Mphasis'],
      points: ['84% placement rate.', 'Strong CSE and ISE placements.', 'Average 5–7 LPA; highest 26 LPA.']
    },
    courses: ['Computer Science', 'ECE', 'Mechanical', 'Civil', 'ISE', 'EEE'],
    eligibility: ['10+2 with Physics and Mathematics', 'Valid KCET / COMEDK score'],
    reviews: [
      { name: 'Gautam Iyer', batch: 'CSE 2024', stars: 5, text: 'RNSIT is excellent for CSE placements. The coding culture among students is strong and faculty encourages competitive programming. Got a great offer in my final year.' },
      { name: 'Shruti Ramesh', batch: 'ISE 2025', stars: 4, text: 'Strong IT placements and supportive placement cell. The digital library and modern labs helped me build solid projects. Highly recommend for software roles.' },
      { name: 'Arnav Kumar', batch: 'CSE 2024', stars: 4, text: 'RNSIT surprised me with its placement results. Faculty is experienced and the training programs for aptitude and coding interviews were thorough.' },
    ],
  },
  {
    rank: 10, slug: 'smvit', short: 'Sir MVIT', name: 'Sir M. Visvesvaraya Institute of Technology', fullName: 'Sir M. Visvesvaraya Institute Of Technology',
    location: 'Airport Road, Bangalore', highlight: 'Legacy Campus',
    badge: 'AICTE | VTU', color: 'from-[#1e3a8a] to-[#0f172a]',
    img: '/smvit12.jpeg',
    bannerImg: '/smvit12.jpeg',
    seats: '720', cutoff: 'KCET < 8000',
    highestPkg: '24 LPA', type: 'Private, Autonomous', accreditation: 'NAAC A', approval: 'AICTE, VTU',
    about: `Sir M. Visvesvaraya Institute of Technology (Sir MVIT), established in 1986, is named after the legendary engineer Sir M. Visvesvaraya. Located on Airport Road, Bangalore, Sir MVIT is known for its legacy, strong academic culture, and growing industry connections.\n\nThe campus has excellent infrastructure, modern labs, and a vibrant student community. Sir MVIT has a dedicated placement cell and strong alumni network.`,
    placements: {
      rate: '80%', avg: '₹4–6 LPA', highest: '24 LPA',
      companies: ['TCS', 'Infosys', 'Wipro', 'HCL', 'Tech Mahindra'],
      points: ['80% placement rate.', 'Growing IT and core engineering placements.', 'Average 4–6 LPA; highest 24 LPA.']
    },
    courses: ['Computer Science', 'ECE', 'Mechanical', 'Civil', 'ISE', 'EEE'],
    eligibility: ['10+2 with Physics and Mathematics', 'Valid KCET / COMEDK score'],
    reviews: [
      { name: 'Rakesh Bhatia', batch: 'Mech 2024', stars: 4, text: 'Sir MVIT has a strong legacy and a beautiful airport road campus. Faculty is experienced and the core engineering departments are solid.' },
      { name: 'Neha Venkatesh', batch: 'CSE 2025', stars: 4, text: 'Good placements for a mid-tier autonomous college. Alumni network is strong and the campus culture is welcoming. Faculty support was great.' },
      { name: 'Yash Pandit', batch: 'ECE 2024', stars: 5, text: 'Sir MVIT gave me solid fundamentals and a memorable college life. Placement cell brings in many recruiters every year.' },
    ],
  },
  {
    rank: 11, slug: 'jain', short: 'Jain', name: 'Jain (Deemed-to-be University)', fullName: 'Jain (Deemed-to-be University)',
    location: 'Jayanagar, Bangalore', highlight: 'NAAC A++ University',
    badge: 'UGC | NAAC A++', color: 'from-[#1e3a8a] to-[#172554]',
    img: '/jain1.webp',
    bannerImg: '/jain1.webp',
    seats: '5,000+', cutoff: 'JET / Management Quota',
    highestPkg: '50 LPA', type: 'Deemed University', accreditation: 'NAAC A++ / UGC', approval: 'UGC, AICTE',
    about: `Jain (Deemed-to-be University), established in 1990, is one of Bangalore's top-ranked universities. It holds the prestigious NAAC A++ accreditation and is recognized by UGC. Located in Jayanagar, Bangalore, Jain University is known for its multidisciplinary approach, strong placement record, and world-class infrastructure.\n\nThe university offers a wide range of programs across engineering, management, sciences, humanities, and commerce. With a sprawling campus, modern labs, research centers, incubation hubs, and excellent sports facilities, Jain University provides a holistic learning environment. It has strong industry partnerships and an extensive alumni network across the globe.`,
    placements: {
      rate: '95%', avg: '₹6–12 LPA', highest: '50 LPA',
      companies: ['Google', 'Amazon', 'Deloitte', 'EY', 'KPMG', 'Wipro', 'Infosys', 'Bosch', 'Goldman Sachs'],
      points: [
        '95%+ placement rate across programs.',
        'Top recruiters include Google, Amazon, Deloitte, EY, KPMG.',
        'Average package 6–12 LPA; highest 50 LPA.',
        'Strong internship and live project opportunities.',
        'Dedicated Career Development Centre with year-round training.',
        'Active startup incubation center for entrepreneurial students.',
      ]
    },
    courses: ['Computer Science and Engineering', 'Electronics and Communication Engineering', 'Mechanical Engineering', 'Civil Engineering', 'AI & Machine Learning', 'Data Science', 'Biotechnology', 'BBA', 'MBA', 'B.Com', 'BCA', 'MCA'],
    eligibility: ['10+2 from a recognized board', 'Valid JET / KCET / COMEDK score or Management Quota', 'Minimum 50% aggregate'],
    reviews: [
      { name: 'Ananya Deshmukh', batch: 'BBA 2025', stars: 5, text: 'Jain University offered me a multidisciplinary environment. The BBA program had excellent industry connects and live projects. Placed at a leading consulting firm.' },
      { name: 'Kiran Pai', batch: 'CSE 2024', stars: 5, text: 'NAAC A++ accreditation shows in the quality of faculty and infrastructure. The startup incubation center helped me build my own venture. Highly recommend.' },
      { name: 'Megha Balan', batch: 'MBA 2025', stars: 4, text: 'Great MBA program with industry-aligned curriculum. Strong alumni network and placement cell. Jain\'s diverse student body enriches the learning experience.' },
    ],
  },
]

export const WHY_BLR = [
  { icon: '🏢', title: '2000+ IT Companies', desc: 'Silicon Valley of India' },
  { icon: '🚀', title: 'Startup Hub', desc: '10,000+ active startups' },
  { icon: '🎓', title: 'Top Placements', desc: 'Avg package ₹8–25 LPA' },
  { icon: '🔬', title: 'Research Excellence', desc: 'IISc & top labs nearby' },
]

export const WHY_SRM = [
  { icon: '🏆', title: 'Top 10 NIRF', desc: 'Ranked among India\'s best universities' },
  { icon: '💼', title: '92 LPA Highest', desc: 'Record-breaking placement packages' },
  { icon: '🌍', title: '50,000+ Students', desc: 'Largest private university campus' },
  { icon: '🤝', title: '800+ Recruiters', desc: 'Google, Microsoft, Amazon & more' },
  { icon: '🔬', title: 'Research Driven', desc: '500+ patents & funded projects' },
  { icon: '🎓', title: 'SRMJEE Guidance', desc: 'Phase 1 & 2 expert counselling' },
]

export const SRM_COLLEGE = {
  rank: 0, slug: 'srm', short: 'SRM Chennai',
  name: 'SRM Institute of Science and Technology',
  fullName: 'SRM Institute of Science and Technology',
  location: 'Kattankulathur, Chennai, Tamil Nadu',
  highlight: 'Top 10 NIRF | 92 LPA Highest Package',
  badge: 'UGC | NAAC A++',
  color: 'from-[#1e3a8a] to-[#0f172a]',
  img: '/srm1.jpg',
  bannerImg: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/SRM_University_Auditorium.JPG',
  seats: '10,000+', cutoff: 'SRMJEE / Management Quota',
  highestPkg: '92 LPA',
  type: 'Deemed University', accreditation: 'NAAC A++ / UGC', approval: 'UGC, AICTE',
  about: `SRM Institute of Science and Technology (SRMIST), established in 1985, is one of India's top-ranked private deemed universities. Located in Kattankulathur, Chennai, SRM is consistently ranked among the Top 10 private universities by NIRF and holds the prestigious NAAC A++ accreditation.\n\nSRM offers an extensive range of undergraduate, postgraduate and doctoral programs across engineering, medicine, management, sciences, and humanities. The 250-acre Kattankulathur campus features world-class infrastructure: modern lecture halls, 500+ labs, innovation centers, a sprawling library, hostels, sports complexes, and global partnerships with top universities abroad.\n\nSRM is known for record-breaking placements — 92 LPA highest package — and recruiters like Google, Microsoft, Amazon, Goldman Sachs, Deloitte, and 800+ others visit the campus every year. The university is research-driven with 500+ patents and international collaborations.`,
  placements: {
    rate: '92%', avg: '₹7–12 LPA', highest: '92 LPA',
    companies: ['Google', 'Microsoft', 'Amazon', 'Goldman Sachs', 'Deloitte', 'EY', 'Infosys', 'Wipro', 'TCS', 'Accenture', 'Cognizant', 'HCL'],
    points: [
      '92%+ placement rate across engineering programs.',
      'Top recruiters: Google, Microsoft, Amazon, Goldman Sachs, Deloitte.',
      'Record-breaking highest package of 92 LPA; average 7–12 LPA.',
      '800+ recruiters visit campus annually.',
      'Strong internship culture with international exposure.',
      'Dedicated Career Centre with year-round training and mock interviews.',
      'Active startup incubation and entrepreneurship support.',
    ],
  },
  courses: ['Computer Science and Engineering (CSE)', 'AI & Machine Learning', 'Data Science', 'Cyber Security', 'Electronics and Communication Engineering', 'Mechanical Engineering', 'Biomedical Engineering', 'Civil Engineering', 'Biotechnology', 'Aerospace Engineering', 'Automobile Engineering', 'Chemical Engineering'],
  eligibility: ['10+2 with Physics, Chemistry and Mathematics from a recognized board', 'Valid SRMJEE score (Phase 1 or Phase 2) or JEE Main score', 'Management Quota seats available with direct admission', 'Minimum 50% aggregate in PCM'],
  stats: [['Top 10', 'NIRF Rank'], ['92 LPA', 'Highest Pkg'], ['800+', 'Recruiters'], ['50k+', 'Students']],
  reviews: [
    { name: 'Rohan Mehta', batch: 'CSE 2025', stars: 5, text: 'SRM Kattankulathur exceeded my expectations. The campus is massive, faculty is world-class, and placements are outstanding. Got placed at a top product company during campus drives.' },
    { name: 'Kavya Srinivasan', batch: 'Data Science 2025', stars: 5, text: 'SRM was my dream college and it lived up to it. The Data Science curriculum is industry-aligned and the research opportunities are excellent. Placement cell is phenomenal.' },
    { name: 'Aditya Sharma', batch: 'ECE 2024', stars: 5, text: 'Best decision of my life. SRM\'s global exposure, international collaborations, and 800+ recruiters make it a top choice. Highest package culture keeps students motivated.' },
    { name: 'Priyanka Raghavan', batch: 'AI&ML 2025', stars: 4, text: 'Excellent AI & ML program with strong industry connects. Campus life is vibrant with endless clubs and fests. Placement training was thorough and effective.' },
  ],
}

export const EXPERTISE = [
  { icon: '📚', title: 'Course Selection', desc: 'Match your aptitude to the right branch' },
  { icon: '🎯', title: 'Admission Guidance', desc: 'End-to-end support for KCET & COMEDK' },
  { icon: '📝', title: 'Entrance Exam Info', desc: 'Cutoffs, ranks & eligibility decoded' },
  { icon: '📋', title: 'Documentation Support', desc: 'Zero errors, zero rejections' },
]

export const TESTIMONIALS = [
  {
    name: 'Aditya Ranjan',
    college: 'RVCE – CSE 2025',
    text: 'I had a KCET rank of 1800 and was unsure if RVCE was possible. Kunal sir explained every option clearly — KCET counselling, document prep, everything. Got my admission confirmed in RVCE CSE within 10 days. Highly recommend Knowledge Park 360!',
    stars: 5,
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=face'
  },
  {
    name: 'Meghna Iyer',
    college: 'PES University – AI&ML 2025',
    text: 'I was confused between PES and SRM. The team sat with me and my parents, compared placements, fees, and campus life. Helped me pick PES AI&ML and handled the entire PESSAT counselling. Very transparent, no hidden charges.',
    stars: 5,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face'
  },
  {
    name: 'Rohan Mehta',
    college: 'SRM Chennai – CSE 2025',
    text: 'Got into SRM Kattankulathur CSE through management quota. The team handled everything from SRMJEE Phase 2 counselling to final fee payment. They were available on WhatsApp even at 10 PM. Really grateful for the smooth process.',
    stars: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face'
  },
  {
    name: 'Ananya Deshmukh',
    college: 'Jain University – BBA 2025',
    text: 'I wanted Jain University for BBA but had no idea about the admission process. Knowledge Park 360 guided me through JET registration, document verification, and seat confirmation. My parents were very impressed with their professionalism.',
    stars: 5,
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop&crop=face'
  },
  {
    name: 'Vishal Patil',
    college: 'BMSCE – ECE 2024',
    text: 'My COMEDK rank was 3500 and I was losing hope. Kunal sir showed me realistic options, helped me with COMEDK counselling rounds, and I ended up in BMSCE ECE. Saved around ₹1.5 lakh compared to what other consultancies were quoting.',
    stars: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face'
  },
  {
    name: 'Kavya Srinivasan',
    college: 'SRM Chennai – Data Science 2025',
    text: 'SRM was my dream college since 12th. The team made it happen — from SRMJEE preparation tips to final admission in Data Science branch. They were honest about fees and never made false promises. Thank you Knowledge Park 360!',
    stars: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face'
  },
  {
    name: 'Arjun Krishnan',
    college: 'MSRIT – Computer Science 2024',
    text: 'I approached 3 consultancies before Knowledge Park 360. The difference was night and day. They gave me a realistic college shortlist based on my rank, not just the most expensive option. Got MSRIT CSE and I couldn\'t be happier.',
    stars: 5,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face'
  },
]
