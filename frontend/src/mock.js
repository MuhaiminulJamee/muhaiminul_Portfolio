// Mock data for Md. Muhaiminul Islam's Portfolio
export const personalInfo = {
  name: "Md. Muhaiminul Islam",
  title: "Researcher | ML & Robotics Enthusiast | Full-Stack Developer",
  location: "Rajshahi, Bangladesh",
  email: "muhaiminul@example.com",
  phone: "+880 123 456 7890",
  linkedin: "https://linkedin.com/in/muhaiminul-islam",
  github: "https://github.com/muhaiminul",
  bio: "Passionate researcher specializing in Machine Learning, Artificial Intelligence, Deep Learning, and Computer Vision with extensive experience in robotics and telecommunication engineering. Currently pursuing B.Sc. in Electronics & Telecommunication Engineering while working as Full-Stack Developer."
};

export const skills = [
  { category: "Programming", items: ["Python", "C++", "C", "JavaScript", "MATLAB"], level: 90 },
  { category: "ML/AI Frameworks", items: ["TensorFlow", "Keras", "Scikit-Learn", "OpenCV", "NumPy", "Pandas"], level: 95 },
  { category: "Web Development", items: ["Django", "FastAPI", "React", "HTML/CSS", "REST APIs"], level: 85 },
  { category: "Robotics & IoT", items: ["Arduino", "ROS", "SLAM", "IoT Integration", "Embedded Systems"], level: 90 },
  { category: "Tools & Software", items: ["AutoCAD", "Fusion 360", "CARLA", "Multisim", "Adobe Creative Suite"], level: 80 },
  { category: "Specializations", items: ["Computer Vision", "Deep Learning", "Neural Networks", "Image Processing"], level: 95 }
];

export const experience = [
  {
    id: 1,
    company: "ZeroxaDT",
    position: "Operational Manager & Full-Stack Web Developer",
    duration: "2025 – Present",
    description: "Led development of scalable full-stack web applications using Python, Django, FastAPI. Managed cross-functional development teams and conducted strategic meetings with executives and public sector stakeholders.",
    technologies: ["Python", "Django", "FastAPI", "JavaScript", "Team Management"]
  },
  {
    id: 2,
    company: "RUET - Dept. of Electronics & Telecommunication",
    position: "Undergraduate Research Assistant",
    duration: "2023 – Present",
    description: "Engaged in cutting-edge research on Electronics, Communication, Robotics, Machine Learning, and Deep Learning. Published multiple high-quality research papers in top conferences and journals.",
    technologies: ["Machine Learning", "Deep Learning", "Computer Vision", "Research", "Publications"]
  },
  {
    id: 3,
    company: "Astronomy and Science Society of RUET",
    position: "Research and Planning Secretary",
    duration: "2023 – 2024",
    description: "Led research initiatives and strategic planning. Organized workshops on Astronomy, Robotics, IoT, and STEM education. Managed annual budgets and coordinated science festivals and Olympiads.",
    technologies: ["Project Management", "STEM Education", "Workshop Organization"]
  },
  {
    id: 4,
    company: "Tech Topia",
    position: "Intern & Tech Envoy",
    duration: "2022 – 2023",
    description: "Developed structured courses on Robotics, IoT, Electronics. Designed and simulated electronic circuits and implemented communication protocols such as I2C, MQTT, and LoRa.",
    technologies: ["Robotics", "IoT", "Electronics", "Circuit Design", "Communication Protocols"]
  }
];

export const education = [
  {
    institution: "Rajshahi University of Engineering & Technology (RUET)",
    degree: "B.Sc. Engineering in Electronics and Telecommunication Engineering",
    duration: "2020-2025",
    gpa: "Ongoing",
    description: "Comprehensive study in Electronics, Telecommunications, Signal Processing, and Communication Systems."
  },
  {
    institution: "Dhaka Residential Model College",
    degree: "Higher Secondary School Certificate",
    duration: "2019",
    gpa: "5.00/5.00",
    description: "Science background with focus on Mathematics, Physics, and Chemistry."
  }
];

