/**
 * =========================================================================
 * PRASHIK HUMANE - OFFICIAL PORTFOLIO MAIN CONTROLLER
 * =========================================================================
 * 
 * Features:
 * - Proper Full-Width Sticky Navbar with smooth section highlights
 * - Flagship Showcase Project Cards with real-world browser mockup frames
 * - Category Filtering with active state
 * - Architecture Deep-Dive Modals & Resume Viewer
 * - 1-Click Clipboard copy for Email & Phone with Toast notifications
 * - Dark & Light Theme engine with localStorage persistence
 */

document.addEventListener('DOMContentLoaded', () => {
  const data = window.portfolioData;
  if (!data) {
    console.error("Portfolio data not found. Ensure data.js is loaded.");
    return;
  }

  // 1. Theme Management
  initTheme();

  // 2. Render Hero Social Links
  renderHero(data.personal);

  // 3. Render Flagship Projects Stack
  renderProjects(data.projects);

  // 4. Render Achievements & Competitive Programming
  renderAchievements(data.achievements);

  // 5. Render Technical Skills Matrix
  renderSkills(data.skills);

  // 6. Render Education & Leadership Timelines
  renderTimelines(data.education, data.responsibilities);

  // 7. Render Contact Info Cards
  renderContact(data.personal);

  // 8. Setup Interactive Modals
  setupModals(data);

  // 9. Setup Sticky Navigation & Active Link tracking
  setupNavigation();

  // 10. Contact Form Dispatch
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
 * 2. HERO & SOCIAL LINKS
 * ------------------------------------------------------------------------- */
function renderHero(personal) {
  const heroSocialsContainer = document.getElementById('hero-socials');
  if (heroSocialsContainer) {
    const rawPhone = (personal.phone || '').replace(/[^+\d]/g, '');
    heroSocialsContainer.innerHTML = `
      <a href="${personal.socials.github}" target="_blank" rel="noopener noreferrer" class="social-pill" title="GitHub (2,000+ Contributions)">
        <i class="ri-github-fill"></i>
      </a>
      <a href="${personal.socials.linkedin}" target="_blank" rel="noopener noreferrer" class="social-pill" title="LinkedIn Profile">
        <i class="ri-linkedin-fill"></i>
      </a>
      <a href="tel:${rawPhone}" class="social-pill" title="Call Phone (${personal.phone})">
        <i class="ri-phone-fill"></i>
      </a>
      <a href="${personal.socials.codechef}" target="_blank" rel="noopener noreferrer" class="social-pill" title="CodeChef 4★ (Peak 1800)">
        <i class="ri-star-line"></i>
      </a>
      <a href="${personal.socials.codeforces}" target="_blank" rel="noopener noreferrer" class="social-pill" title="Codeforces Specialist (Peak 1572)">
        <i class="ri-flashlight-line"></i>
      </a>
      <a href="${personal.socials.leetcode}" target="_blank" rel="noopener noreferrer" class="social-pill" title="LeetCode Profile">
        <i class="ri-code-s-slash-line"></i>
      </a>
      <a href="${personal.socials.email}" class="social-pill" title="Send Email">
        <i class="ri-mail-line"></i>
      </a>
    `;
  }
}

/* -------------------------------------------------------------------------
 * 3. FLAGSHIP PROJECTS SHOWCASE (2x2 Grid with Uniform Mockup Ratio)
 * ------------------------------------------------------------------------- */
let allProjects = [];

function renderProjects(projects) {
  allProjects = projects;
  const container = document.getElementById('projects-grid') || document.getElementById('projects-stack');
  if (!container) return;

  displayFilteredProjects('all');

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
  const container = document.getElementById('projects-grid') || document.getElementById('projects-stack');
  if (!container) return;

  const filtered = category === 'all' 
    ? allProjects 
    : allProjects.filter(p => p.category === category);

  container.innerHTML = filtered.map(project => {
    const rawUrl = project.deployment?.liveUrl || '';
    const cleanUrl = rawUrl.replace(/^https?:\/\//, '').replace(/\/$/, '') || `github.com/prashik24/${project.id}`;

    return `
      <article class="project-card-2x2" data-id="${project.id}">
        <!-- Realistic Browser Mockup Frame -->
        <div class="mockup-top-bar">
          <div class="mockup-window-dots">
            <span class="mockup-dot red"></span>
            <span class="mockup-dot yellow"></span>
            <span class="mockup-dot green"></span>
          </div>
          <div class="mockup-url-pill" title="${rawUrl}">
            <i class="ri-lock-line"></i> ${cleanUrl}
          </div>
          <div style="width: 36px;"></div>
        </div>

        <div class="project-img-wrapper">
          <img src="${project.image}" alt="${project.title} Screenshot" loading="lazy" />
          ${project.deployment ? `
            <div class="live-float-badge">
              <span class="live-dot"></span> Live • ${project.deployment.platform}
            </div>
          ` : ''}
        </div>

        <!-- Project Detail Content Side -->
        <div class="project-content-side">
          <div class="project-meta-row">
            <span class="project-category-tag">${project.categoryLabel}</span>
          </div>

          <div class="project-title">
            <h3>${project.title}</h3>
          </div>

          <p class="project-summary">${project.shortDescription}</p>

          <div class="project-tech-chips">
            ${project.technologies.map(t => `<span class="tech-tag">${t}</span>`).join('')}
          </div>

          <ul class="project-achieve-list">
            ${project.highlights.slice(0, 3).map(h => `<li>${h}</li>`).join('')}
          </ul>

          <div class="project-action-row">
            <div class="project-buttons">
              <a href="${project.links.demo}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm" title="Visit Live Application">
                <i class="ri-external-link-line"></i> Live Demo
              </a>
              <a href="${project.links.github}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" title="View Source on GitHub">
                <i class="ri-github-line"></i> Source Code
              </a>
            </div>
            <button class="arch-btn" onclick="openProjectModal('${project.id}')">
              Architecture Details <i class="ri-arrow-right-line"></i>
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

/* -------------------------------------------------------------------------
 * 4. ACHIEVEMENTS & COMPETITIVE PROGRAMMING (Official SVG Logos)
 * ------------------------------------------------------------------------- */
function getPlatformLogo(platform) {
  const p = (platform || '').toLowerCase();
  switch (p) {
    case 'codechef':
      return `
        <div class="achieve-logo-box" title="CodeChef Official Logo">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.8 9.5C18.6 7 16.5 5 14 5c-.7 0-1.4.2-2 .5C11.4 5.2 10.7 5 10 5c-2.5 0-4.6 2-4.8 4.5C3.9 10.2 3 11.5 3 13c0 1.9 1.4 3.4 3.2 3.8.3 1.8 1.8 3.2 3.8 3.2h4c2 0 3.5-1.4 3.8-3.2 1.8-.4 3.2-1.9 3.2-3.8 0-1.5-.9-2.8-2.2-3.5z" fill="#5B4638"/>
            <ellipse cx="12" cy="11.5" rx="5" ry="3.5" fill="#F4BAA3"/>
            <path d="M7 17h10v2c0 1.1-.9 2-2 2H9c-1.1 0-2-.9-2-2v-2z" fill="#5B4638"/>
          </svg>
        </div>
      `;
    case 'codeforces':
      return `
        <div class="achieve-logo-box" title="Codeforces Official Logo">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="10" width="5" height="12" rx="1.5" fill="#FFD400"/>
            <rect x="9.5" y="3" width="5" height="19" rx="1.5" fill="#188CE5"/>
            <rect x="17" y="6.5" width="5" height="15.5" rx="1.5" fill="#FF1818"/>
          </svg>
        </div>
      `;
    case 'leetcode':
      return `
        <div class="achieve-logo-box" title="LeetCode Official Logo">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.1 17.9l-2.7 2.6c-.5.5-1.1.7-1.8.7s-1.4-.2-1.8-.7L5.5 16.1c-.5-.5-.7-1.1-.7-1.8s.2-1.4.7-1.8l4.3-4.4c.5-.5 1.1-.6 1.8-.6s1.4.2 1.8.7l2.7 2.6c.5.5 1.4.5 1.9 0 .5-.5.5-1.4 0-1.9l-2.6-2.6c-1-1-2.4-1.5-3.8-1.5s-2.8.5-3.8 1.5L3.6 10.7C2.6 11.7 2 13.1 2 14.5s.6 2.8 1.6 3.8l4.3 4.4c1 1 2.4 1.5 3.8 1.5s2.8-.5 3.8-1.5l2.7-2.6c.5-.5.5-1.4 0-1.9-.5-.5-1.4-.6-2.1-.3z" fill="#B3B1B0"/>
            <path d="M10.5 13.5h10.5a1.5 1.5 0 0 0 0-3H10.5a1.5 1.5 0 0 0 0 3z" fill="#FFA116"/>
          </svg>
        </div>
      `;
    case 'github':
      return `
        <div class="achieve-logo-box" title="GitHub Official Logo">
          <svg viewBox="0 0 24 24" fill="#F4F0E2" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
          </svg>
        </div>
      `;
    case 'adobe':
      return `
        <div class="achieve-logo-box" title="Adobe Official Logo">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 3h7v18l-7-18zM3 3h7L3 21V3zm6 11.5l2.8-7.2 3.5 9.1h-2.5l-1-2.6H9.9l-.9 2.3V14.5z" fill="#FA0F00"/>
          </svg>
        </div>
      `;
    case 'algouniversity':
    default:
      return `
        <div class="achieve-logo-box" title="AlgoUniversity Network Topology">
          <svg viewBox="0 0 24 24" fill="none" stroke="#A6C8E2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
            <circle cx="6" cy="6" r="3" fill="#619DC6"/>
            <circle cx="18" cy="6" r="3" fill="#F4BAA3"/>
            <circle cx="12" cy="18" r="3" fill="#619DC6"/>
            <line x1="8.5" y1="7.5" x2="15.5" y2="7.5"/>
            <line x1="7.5" y1="8.5" x2="10.5" y2="15.5"/>
            <line x1="16.5" y1="8.5" x2="13.5" y2="15.5"/>
          </svg>
        </div>
      `;
  }
}

function renderAchievements(achievements) {
  const container = document.getElementById('achievements-grid');
  if (!container) return;

  container.innerHTML = achievements.map(item => `
    <div class="achievement-card">
      <div class="achieve-header">
        ${getPlatformLogo(item.platform || '')}
        <span class="achieve-badge ${(item.platform || '').toLowerCase()}-badge">
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
 * 5. TECHNICAL SKILLS MATRIX
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
 * 6. EDUCATION & LEADERSHIP TIMELINE
 * ------------------------------------------------------------------------- */
function renderTimelines(education, responsibilities) {
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
 * 7. CONTACT SECTION & CLIPBOARD
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
 * 8. INTERACTIVE MODALS
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
        <span class="project-category-tag">${project.categoryLabel}</span>
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
      <ul class="project-achieve-list" style="margin-bottom: 1rem;">
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
  document.body.style.overflow = '';
};

/* -------------------------------------------------------------------------
 * 9. NAVIGATION & SCROLL TRACKING
 * ------------------------------------------------------------------------- */
function setupNavigation() {
  const navbar = document.querySelector('.navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');

  // Immediate active class switch on click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    if (current) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    }
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
 * 10. CONTACT FORM DISPATCH
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

    const mailtoLink = `mailto:${receiverEmail}?subject=${encodeURIComponent(subject || `Portfolio Inquiry from ${name}`)}&body=${encodeURIComponent(`Hi Prashik,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
    
    status.textContent = 'Opening your email client to send message directly to Prashik...';
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
