/**
 * =========================================================================
 * PRASHIK HUMANE - ADVANCED UI/UX CONTROLLER
 * =========================================================================
 * 
 * Features:
 * - Real-time IST Digital Clock in Bento Header
 * - Command Palette (Ctrl+K / ⌘K) with keyboard search & navigation
 * - Realistic Browser Mockup Frames with Live URL & Status
 * - Category Filter Engine with count pills
 * - Dynamic Modals (Project Architecture & Printable PDF Resume)
 * - Copy to Clipboard with animated toast notifications
 * - Theme Switcher (Dark / Light) with localStorage persistence
 */

document.addEventListener('DOMContentLoaded', () => {
  const data = window.portfolioData;
  if (!data) {
    console.error("Portfolio data not found. Ensure data.js is loaded.");
    return;
  }

  // 1. Theme Management
  initTheme();

  // 2. Real-time Digital Clock (Bento Card)
  initLiveClock();

  // 3. Render Hero & Socials
  renderHero(data.personal);

  // 4. Render Projects & Filter Mechanism
  renderProjects(data.projects);

  // 5. Render Achievements & Competitive Programming
  renderAchievements(data.achievements);

  // 6. Render Technical Skills
  renderSkills(data.skills);

  // 7. Render Timelines
  renderTimelines(data.education, data.responsibilities);

  // 8. Render Contact Section
  renderContact(data.personal);

  // 9. Interactive Modals
  setupModals(data);

  // 10. Command Palette (Ctrl+K / ⌘K)
  setupCommandPalette(data);

  // 11. Navigation & Scroll Interactions
  setupNavigation();

  // 12. Contact Form
  setupContactForm(data.personal.email);
});

/* -------------------------------------------------------------------------
 * 1. THEME MANAGEMENT
 * ------------------------------------------------------------------------- */
function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle-btn');
  const storedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', storedTheme);
  updateThemeIcon(storedTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme);
      showToast(`Switched to ${newTheme} mode`);
    });
  }
}

function updateThemeIcon(theme) {
  const icon = document.querySelector('#theme-toggle-btn i');
  if (icon) {
    icon.className = theme === 'dark' ? 'ri-sun-line' : 'ri-moon-line';
  }
}

/* -------------------------------------------------------------------------
 * 2. LIVE CLOCK (Bento Grid)
 * ------------------------------------------------------------------------- */
function initLiveClock() {
  const clockEl = document.getElementById('live-clock');
  if (!clockEl) return;

  function update() {
    const options = { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
    const istTime = new Intl.DateTimeFormat('en-US', options).format(new Date());
    clockEl.innerHTML = `<i class="ri-time-line"></i> ${istTime} IST (UTC+05:30)`;
  }

  update();
  setInterval(update, 1000);
}

/* -------------------------------------------------------------------------
 * 3. HERO & PERSONAL INFO
 * ------------------------------------------------------------------------- */
function renderHero(personal) {
  const heroSocialsContainer = document.getElementById('hero-socials');
  if (heroSocialsContainer) {
    heroSocialsContainer.innerHTML = `
      <a href="${personal.socials.github}" target="_blank" rel="noopener noreferrer" class="social-pill" title="GitHub Profile (2,000+ Contributions)">
        <i class="ri-github-fill"></i>
      </a>
      <a href="${personal.socials.linkedin}" target="_blank" rel="noopener noreferrer" class="social-pill" title="LinkedIn Profile">
        <i class="ri-linkedin-fill"></i>
      </a>
      <a href="${personal.socials.codechef}" target="_blank" rel="noopener noreferrer" class="social-pill" title="CodeChef 4★ (Peak 1800)">
        <i class="ri-star-line"></i>
      </a>
      <a href="${personal.socials.codeforces}" target="_blank" rel="noopener noreferrer" class="social-pill" title="Codeforces Specialist (Peak 1572)">
        <i class="ri-flashlight-line"></i>
      </a>
      <a href="${personal.socials.leetcode}" target="_blank" rel="noopener noreferrer" class="social-pill" title="LeetCode Contest Profile">
        <i class="ri-code-s-slash-line"></i>
      </a>
      <a href="${personal.socials.email}" class="social-pill" title="Send Direct Email">
        <i class="ri-mail-line"></i>
      </a>
    `;
  }
}

/* -------------------------------------------------------------------------
 * 4. PROJECTS SHOWCASE (Realistic Browser Mockups)
 * ------------------------------------------------------------------------- */
let allProjects = [];

function renderProjects(projects) {
  allProjects = projects;
  const container = document.getElementById('projects-grid');
  if (!container) return;

  displayFilteredProjects('all');

  // Filter Buttons
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterButtons.forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      const category = e.currentTarget.getAttribute('data-filter');
      displayFilteredProjects(category);
    });
  });
}

