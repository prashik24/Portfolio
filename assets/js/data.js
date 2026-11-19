/**
 * =========================================================================
 * PRASHIK HUMANE - PORTFOLIO CONFIGURATION & DATA
 * =========================================================================
 * 
 * Edit this file to update any information across your entire portfolio website!
 * You don't need to touch the HTML or CSS to change text, projects, or links.
 * Everything is cleanly mapped here.
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
    statusText: "Open to Software Engineering Internships & Opportunities",
    tagline: "Engineering resilient full-stack systems, intelligent AI platforms, and algorithmic solutions with precision.",
    aboutShort: "Pre-final year Computer Science and Business undergraduate at IIIT Lucknow with strong algorithmic fundamentals and proven full-stack product building experience. CodeChef 4★ (1800 peak) and Codeforces Specialist (1572 max).",
    aboutFull: `I am a Computer Science & Business undergraduate at the Indian Institute of Information Technology (IIIT), Lucknow. My expertise bridges scalable web application architecture, real-time systems, and AI integration with high-level competitive programming rigor.
    
    With 575+ algorithmic problems solved and 2,000+ active GitHub contributions, I build software that is both architecturally sound and performance-optimized. I have designed end-to-end platforms ranging from AI-powered travel planners (integrating Gemini AI and FastAPI microservices) to secure e-commerce systems with role-based access control and payment gateways.`,
    
    // Social & Profile Links
    socials: {
      github: "https://github.com/prashik24",
      linkedin: "https://linkedin.com/in/prashik-humane",
      email: "mailto:prashikhumane744@gmail.com",
      phone: "tel:+918262049540",
      leetcode: "https://leetcode.com/u/prashik24",
      codechef: "https://www.codechef.com/users/prashik24",
      codeforces: "https://codeforces.com/profile/prashik24"
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
  // 3. TECHNICAL SKILLS
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
  // 4. PROJECTS
  // -----------------------------------------------------------------------
  projects: [
    {
      id: "ontrip",
      title: "OnTrip – AI Travel Planning Platform",
      category: "ai-fullstack",
      categoryLabel: "AI / ML & Full Stack",
      featured: true,
      image: "assets/images/ontrip-preview.svg",
      shortDescription: "An intelligent travel operating system featuring dynamic Gemini AI multi-day itinerary generation, real-time Socket.io collaborative messaging, and a zero-downtime hybrid ML recommendation pipeline.",
      technologies: ["React 19", "Node.js", "Express", "MongoDB", "Socket.io", "Gemini AI", "FastAPI", "Scikit-learn", "Razorpay"],
      highlights: [
        "Automated multi-day itinerary generation utilizing Google Gemini AI, seamlessly combining interactive route maps and dynamic real-time budget forecasting.",
        "Built bidirectional real-time host and traveler chat using Socket.io alongside an interactive social community feed for bookmarking itineraries.",
        "Integrated Razorpay payment gateway, automated client-side jsPDF invoice rendering, and Node-Cron automated itinerary reminder notifications.",
        "Hardened system security with Google OAuth 2.0, Brevo OTP verification, HTTP-only JWT sessions, and Express role-based access control (RBAC).",
        "Engineered a resilient hybrid recommendation pipeline using FastAPI and Scikit-learn (TF-IDF & Cosine Similarity) with automatic Node.js vector fallback ensuring 100% uptime."
      ],
      links: {
        github: "https://github.com/prashik24/ontrip",
        demo: "https://github.com/prashik24/ontrip" // Replace with live URL if deployed
      },
      stats: {
        aiModel: "Google Gemini 1.5",
        latency: "<150ms recommendation response",
        security: "HTTP-Only JWT + RBAC"
      }
    },
    {
      id: "shopkart",
      title: "ShopKart – Full-Stack E-Commerce Platform",
      category: "fullstack",
      categoryLabel: "Full-Stack Web & Payments",
      featured: true,
      image: "assets/images/shopkart-preview.svg",
      shortDescription: "A high-performance modern e-commerce platform engineered with persistent cart state, Brevo OTP auth, complete admin inventory management, and client-side caching.",
      technologies: ["React 19", "Node.js", "Express", "MongoDB Atlas", "Razorpay", "JWT", "Bcrypt", "Brevo"],
      highlights: [
        "Architected complete e-commerce experience with multi-parameter catalog filtering, persistent cart state across reloads, and dynamic order progress pipelines.",
        "Implemented ironclad authentication pipeline incorporating Brevo email OTP verification, bcrypt password hashing, and role-separated JWT cookie sessions.",
        "Developed full-featured administrative console for complete product inventory CRUD operations, live order status updates, and audit payment logs.",
        "Engineered smart client-side localStorage caching architecture with a 10-minute TTL, eliminating redundant database roundtrips and accelerating page transitions."
      ],
      links: {
        github: "https://github.com/prashik24/shopkart",
        demo: "https://github.com/prashik24/shopkart" // Replace with live URL if deployed
      },
      stats: {
        cachingTTL: "10-minute client cache",
        security: "Bcrypt + Brevo OTP",
        payments: "Razorpay Checkout"
      }
    }
  ],

  // -----------------------------------------------------------------------
  // 5. ACHIEVEMENTS & COMPETITIVE PROGRAMMING
  // -----------------------------------------------------------------------
  achievements: [
    {
      platform: "CodeChef",
      title: "CodeChef 4★ (Four Star)",
      badge: "4★ 1800 Peak",
      rating: "Peak Rating: 1800",
      description: "Consistent high-ranking performer in rated Division 2 contests solving advanced algorithmic problems.",
      icon: "star",
      url: "https://www.codechef.com/users/prashik24",
      accent: "#f59e0b"
    },
    {
      platform: "Codeforces",
      title: "Codeforces Specialist",
      badge: "Specialist 1572 Max",
      rating: "Max Rating: 1572",
      description: "Competed in high-intensity global rounds solving intricate combinatorics, dynamic programming, and greedy algorithms.",
      icon: "zap",
      url: "https://codeforces.com/profile/prashik24",
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
