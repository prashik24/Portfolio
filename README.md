# 🚀 Prashik Humane — Personal Developer Portfolio

> A modern, high-performance, responsive portfolio website built with clean semantic architecture, dark/light theme support, glassmorphism UI, centralized data management, and direct integration with your original uploaded resume.

---

## ✨ Features & Architecture

- **Decoupled Data Architecture**: All content (personal bio, metrics, projects, skills, achievements, education, and social links) is stored in a single, well-documented file: [`assets/js/data.js`](assets/js/data.js). You never need to touch HTML or CSS to add or update content!
- **Prioritized Live Project Showcase**:
  - 🥇 **OnTrip – AI Travel Planning Platform** (Main Featured Project):
    - **Live App**: [https://ontrip-frontend.onrender.com/](https://ontrip-frontend.onrender.com/)
    - **GitHub**: [https://github.com/prashik24/ontrip](https://github.com/prashik24/ontrip)
    - Full-stack AI travel planner with Gemini AI itinerary generation, real-time Socket.io chat, FastAPI & Scikit-learn recommendation engine, Razorpay checkout, and Express RBAC.
  - 🥈 **ShopKart – Full-Stack E-Commerce Platform** (Main Featured Project):
    - **Live App**: [https://shopkart-fontent.onrender.com/](https://shopkart-fontent.onrender.com/)
    - **GitHub**: [https://github.com/prashik24/ShopKart](https://github.com/prashik24/ShopKart)
    - Complete e-commerce store with Brevo OTP auth, persistent cart state, order tracking, admin inventory CRUD dashboard, and client-side caching.
  - 🥉 **Interactive Wall Calendar Component**:
    - **Live App**: [https://calendar-wkay.onrender.com/](https://calendar-wkay.onrender.com/)
    - **GitHub**: [https://github.com/prashik24/Calendar](https://github.com/prashik24/Calendar)
    - Responsive real-world wall calendar component with date range selection and persistent notes built with Next.js.
  - 🏅 **Amazon Homepage Clone**:
    - **Live App**: [https://prashik24.github.io/Amazon/](https://prashik24.github.io/Amazon/)
    - **GitHub**: [https://github.com/prashik24/Amazon](https://github.com/prashik24/Amazon)
    - Pure HTML5, CSS3, and JavaScript front-end replica of Amazon's homepage with responsive grid and multi-tier navigation.
- **Competitive Programming & Metrics Showcase**:
  - Visual badges for **CodeChef 4★ (1800 Peak)**, **Codeforces Specialist (1572 Max)**, **LeetCode (1491)**, **Adobe Hackathon**, and **AlgoUniversity**.
- **Original Resume Integration**:
  - Your uploaded resume is located at [`assets/resume.pdf`](assets/resume.pdf).
  - Anyone clicking "Resume" can view the formatted resume, **download the original PDF directly**, or open it in a new tab.
  - **To update your resume anytime**: Just replace [`assets/resume.pdf`](assets/resume.pdf) with your latest PDF!
- **Dual-Track Timeline**: Education at **IIIT Lucknow (B.Tech CS & Business - CGPA 8.0)** alongside leadership in **Crotonia Literary Society** and **E-Cell IIIT Lucknow**.
- **Interactive Contact Suite**:
  - One-click copy for email and phone numbers with animated toast notifications.
  - Integrated contact form with validation and direct email client dispatch.
- **Dark & Light Mode**: Smooth theme toggling with persistent user preference in `localStorage`.
- **Zero-Dependency Local Server**: Built-in native Node.js HTTP server for instant previewing.

---

## 📁 Project Structure

```text
portfolio/
├── index.html                 # Semantic, SEO-optimized markup & layout
├── server.js                  # Zero-dependency local Node.js server
├── package.json               # NPM scripts configuration
├── README.md                  # Documentation & deployment guide
└── assets/
    ├── resume.pdf             # 📄 Your original uploaded resume PDF (replaceable anytime)
    ├── css/
    │   └── style.css          # Glassmorphism design system & responsive styles
    ├── js/
    │   ├── data.js            # ⭐️ Central configuration file (edit this to update content!)
    │   └── main.js            # DOM controller, filters, modals, theme engine
    └── images/
        ├── avatar.svg         # Stylish developer monogram badge
        ├── ontrip-preview.svg # OnTrip vector UI illustration
        ├── shopkart-preview.svg# ShopKart vector UI illustration
        ├── calendar-preview.svg# Interactive Calendar vector UI illustration
        └── amazon-preview.svg # Amazon Clone vector UI illustration
```

---

## ⚡ Quick Start

### Option 1: Zero-Install Local Server
Run with Node.js:
```bash
npm start
```
Then open your browser to **`http://localhost:3000`**.

### Option 2: Direct Browser Open
Double-click `index.html` in your file explorer to open it directly in any browser (Chrome, Edge, Firefox, Safari).

---

## 🛠️ How to Customize Your Portfolio

Open **`assets/js/data.js`** in your code editor. Everything is structured in clear, commented sections:

1. **Personal Information & Links**: Update your email, phone, LinkedIn, GitHub, or taglines under `personal`.
2. **Key Metrics**: Update your CodeChef, Codeforces, LeetCode ratings, or problems solved count under `stats`.
3. **Projects**:
   - Add new projects by duplicating an object in `projects: [...]`.
   - Update demo or GitHub links for **OnTrip**, **ShopKart**, **Calendar**, or **Amazon**.
4. **Achievements**: Add certifications, hackathon wins, or rating updates under `achievements`.
5. **Technical Skills**: Group and list your latest programming languages, libraries, and tools under `skills`.
6. **Updating Resume**: Simply drop your new PDF file into `assets/resume.pdf`!

---

## 🌐 Free 1-Click Deployment Guide

### Deploying to GitHub Pages (Recommended)
1. Initialize or push your existing repository:
   ```bash
   git add .
   git commit -m "feat: add all public projects and original resume integration"
   git remote add origin https://github.com/prashik24/prashik24.github.io.git
   git branch -M main
   git push -u origin main
   ```
2. On GitHub, navigate to **Settings > Pages** and set branch to `main` and folder to `/(root)`.
3. Your portfolio is live at: `https://prashik24.github.io`!

### Deploying to Vercel or Netlify
1. Go to [vercel.com](https://vercel.com) or [netlify.com](https://netlify.com).
2. Connect your GitHub repository.
3. Keep default settings (no build command needed, root directory `.`).
4. Click **Deploy** — your portfolio is live in seconds with automatic HTTPS!

---

## 📬 Contact & Support
- **Developer**: Prashik Humane
- **Email**: [prashikhumane744@gmail.com](mailto:prashikhumane744@gmail.com)
- **LinkedIn**: [linkedin.com/in/prashik-humane](https://linkedin.com/in/prashik-humane)
- **GitHub**: [github.com/prashik24](https://github.com/prashik24)