export const projects = [
  {
    id: 1,
    title: "Smart Waste Management Robot",
    description: "Integrating IoT, AI, SLAM, and CNN-Based Advanced Image Processing for Real-Time Trash Collection and Categorization",
    technologies: ["IoT", "AI", "SLAM", "CNN", "Image Processing", "Robotics"],
    status: "Published - ICCIT 2024",
    image: "/api/placeholder/600/400"
  },
  {
    id: 2,
    title: "AI Based Smart Notice Board",
    description: "Advanced Machine Learning and Image Processing Techniques for intelligent information display and management",
    technologies: ["Machine Learning", "Image Processing", "Computer Vision", "IoT"],
    status: "Published - ICAEE 2024",
    image: "/api/placeholder/600/400"
  },
  {
    id: 3,
    title: "CNN and IoT Based Military Detection Drone",
    description: "Real-time CNN implementation on drones with IoT integration for border surveillance applications",
    technologies: ["CNN", "IoT", "Drone Technology", "Computer Vision", "Security Systems"],
    status: "Published - ICCIT 2023",
    image: "/api/placeholder/600/400"
  },
  {
    id: 4,
    title: "Land Mine and Human Detection Robot",
    description: "IoT and GPS-GSM Based Real-Time Automated Data Monitoring with Image Processing and Live Streaming",
    technologies: ["IoT", "GPS-GSM", "Image Processing", "Live Streaming", "Safety Systems"],
    status: "Published - ICCECE 2024",
    image: "/api/placeholder/600/400"
  },
  {
    id: 5,
    title: "CNN Based Autonomous Self-Driving Car",
    description: "Deep learning implementation for autonomous navigation with real-time decision making capabilities",
    technologies: ["CNN", "Autonomous Systems", "Computer Vision", "CARLA Simulator"],
    status: "Development",
    image: "/api/placeholder/600/400"
  },
  {
    id: 6,
    title: "5G mmWave Communication Analysis",
    description: "Design and Analysis of 5G mmWave Backhaul Communication Channels with Human Obstruction Considerations",
    technologies: ["5G", "mmWave", "Communication Systems", "Signal Processing"],
    status: "Published - PEEIACON 2024",
    image: "/api/placeholder/600/400"
  }
];

export const publications = [
  {
    title: "Smart Waste Management Robot: Integrating IoT, Artificial Intelligence, SLAM, and CNN-Based Advanced Image Processing for Real-Time Trash Collection and Categorization",
    conference: "ICCIT 2024",
    doi: "10.1109/ICCIT64611.2024.11022551",
    year: 2024
  },
  {
    title: "The Design and Implementation of AI Based Smart Notice Board Using Advanced Machine Learning and Image Processing Techniques",
    conference: "ICAEE 2024",
    doi: "10.1109/ICAEEE62219.2024.10561793",
    year: 2024
  },
  {
    title: "The Design and Analysis of 5G mmWave Backhaul Communication Channels with Human Obstruction and Blockage Considerations",
    conference: "PEEIACON 2024",
    doi: "10.1109/PEEIACON63629.2024.10800607",
    year: 2024
  },
  {
    title: "An Advanced IoT and GPS-GSM Based Real-Time Automated Data Monitoring Robot with Image Processing and Live Streaming for Human Life and Land Mine Detection Systems",
    conference: "ICCECE 2024",
    doi: "10.1109/ICCECE58645.2024.10497277",
    year: 2024
  },
  {
    title: "Smart Border Surveillance: Real-time CNN on Drones with IoT Integration",
    conference: "ICCIT 2023",
    doi: "10.1109/ICCIT60459.2023.10441471",
    year: 2023
  },
  {
    title: "Enhancing Regenerative Braking Efficiency in Electric Vehicles: An Advanced Fuzzy Logic-Based Control Strategy",
    conference: "WIECON-ECE 2023",
    doi: "10.1109/WIECON-ECE60392.2023.10456493",
    year: 2023
  }
];

export const awards = [
  {
    title: "Technical Scholarship by University Grants Commission",
    organization: "Bangladesh Dept. of ETE, RUET",
    years: ["2024", "2023", "2022", "2021"],
    category: "Academic Excellence"
  },
  {
    title: "Technical Award Winner (International)",
    organization: "International Robot Olympiad",
    years: ["2020"],
    category: "Robotics",
    participants: "30+ Countries"
  },
  {
    title: "Bronze Medalist",
    organization: "Bangladesh Robot Olympiad",
    years: ["2020"],
    category: "Robotics",
    participants: "1200+ Students"
  },
  {
    title: "National Champion",
    organization: "CISCO IoT Hackathon",
    years: ["2018"],
    category: "IoT Development",
    participants: "30+ Colleges & Universities"
  },
  {
    title: "Divisional Champion & Best Meritorious Student Award",
    organization: "Creative Talent Hunt Competition, People's Republic of Bangladesh",
    years: ["2018", "2016", "2015"],
    category: "Mathematics, Science and Technology",
    participants: "1500+ Students"
  },
  {
    title: "National Champion",
    organization: "National High School Programming Contest, Bangladesh",
    years: ["2017", "2015"],
    category: "Programming",
    participants: "2000+ Students"
  }
];

