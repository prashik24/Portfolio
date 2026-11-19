# 🚀 Prashik Humane — Personal Developer Portfolio

> A modern, high-performance, responsive portfolio website built with clean semantic architecture, dark/light theme support, glassmorphism UI, and centralized data management.

---

## ✨ Features

- **Decoupled Data Architecture**: All content (personal bio, metrics, projects, skills, achievements, education, and social links) is stored in a single, well-documented file: [`assets/js/data.js`](assets/js/data.js). You never need to touch HTML or CSS to add or update content!
- **Interactive Project Showcase**:
  - Filter by category (*All*, *AI / ML & Full Stack*, *Full-Stack Web & Payments*).
  - Deep-dive technical architecture modal with engineering metrics.
  - Direct links to GitHub repositories and live deployments.
- **Competitive Programming & Metrics Showcase**:
  - Visual badges for **CodeChef 4★ (1800 Peak)**, **Codeforces Specialist (1572 Max)**, **LeetCode (1491)**, **Adobe Hackathon**, and **AlgoUniversity**.
- **Dual-Track Timeline**: Education at **IIIT Lucknow (B.Tech CS & Business - CGPA 8.0)** alongside leadership in **Crotonia Literary Society** and **E-Cell IIIT Lucknow**.
- **Interactive Contact Suite**:
  - One-click copy for email and phone numbers with animated toast notifications.
  - Integrated contact form with validation and direct email client dispatch.
- **Built-in Resume Viewer & Print-to-PDF**:
  - Built-in formatted resume modal matching your exact resume.
  - One-click "Print / Save as PDF" button with optimized `@media print` CSS.
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
    ├── css/
    │   └── style.css          # Glassmorphism design system & responsive styles
    ├── js/
    │   ├── data.js            # ⭐️ Central configuration file (edit this to update content!)
    │   └── main.js            # DOM controller, filters, modals, theme engine
    └── images/
        ├── avatar.svg         # Stylish developer monogram badge
        ├── ontrip-preview.svg # Vector UI preview for OnTrip AI platform
        └── shopkart-preview.svg# Vector UI preview for ShopKart e-commerce
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
   - Update demo or GitHub links for **OnTrip** and **ShopKart**.
4. **Achievements**: Add certifications, hackathon wins, or rating updates under `achievements`.
5. **Technical Skills**: Group and list your latest programming languages, libraries, and tools under `skills`.

---

## 🌐 Free 1-Click Deployment Guide

### Deploying to GitHub Pages (Recommended)
1. Initialize a git repository in this folder if not already done:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Prashik Humane Portfolio"
   ```
2. Create a new repository on GitHub named `prashik24.github.io` (or `portfolio`).
3. Push your repository:
   ```bash
   git remote add origin https://github.com/prashik24/prashik24.github.io.git
   git branch -M main
   git push -u origin main
   ```
4. On GitHub, navigate to **Settings > Pages** and set branch to `main` and folder to `/(root)`.
5. Your portfolio is live at: `https://prashik24.github.io`!

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
