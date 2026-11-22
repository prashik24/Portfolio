/**
 * =========================================================================
 * PRASHIK HUMANE - PORTFOLIO CONFIGURATION & DATA
 * =========================================================================
 * 
 * Edit this file to update any information across your entire portfolio website!
 * You don't need to touch HTML or CSS to change text, projects, or links.
 */

const portfolioData = {
  // -----------------------------------------------------------------------
  // 1. PERSONAL INFORMATION
  // -----------------------------------------------------------------------
  personal: {
    name: "Prashik Humane",
    pronouns: "He/Him",
    role: "Full-Stack Software Engineer & Competitive Programmer",
    currentInstitution: "Indian Institute of Information Technology (IIIT), Lucknow",
    degree: "B.Tech in Computer Science & Business (2023 - 2027)",
    cgpa: "8.0",
    location: "Lucknow, India",
    email: "prashikhumane744@gmail.com",
    phone: "+91-8262049540",
    availableForHire: true,
    statusText: "Final Year Undergrad • Open to Full-Time Software Engineering Roles & Opportunities",
    tagline: "Engineering resilient full-stack systems, intelligent AI platforms, and algorithmic solutions with precision.",
    aboutShort: "Final year Computer Science and Business undergraduate at IIIT Lucknow with strong algorithmic fundamentals and proven full-stack product building experience. CodeChef 4★ (1800 peak) and Codeforces Specialist (1572 max).",
    aboutFull: `I am a Computer Science & Business undergraduate at the Indian Institute of Information Technology (IIIT), Lucknow. My expertise bridges scalable web application architecture, real-time systems, and AI integration with high-level competitive programming rigor.
    
    With 575+ algorithmic problems solved and 2,000+ active GitHub contributions, I build software that is both architecturally sound and performance-optimized. I have designed end-to-end platforms ranging from AI-powered travel planners (integrating Gemini AI and FastAPI microservices) to secure e-commerce systems with role-based access control and payment gateways.`,
    
    resumePdfPath: "assets/resume.pdf",

    // Social & Profile Links
    socials: {
      portfolio: "https://prashik-portfolio.onrender.com",
      github: "https://github.com/prashik24",
      linkedin: "https://linkedin.com/in/prashik-humane",
      email: "mailto:prashikhumane744@gmail.com",
      phone: "tel:+918262049540",
      leetcode: "https://leetcode.com/u/prashik24",
      codechef: "https://www.codechef.com/users/whyitsme",
      codeforces: "https://codeforces.com/profile/whyitsme"
    }
  },

  // -----------------------------------------------------------------------
  // 2. KEY METRICS & STATS
  // -----------------------------------------------------------------------
  stats: [
    { label: "CodeChef Rating", value: "1800", subtitle: "4★ Star Coder", highlight: true, icon: "star" },
    { label: "Codeforces Rating", value: "1572", subtitle: "Specialist Rank", highlight: true, icon: "trophy" },
    { label: "Problems Solved", value: "575+", subtitle: "Across Top Platforms", highlight: false, icon: "code" },
    { label: "GitHub Activity", value: "2000+", subtitle: "Annual Contributions", highlight: false, icon: "git-commit" },
    { label: "Official Contests", value: "50+", subtitle: "Competitive Matches", highlight: false, icon: "award" },
    { label: "Current CGPA", value: "8.0", subtitle: "IIIT Lucknow (B.Tech)", highlight: false, icon: "book-open" }
  ],

  // -----------------------------------------------------------------------
  // 3. FEATURED PROJECTS (Main projects OnTrip & ShopKart prioritized at top)
  // -----------------------------------------------------------------------
  projects: [
    {
      id: "ontrip",
      title: "OnTrip – AI Travel Planning Platform",
      category: "fullstack",
      categoryLabel: "AI / ML & Full Stack",
      featured: true,
      image: "assets/images/ontrip.png",
      shortDescription: "An AI-powered travel operating system that helps users plan multi-day trips, discover destinations, join travel communities, find travel buddies, connect with travel planners, and book trips & vehicles with real-time Socket.io messaging.",
      technologies: ["React 19", "Node.js", "Express", "MongoDB", "Socket.io", "Gemini AI", "FastAPI", "Scikit-learn", "Razorpay"],
      deployment: {
        platform: "Render",
        status: "Live",
        liveUrl: "https://ontrip-frontend.onrender.com/"
      },
      highlights: [
        "Automated multi-day itinerary generation using Google Gemini AI, integrating route maps, dynamic cost estimates, and automated trip vehicle bookings.",
        "Enabled bidirectional real-time host messaging via Socket.io and built a social community feed for finding travel buddies and bookmarking trips.",
        "Integrated Razorpay checkout, automated jsPDF invoice generation, and scheduled Node-Cron trip alerts.",
        "Enforced authentication via Google OAuth 2.0, Brevo OTP verification, HTTP-only JWT cookies, and Express RBAC.",
        "Engineered a hybrid recommendation pipeline via FastAPI and Scikit-learn (TF-IDF, Cosine Similarity) with a resilient Node.js native vector fallback to guarantee zero downtime."
      ],
      links: {
        github: "https://github.com/prashik24/ontrip",
        demo: "https://ontrip-frontend.onrender.com/"
      },
      stats: {
        aiEngine: "Google Gemini 1.5",
        realtime: "Socket.io WebSockets",
        security: "HTTP-Only JWT + RBAC",
        mlPipeline: "FastAPI + Cosine Sim"
      }
    },
    {
      id: "shopkart",
      title: "ShopKart – Full-Stack E-Commerce Platform",
      category: "fullstack",
      categoryLabel: "Full-Stack Web & Payments",
      featured: true,
      image: "assets/images/shopkart.jpg",
      shortDescription: "Production-grade e-commerce application engineered with catalog filtering, persistent cart state, Brevo OTP auth, complete admin inventory management, and client-side caching.",
      technologies: ["React 19", "Node.js", "Express", "MongoDB Atlas", "Razorpay", "JWT", "Bcrypt", "Brevo"],
      deployment: {
        platform: "Render",
        status: "Live",
        liveUrl: "https://shopkart-fontent.onrender.com/"
      },
      highlights: [
        "Engineered an e-commerce platform with catalog filters, persistent cart state, and order progress bars.",
        "Implemented user authentication with Brevo email OTPs, bcrypt hashing, and role-separated JWT cookie sessions.",
        "Built an admin dashboard for full product inventory CRUD operations, order status updates, and payment logs.",
        "Integrated client-side localStorage caching with a 10-minute TTL to reduce redundant database queries."
      ],
      links: {
        github: "https://github.com/prashik24/ShopKart",
        demo: "https://shopkart-fontent.onrender.com/"
      },
      stats: {
        cacheTTL: "10-min Client TTL",
        auth: "Brevo OTP + Bcrypt",
        payments: "Razorpay Checkout",
        admin: "Full Inventory CRUD"
      }
    },
    {
      id: "calendar",
      title: "Interactive Wall Calendar Component",
      category: "frontend",
      categoryLabel: "Next.js & UI Components",
      featured: false,
      image: "assets/images/calendar.jpg",
      shortDescription: "A visually rich, responsive wall calendar component inspired by real-world design, featuring intuitive date range selection, persistent notes, and polished UI interactions built with Next.js.",
      technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "LocalStorage"],
      deployment: {
        platform: "Render",
        status: "Live",
        liveUrl: "https://calendar-wkay.onrender.com/"
      },
      highlights: [
        "Crafted a visually rich wall calendar component with real-world physical design aesthetics and fluid micro-interactions.",
        "Implemented multi-day intuitive date range selection and dynamic month/year switching algorithms.",
        "Built persistent client-side note storage per date using modern reactive state management.",
        "Optimized for high performance and zero cumulative layout shift (CLS) using Next.js."
      ],
      links: {
        github: "https://github.com/prashik24/Calendar",
        demo: "https://calendar-wkay.onrender.com/"
      },
      stats: {
        framework: "Next.js & React",
        styling: "Tailwind CSS & Glassmorphism",
        state: "Persistent Notes State",
        deploy: "Render Web Service"
      }
    },
    {
      id: "amazon",
      title: "Amazon Homepage Clone",
      category: "frontend",
      categoryLabel: "Frontend & Pure JS",
      featured: false,
      image: "assets/images/amazon.jpg",
      shortDescription: "A responsive front-end replica of the Amazon e-commerce homepage crafted with pure HTML5, CSS3, and JavaScript, focusing on multi-tier sticky navigation, banner carousels, and responsive layouts.",
      technologies: ["HTML5", "CSS3", "JavaScript (ES6+)", "Responsive Grid", "CSS Flexbox"],
      deployment: {
        platform: "GitHub Pages",
        status: "Live",
        liveUrl: "https://prashik24.github.io/Amazon/"
      },
      highlights: [
        "Replicated the look and feel of the Amazon homepage with high visual fidelity without external UI libraries.",
        "Designed complex multi-tier responsive header, department dropdowns, and search bar layout.",
        "Engineered smooth banner sliders and fluid responsive CSS Grid product category tiles.",
        "Achieved fast initial load times and seamless cross-browser compatibility across mobile and desktop."
      ],
      links: {
        github: "https://github.com/prashik24/Amazon",
        demo: "https://prashik24.github.io/Amazon/"
      },
      stats: {
        stack: "Pure HTML5 / CSS3 / JS",
        architecture: "Zero-dependency Frontend",
        layout: "CSS Grid & Flexbox",
        host: "GitHub Pages Live"
      }
    }
  ],

  // -----------------------------------------------------------------------
  // 4. ACHIEVEMENTS & COMPETITIVE PROGRAMMING
  // -----------------------------------------------------------------------
  achievements: [
    {
      platform: "CodeChef",
      title: "CodeChef 4★ (Four Star)",
      badge: "4★ 1800 Peak",
      rating: "Peak Rating: 1800",
      description: "Consistent high-ranking performer in rated Division 2 contests solving advanced algorithmic problems.",
      icon: "star",
      url: "https://www.codechef.com/users/whyitsme",
      accent: "#f59e0b"
    },
    {
      platform: "Codeforces",
      title: "Codeforces Specialist",
      badge: "Specialist 1572 Max",
      rating: "Max Rating: 1572",
      description: "Competed in high-intensity global rounds solving intricate combinatorics, dynamic programming, and greedy algorithms.",
      icon: "zap",
      url: "https://codeforces.com/profile/whyitsme",
      accent: "#06b6d4"
    },
    {
      platform: "LeetCode",
      title: "LeetCode Active Contestant",
      badge: "1491 Max Rating",
      rating: "Max Rating: 1491",
      description: "Solved hundreds of Data Structures & Algorithms problems across graphs, trees, DP, and system concurrency.",
      icon: "award",
      url: "https://leetcode.com/u/prashik24",
      accent: "#eab308"
    },
    {
      platform: "GitHub",
      title: "2,000+ Contributions",
      badge: "Consistent Builder",
      rating: "2000+ commits / PRs",
      description: "Maintained active daily development consistency, building open-source projects, APIs, and microservices.",
      icon: "git-commit",
      url: "https://github.com/prashik24",
      accent: "#10b981"
    },
    {
      platform: "Adobe",
      title: "Adobe University Hackathon",
      badge: "Round 1 Qualified",
      rating: "MCQ + Coding OA Cleared",
      description: "Selected among thousands of nationwide participants by clearing the rigorous Adobe technical assessment.",
      icon: "shield-check",
      url: "https://github.com/prashik24",
      accent: "#ef4444"
    },
    {
      platform: "AlgoUniversity",
      title: "Advanced Graphs Certification",
      badge: "Certified",
      rating: "Module Mastery",
      description: "Completed intensive specialized training on advanced graph theory, network flows, shortest path algorithms, and DSU.",
      icon: "check-circle",
      url: "https://github.com/prashik24",
      accent: "#8b5cf6"
    }
  ],

  // -----------------------------------------------------------------------
  // 5. TECHNICAL SKILLS
  // -----------------------------------------------------------------------
  skills: {
    categories: [
      {
        id: "languages",
        title: "Programming Languages",
        icon: "terminal",
        items: [
          { name: "C++", level: "Advanced", tag: "DSA & CP" },
          { name: "JavaScript (ES6+)", level: "Advanced", tag: "Full-Stack" },
          { name: "TypeScript", level: "Proficient", tag: "Type-Safe Web" },
          { name: "Python", level: "Proficient", tag: "ML & Backend" },
          { name: "SQL", level: "Proficient", tag: "Relational DB" },
          { name: "HTML5 / CSS3", level: "Advanced", tag: "Frontend" }
        ]
      },
      {
        id: "frameworks",
        title: "Frameworks & Libraries",
        icon: "layers",
        items: [
          { name: "React 19", level: "Advanced", tag: "Frontend UI" },
          { name: "Next.js", level: "Proficient", tag: "Full-Stack / SSR" },
          { name: "Node.js", level: "Advanced", tag: "Runtime" },
          { name: "Express.js", level: "Advanced", tag: "REST APIs" },
          { name: "FastAPI", level: "Proficient", tag: "Microservices" },
          { name: "Scikit-learn", level: "Proficient", tag: "ML & Vectors" },
          { name: "Socket.io", level: "Proficient", tag: "Real-time Web" },
          { name: "Vite", level: "Proficient", tag: "Build Tooling" }
        ]
      },
      {
        id: "databases_devops",
        title: "Databases, Cloud & DevOps",
        icon: "database",
        items: [
          { name: "MongoDB / Atlas", level: "Advanced", tag: "NoSQL" },
          { name: "MySQL", level: "Proficient", tag: "RDBMS" },
          { name: "Docker", level: "Working", tag: "Containerization" },
          { name: "Git & GitHub", level: "Advanced", tag: "Version Control" },
          { name: "Postman", level: "Advanced", tag: "API Testing" },
          { name: "Render", level: "Proficient", tag: "Cloud Deployment" }
        ]
      },
      {
        id: "core_concepts",
        title: "Core CS Fundamentals",
        icon: "cpu",
        items: [
          { name: "Data Structures & Algorithms", level: "Advanced", tag: "575+ Solved" },
          { name: "Object-Oriented Programming (OOP)", level: "Advanced", tag: "Clean Architecture" },
          { name: "Database Management Systems (DBMS)", level: "Advanced", tag: "ACID, Indexing" },
          { name: "Operating Systems (OS)", level: "Proficient", tag: "Concurrency, Memory" },
          { name: "JWT & Security Protocols", level: "Advanced", tag: "RBAC, HTTP-only" },
          { name: "Machine Learning Concepts", level: "Proficient", tag: "TF-IDF, Vectors" }
        ]
      }
    ]
  },

  // -----------------------------------------------------------------------
  // 6. EDUCATION
  // -----------------------------------------------------------------------
  education: [
    {
      institution: "Indian Institute of Information Technology (IIIT), Lucknow",
      degree: "B.Tech in Computer Science and Business",
      period: "2023 – 2027",
      score: "CGPA: 8.0",
      location: "Lucknow, India",
      details: [
        "Core coursework: Data Structures, Analysis of Algorithms, DBMS, Operating Systems, Computer Networks, Software Engineering, Business Analytics.",
        "Active member of student leadership organizations and technical societies."
      ],
      current: true
    },
    {
      institution: "St. Peter’s School",
      degree: "Higher Secondary Certificate (HSC – Maharashtra State Board)",
      period: "2022",
      score: "Score: 94.5%",
      location: "Nagpur, India",
      details: [
        "Major in Science stream (Physics, Chemistry, Mathematics, Computer Science).",
        "Graduated in the top percentile of the state board."
      ],
      current: false
    },
    {
      institution: "Sunny’s Spring Dale School",
      degree: "Secondary School Examination (CBSE Class X)",
      period: "2020",
      score: "Score: 90.0%",
      location: "Bhandara, India",
      details: [
        "Exemplary performance across Mathematics, Science, and Social Sciences."
      ],
      current: false
    }
  ],

  // -----------------------------------------------------------------------
  // 7. POSITIONS OF RESPONSIBILITY & LEADERSHIP
  // -----------------------------------------------------------------------
  responsibilities: [
    {
      role: "Senior Member",
      organization: "Crotonia Literary Society",
      institution: "IIIT Lucknow",
      period: "2024 – Present",
      points: [
        "Spearheaded inter-college literary summits and flagship university debates engaging 200+ participants.",
        "Organized public speaking sessions, moderated high-stakes debate rounds, and managed cross-functional event logistics."
      ]
    },
    {
      role: "Core Member",
      organization: "Entrepreneurship Cell (E-Cell)",
      institution: "IIIT Lucknow",
      period: "2023 – Present",
      points: [
        "Coordinated technical entrepreneurship workshops, speaker sessions with industry founders, and startup pitch events hosting 150+ attendees.",
        "Facilitated mentorship programs connecting budding student entrepreneurs with technical and venture advisors."
      ]
    }
  ]
};

// Export for module systems or attach to window for static HTML consumption
if (typeof module !== 'undefined' && module.exports) {
  module.exports = portfolioData;
} else if (typeof window !== 'undefined') {
  window.portfolioData = portfolioData;
}