function displayFilteredProjects(category) {
  const container = document.getElementById('projects-grid');
  if (!container) return;

  const filtered = category === 'all' 
    ? allProjects 
    : allProjects.filter(p => p.category === category);

  container.innerHTML = filtered.map(project => {
    const rawUrl = project.deployment?.liveUrl || '';
    const cleanUrl = rawUrl.replace(/^https?:\/\//, '').replace(/\/$/, '') || `github.com/prashik24/${project.id}`;

    return `
      <article class="project-card" data-id="${project.id}">
        <!-- Realistic Browser Window Frame -->
        <div class="project-preview">
          <div class="mockup-header-bar">
            <div class="mockup-dots">
              <span class="mockup-dot dot-red"></span>
              <span class="mockup-dot dot-yellow"></span>
              <span class="mockup-dot dot-green"></span>
            </div>
            <div class="mockup-address-bar" title="${rawUrl}">
              <i class="ri-lock-line"></i> ${cleanUrl}
            </div>
            <div style="width: 36px;"></div>
          </div>

          <div class="project-img-holder">
            <img src="${project.image}" alt="${project.title} Screenshot" loading="lazy" />
            <a href="${project.links.demo}" target="_blank" rel="noopener noreferrer" class="img-hover-overlay" title="Open live deployment">
              <span class="btn btn-primary btn-sm"><i class="ri-external-link-line"></i> Visit Live App</span>
            </a>
          </div>

          ${project.deployment ? `
            <a href="${project.deployment.liveUrl}" target="_blank" rel="noopener noreferrer" class="project-deploy-badge" title="Live on ${project.deployment.platform}">
              <span class="live-dot"></span> Live • ${project.deployment.platform}
            </a>
          ` : ''}
        </div>

        <!-- Project Content Body -->
        <div class="project-body">
          <div class="project-header-row">
            <div class="project-title">
              <h3>${project.title}</h3>
            </div>
            <span class="project-category-pill">${project.categoryLabel}</span>
          </div>

          <p class="project-desc">${project.shortDescription}</p>

          <div class="tech-stack-chips">
            ${project.technologies.map(t => `<span class="tech-chip">${t}</span>`).join('')}
          </div>

          <ul class="project-bullets">
            ${project.highlights.slice(0, 3).map(h => `<li>${h}</li>`).join('')}
          </ul>

          <div class="project-footer">
            <div class="project-links">
              <a href="${project.links.demo}" target="_blank" rel="noopener noreferrer" class="project-link-btn primary" title="Open Live Application">
                <i class="ri-external-link-line"></i> Live Demo
              </a>
              <a href="${project.links.github}" target="_blank" rel="noopener noreferrer" class="project-link-btn" title="View Source Code on GitHub">
                <i class="ri-github-line"></i> GitHub Repo
              </a>
            </div>
            <button class="project-deep-dive-btn" onclick="openProjectModal('${project.id}')" title="View Architecture Details">
              Architecture Details <i class="ri-arrow-right-line"></i>
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

/* -------------------------------------------------------------------------
 * 5. ACHIEVEMENTS & COMPETITIVE PROGRAMMING
 * ------------------------------------------------------------------------- */
function renderAchievements(achievements) {
  const container = document.getElementById('achievements-grid');
  if (!container) return;

  container.innerHTML = achievements.map(item => `
    <div class="achievement-card">
      <div class="achieve-header">
        <div class="achieve-icon-box">
          <i class="ri-${item.icon === 'trophy' ? 'trophy-line' : item.icon === 'star' ? 'star-line' : item.icon === 'zap' ? 'flashlight-line' : item.icon === 'git-commit' ? 'git-commit-line' : 'shield-check-line'}"></i>
        </div>
        <span class="achieve-badge">
          ${item.badge}
        </span>
      </div>
      <h3 class="achieve-title">${item.title}</h3>
      <div class="achieve-rating">${item.rating}</div>
      <p class="achieve-desc">${item.description}</p>
      <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="achieve-link">
        Verified Profile <i class="ri-arrow-right-up-line"></i>
      </a>
    </div>
  `).join('');
}

/* -------------------------------------------------------------------------
 * 6. TECHNICAL SKILLS
 * ------------------------------------------------------------------------- */
function renderSkills(skillsData) {
  const container = document.getElementById('skills-grid');
  if (!container) return;

  container.innerHTML = skillsData.categories.map(category => `
    <div class="skill-category-card">
      <div class="category-title-wrap">
        <div class="category-icon">
          <i class="ri-${category.icon === 'terminal' ? 'code-box-line' : category.icon === 'layers' ? 'stack-line' : category.icon === 'database' ? 'database-2-line' : 'cpu-line'}"></i>
        </div>
        <h3 class="category-title">${category.title}</h3>
      </div>
      <div class="skill-items-wrap">
        ${category.items.map(skill => `
          <div class="skill-item">
            <div class="skill-name">${skill.name}</div>
            <div class="skill-sub">
              <span class="skill-level">${skill.level}</span>
              <span class="skill-tag">${skill.tag}</span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

/* -------------------------------------------------------------------------
 * 7. EDUCATION & LEADERSHIP TIMELINE
 * ------------------------------------------------------------------------- */
function renderTimelines(education, responsibilities) {
  // Education
  const eduContainer = document.getElementById('education-timeline');
  if (eduContainer) {
    eduContainer.innerHTML = education.map(item => `
      <div class="timeline-item">
        <div class="timeline-dot ${item.current ? 'current' : ''}"></div>
        <div class="timeline-card">
          <div class="timeline-meta">
            <span class="timeline-period">${item.period}</span>
            <span class="timeline-score">${item.score}</span>
          </div>
          <h4 class="timeline-institution">${item.institution}</h4>
          <div class="timeline-degree">${item.degree} • ${item.location}</div>
          <ul class="timeline-details">
            ${item.details.map(d => `<li>${d}</li>`).join('')}
          </ul>
        </div>
      </div>
    `).join('');
  }

  // Leadership
  const respContainer = document.getElementById('leadership-timeline');
  if (respContainer) {
    respContainer.innerHTML = responsibilities.map(item => `
      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-card">
          <div class="timeline-meta">
            <span class="timeline-period">${item.period}</span>
            <span class="timeline-score">${item.institution}</span>
          </div>
          <h4 class="timeline-institution">${item.role}</h4>
          <div class="timeline-degree">${item.organization}</div>
          <ul class="timeline-details">
            ${item.points.map(p => `<li>${p}</li>`).join('')}
          </ul>
        </div>
      </div>
    `).join('');
  }
}

/* -------------------------------------------------------------------------
 * 8. CONTACT SECTION & CLIPBOARD
 * ------------------------------------------------------------------------- */
function renderContact(personal) {
  const contactContainer = document.getElementById('contact-methods-list');
  if (!contactContainer) return;

  contactContainer.innerHTML = `
    <div class="contact-method-item">
      <div class="contact-icon"><i class="ri-mail-line"></i></div>
      <div class="contact-details">
        <span class="contact-lbl">Email Address</span>
        <span class="contact-val" id="email-text">${personal.email}</span>
      </div>
      <button class="copy-btn" onclick="copyToClipboard('${personal.email}', 'Email copied to clipboard!')" title="Copy Email">
        <i class="ri-file-copy-line"></i>
      </button>
    </div>

    <div class="contact-method-item">
      <div class="contact-icon"><i class="ri-phone-line"></i></div>
      <div class="contact-details">
        <span class="contact-lbl">Phone Number</span>
        <span class="contact-val" id="phone-text">${personal.phone}</span>
      </div>
      <button class="copy-btn" onclick="copyToClipboard('${personal.phone}', 'Phone copied to clipboard!')" title="Copy Phone">
        <i class="ri-file-copy-line"></i>
      </button>
    </div>

    <div class="contact-method-item">
      <div class="contact-icon"><i class="ri-map-pin-line"></i></div>
      <div class="contact-details">
        <span class="contact-lbl">Location</span>
        <span class="contact-val">${personal.location}</span>
      </div>
    </div>

    <div class="contact-method-item">
      <div class="contact-icon"><i class="ri-linkedin-fill"></i></div>
      <div class="contact-details">
        <span class="contact-lbl">LinkedIn</span>
        <a href="${personal.socials.linkedin}" target="_blank" rel="noopener noreferrer" class="contact-val">
          linkedin.com/in/prashik-humane
        </a>
      </div>
    </div>

    <div class="contact-method-item">
      <div class="contact-icon"><i class="ri-github-fill"></i></div>
      <div class="contact-details">
        <span class="contact-lbl">GitHub</span>
        <a href="${personal.socials.github}" target="_blank" rel="noopener noreferrer" class="contact-val">
          github.com/prashik24
        </a>
      </div>
    </div>
  `;
}

window.copyToClipboard = function(text, successMsg) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(successMsg);
  }).catch(() => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    showToast(successMsg);
  });
};

/* -------------------------------------------------------------------------
 * 9. INTERACTIVE MODALS
 * ------------------------------------------------------------------------- */
function setupModals(data) {
  document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        closeAllModals();
      }
    });
  });

  document.querySelectorAll('.modal-close-btn').forEach(btn => {
    btn.addEventListener('click', closeAllModals);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllModals();
  });

  const resumeBtns = document.querySelectorAll('.resume-trigger-btn');
  resumeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openResumeModal();
    });
  });
}

window.openProjectModal = function(projectId) {
  const project = window.portfolioData.projects.find(p => p.id === projectId);
  if (!project) return;

  const modal = document.getElementById('project-modal');
  const title = document.getElementById('modal-project-title');
  const body = document.getElementById('modal-project-body');

  title.textContent = project.title;
  body.innerHTML = `
    <div style="margin-bottom: 1.5rem;">
      <div style="display: flex; gap: 0.5rem; align-items: center; margin-bottom: 0.8rem; flex-wrap: wrap;">
        <span class="project-category-pill">${project.categoryLabel}</span>
        ${project.deployment ? `
          <span style="font-size: 0.78rem; font-weight: 700; color: var(--accent-emerald); background: rgba(16, 185, 129, 0.12); padding: 0.25rem 0.7rem; border-radius: var(--radius-full); border: 1px solid rgba(16, 185, 129, 0.3);">
            🟢 Deployed on ${project.deployment.platform}
          </span>
        ` : ''}
      </div>
      <p style="font-size: 1.05rem; color: var(--text-secondary); line-height: 1.6;">${project.shortDescription}</p>
    </div>

    <div style="margin-bottom: 1.5rem;">
      <h4 style="font-size: 1.1rem; margin-bottom: 0.8rem; color: var(--text-main);">Technical Architecture &amp; Highlights</h4>
      <ul class="project-bullets" style="margin-bottom: 1rem;">
        ${project.highlights.map(h => `<li>${h}</li>`).join('')}
      </ul>
    </div>

    <div style="background: var(--bg-surface-elevated); padding: 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--border-card); margin-bottom: 1.5rem;">
      <h4 style="font-size: 0.95rem; margin-bottom: 0.5rem; color: var(--accent-primary);">Key Engineering Metrics &amp; Stack</h4>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem; font-size: 0.85rem;">
        ${Object.entries(project.stats || {}).map(([k, v]) => `
          <div>
            <div style="color: var(--text-muted); text-transform: capitalize;">${k}</div>
            <div style="color: var(--text-main); font-weight: 700; margin-top: 0.2rem;">${v}</div>
          </div>
        `).join('')}
      </div>
    </div>

    <div style="display: flex; gap: 0.85rem; flex-wrap: wrap;">
      ${project.links.demo ? `
        <a href="${project.links.demo}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
          <i class="ri-external-link-line"></i> Open Live Deployment
        </a>
      ` : ''}
      <a href="${project.links.github}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm">
        <i class="ri-github-line"></i> View GitHub Repository
      </a>
    </div>
  `;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
};

window.openResumeModal = function() {
  const modal = document.getElementById('resume-modal');
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
};

window.closeAllModals = function() {
  document.querySelectorAll('.modal-backdrop').forEach(modal => {
    modal.classList.remove('open');
  });
  const cmdPalette = document.getElementById('cmd-palette');
  if (cmdPalette) cmdPalette.classList.remove('open');
  document.body.style.overflow = '';
};

/* -------------------------------------------------------------------------
 * 10. COMMAND PALETTE (Ctrl+K / ⌘K)
 * ------------------------------------------------------------------------- */
function setupCommandPalette(data) {
  const cmdPalette = document.getElementById('cmd-palette');
  const cmdInput = document.getElementById('cmd-palette-input');
  const cmdList = document.getElementById('cmd-palette-list');
  const cmdTrigger = document.getElementById('cmd-k-open');

  if (!cmdPalette || !cmdInput || !cmdList) return;

  const commands = [
    // Projects
    { title: "OnTrip – AI Travel Planning Platform", category: "Projects", icon: "ri-plane-line", action: () => { window.location.hash = "#projects"; openProjectModal("ontrip"); } },
    { title: "ShopKart – Full-Stack E-Commerce", category: "Projects", icon: "ri-shopping-cart-line", action: () => { window.location.hash = "#projects"; openProjectModal("shopkart"); } },
    { title: "Interactive Wall Calendar Component", category: "Projects", icon: "ri-calendar-line", action: () => { window.location.hash = "#projects"; openProjectModal("calendar"); } },
    { title: "Amazon Homepage Clone", category: "Projects", icon: "ri-amazon-line", action: () => { window.location.hash = "#projects"; openProjectModal("amazon"); } },

    // Resume & Contact
    { title: "Download Resume (Original PDF)", category: "Actions", icon: "ri-download-2-line", action: () => { window.location.href = data.personal.resumePdfPath; } },
    { title: "View Formatted Resume", category: "Actions", icon: "ri-file-text-line", action: () => openResumeModal() },
    { title: "Copy Email Address", category: "Actions", icon: "ri-mail-line", action: () => copyToClipboard(data.personal.email, "Email copied!") },
    { title: "Copy Phone Number", category: "Actions", icon: "ri-phone-line", action: () => copyToClipboard(data.personal.phone, "Phone copied!") },

    // Competitive Programming
    { title: "CodeChef Profile (1800 4★)", category: "Profiles", icon: "ri-star-line", action: () => window.open(data.personal.socials.codechef, "_blank") },
    { title: "Codeforces Profile (1572 Specialist)", category: "Profiles", icon: "ri-flashlight-line", action: () => window.open(data.personal.socials.codeforces, "_blank") },
    { title: "LeetCode Profile", category: "Profiles", icon: "ri-code-s-slash-line", action: () => window.open(data.personal.socials.leetcode, "_blank") },
    { title: "GitHub Profile (2,000+ Contributions)", category: "Profiles", icon: "ri-github-fill", action: () => window.open(data.personal.socials.github, "_blank") },
    { title: "LinkedIn Profile", category: "Profiles", icon: "ri-linkedin-fill", action: () => window.open(data.personal.socials.linkedin, "_blank") }
  ];

  let selectedIdx = 0;
  let currentFiltered = [...commands];

  function renderList(items) {
    if (items.length === 0) {
      cmdList.innerHTML = `<div style="padding: 1.5rem; text-align: center; color: var(--text-muted); font-size: 0.9rem;">No matching commands found.</div>`;
      return;
    }

    let groups = {};
    items.forEach((item, idx) => {
      if (!groups[item.category]) groups[item.category] = [];
      groups[item.category].push({ ...item, globalIdx: idx });
    });

    let html = '';
    Object.keys(groups).forEach(category => {
      html += `<div class="cmd-group-label">${category}</div>`;
      groups[category].forEach(item => {
        const isSelected = item.globalIdx === selectedIdx;
        html += `
          <li class="cmd-item ${isSelected ? 'selected' : ''}" data-idx="${item.globalIdx}">
            <div class="cmd-item-left">
              <i class="${item.icon}"></i>
              <span>${item.title}</span>
            </div>
            <span class="cmd-item-tag">${item.category}</span>
          </li>
        `;
      });
    });

    cmdList.innerHTML = html;

    // Click handler for items
    cmdList.querySelectorAll('.cmd-item').forEach(el => {
      el.addEventListener('click', () => {
        const idx = parseInt(el.getAttribute('data-idx'), 10);
        executeCommand(idx);
      });
    });
  }

  function executeCommand(idx) {
    if (currentFiltered[idx]) {
      closePalette();
      currentFiltered[idx].action();
    }
  }

  function openPalette() {
    cmdPalette.classList.add('open');
    cmdInput.value = '';
    currentFiltered = [...commands];
    selectedIdx = 0;
    renderList(currentFiltered);
    setTimeout(() => cmdInput.focus(), 50);
  }

  function closePalette() {
    cmdPalette.classList.remove('open');
  }

  if (cmdTrigger) cmdTrigger.addEventListener('click', openPalette);

  // Keyboard shortcut listener (Ctrl+K / Cmd+K)
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (cmdPalette.classList.contains('open')) {
        closePalette();
      } else {
        openPalette();
      }
    } else if (e.key === 'Escape' && cmdPalette.classList.contains('open')) {
      closePalette();
    } else if (cmdPalette.classList.contains('open')) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        selectedIdx = (selectedIdx + 1) % currentFiltered.length;
        renderList(currentFiltered);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        selectedIdx = (selectedIdx - 1 + currentFiltered.length) % currentFiltered.length;
        renderList(currentFiltered);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        executeCommand(selectedIdx);
      }
    }
  });

  // Search input filtering
  cmdInput.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase().trim();
    currentFiltered = commands.filter(c => c.title.toLowerCase().includes(q) || c.category.toLowerCase().includes(q));
    selectedIdx = 0;
    renderList(currentFiltered);
  });

  cmdPalette.addEventListener('click', (e) => {
    if (e.target === cmdPalette) closePalette();
  });
}

/* -------------------------------------------------------------------------
 * 11. NAVIGATION & SCROLL INTERACTIONS
 * ------------------------------------------------------------------------- */
function setupNavigation() {
  const navbar = document.querySelector('.navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 140;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.className = mobileDrawer.classList.contains('open') ? 'ri-close-line' : 'ri-menu-line';
      }
    });

    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        const icon = mobileToggle.querySelector('i');
        if (icon) icon.className = 'ri-menu-line';
      });
    });
  }
}

/* -------------------------------------------------------------------------
 * 12. CONTACT FORM DISPATCH
 * ------------------------------------------------------------------------- */
function setupContactForm(receiverEmail) {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const subject = form.subject.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      status.textContent = 'Please fill out all required fields.';
      status.className = 'form-status error';
      return;
    }

    const mailtoLink = `mailto:${receiverEmail}?subject=${encodeURIComponent(subject || `Portfolio Message from ${name}`)}&body=${encodeURIComponent(`Hi Prashik,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
    
    status.textContent = 'Opening your email client to dispatch message directly to Prashik...';
    status.className = 'form-status success';
    
    setTimeout(() => {
      window.location.href = mailtoLink;
      form.reset();
    }, 600);
  });
}

/* -------------------------------------------------------------------------
 * TOAST NOTIFICATIONS
 * ------------------------------------------------------------------------- */
function showToast(message) {
  let toast = document.getElementById('toast-notice');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notice';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<i class="ri-checkbox-circle-fill" style="color: var(--accent-emerald);"></i> ${message}`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 2600);
}