export const certifications = [
  {
    title: "ML Developers Bootcamp",
    issuer: "UNDP & Future Nation",
    year: "2025",
    status: "Ongoing"
  },
  {
    title: "Machine Learning Specialization",
    issuer: "Coursera",
    year: "2024",
    status: "Ongoing"
  },
  {
    title: "Deep Learning Specialization",
    issuer: "Coursera",
    year: "2024",
    status: "Ongoing"
  },
  {
    title: "Full Stack Web Development with Python, Django & React",
    issuer: "Ostad",
    year: "2024",
    status: "Ongoing"
  },
  {
    title: "IBM AI Engineering Professional Certificate",
    issuer: "Coursera",
    year: "2024",
    status: "Ongoing"
  },
  {
    title: "Machine Learning & Data Science Bootcamp",
    issuer: "Code Studio Academy",
    year: "2023",
    status: "Completed"
  }
];

export const researchInterests = [
  "Machine Learning",
  "Artificial Intelligence",
  "Deep Learning",
  "Computer Vision",
  "Robotics",
  "IoT (Internet of Things)",
  "Neural Networks",
  "Data Science",
  "Communication Engineering",
  "Network Engineering",
  "Embedded Systems",
  "Signal Processing"
];

export const blogs = [
  {
    id: 1,
    title: "Advanced SLAM Techniques in Autonomous Robotics",
    excerpt: "Exploring cutting-edge Simultaneous Localization and Mapping algorithms for mobile robots in dynamic environments.",
    date: "2024-12-15",
    readTime: "8 min read",
    tags: ["SLAM", "Robotics", "Computer Vision"]
  },
  {
    id: 2,
    title: "Computer Vision in IoT: Real-world Applications",
    excerpt: "How computer vision technologies are revolutionizing IoT applications in smart cities and industrial automation.",
    date: "2024-11-28",
    readTime: "12 min read",
    tags: ["Computer Vision", "IoT", "Smart Cities"]
  },
  {
    id: 3,
    title: "5G mmWave Communication Challenges and Solutions",
    excerpt: "Deep dive into the technical challenges of 5G millimeter wave communications and innovative solution approaches.",
    date: "2024-10-20",
    readTime: "15 min read",
    tags: ["5G", "Communications", "Signal Processing"]
  }
];

export const testimonials = [
  {
    name: "Dr. Md. Rakib Hossain",
    position: "Assistant Professor, Dept. of ETE, RUET",
    text: "Muhaiminul is an exceptional researcher with remarkable analytical skills. His contributions to our research projects have been outstanding, particularly in machine learning and robotics applications.",
    image: "/api/placeholder/100/100"
  },
  {
    name: "Prof. Farzana Akter",
    position: "Assistant Professor, Dept. of ETE, RUET",
    text: "His dedication to research and innovation is truly inspiring. Muhaiminul consistently delivers high-quality work and has published several impactful papers in top-tier conferences.",
    image: "/api/placeholder/100/100"
  }
];

export const gallery = [
  {
    id: 1,
    title: "Smart Waste Management Robot in Action",
    category: "Robotics",
    image: "/api/placeholder/400/300"
  },
  {
    id: 2,
    title: "AI-Powered Notice Board System",
    category: "AI/ML",
    image: "/api/placeholder/400/300"
  },
  {
    id: 3,
    title: "Research Lab Setup",
    category: "Research",
    image: "/api/placeholder/400/300"
  },
  {
    id: 4,
    title: "Award Ceremony - Robot Olympiad",
    category: "Awards",
    image: "/api/placeholder/400/300"
  },
  {
    id: 5,
    title: "Conference Presentation - ICCIT 2024",
    category: "Conferences",
    image: "/api/placeholder/400/300"
  },
  {
    id: 6,
    title: "Team Collaboration",
    category: "Teamwork",
    image: "/api/placeholder/400/300"
  }
];