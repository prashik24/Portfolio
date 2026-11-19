/**
 * =========================================================================
 * PRASHIK HUMANE - MAIN JAVASCRIPT CONTROLLER
 * =========================================================================
 * 
 * Handles dynamic content population from data.js, category filtering,
 * interactive modals, contact form triggers, theme switching, and animations.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Ensure portfolioData is loaded
  const data = window.portfolioData;
  if (!data) {
    console.error("Portfolio data not found. Please ensure data.js is included before main.js.");
    return;
  }

  // 1. Theme Management (Dark / Light)
  initTheme();

  // 2. Render Hero & Personal Info
  renderHero(data.personal);

  // 3. Render Metrics & Stats
  renderMetrics(data.stats);

  // 4. Render Projects & Filter Mechanism
  renderProjects(data.projects);

  // 5. Render Achievements & Competitive Programming
  renderAchievements(data.achievements);

  // 6. Render Technical Skills
  renderSkills(data.skills);

  // 7. Render Education & Leadership Timeline
  renderTimelines(data.education, data.responsibilities);

  // 8. Render Contact Section & Copy To Clipboard
  renderContact(data.personal);

  // 9. Interactive Modals (Project Deep-Dive & Resume)
  setupModals(data);

  // 10. Navigation & Scroll Interactions
  setupNavigation();

  // 11. Contact Form Handling
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
 * 2. HERO & PERSONAL INFO
 * ------------------------------------------------------------------------- */
function renderHero(personal) {
  const nameEl = document.getElementById('hero-name');
  const roleEl = document.getElementById('hero-role');
  const bioEl = document.getElementById('hero-bio');
  const statusEl = document.getElementById('hero-status-text');

  if (nameEl) nameEl.textContent = personal.name;
  if (roleEl) {
    roleEl.innerHTML = `Full-Stack Software Engineer &amp; <strong>Competitive Programmer</strong>`;
  }
  if (bioEl) {
    bioEl.innerHTML = `Pre-final year Computer Science &amp; Business student at <strong>IIIT Lucknow</strong> (CGPA: ${personal.cgpa}). Proven builder of resilient distributed web systems, real-time architectures, and ML microservices. CodeChef <strong>4★ (1800)</strong> &amp; Codeforces <strong>Specialist (1572)</strong>.`;
  }
  if (statusEl) statusEl.textContent = personal.statusText;

  // Social Links in Hero
  const heroSocialsContainer = document.getElementById('hero-socials');
  if (heroSocialsContainer) {
    heroSocialsContainer.innerHTML = `
      <a href="${personal.socials.github}" target="_blank" rel="noopener noreferrer" class="social-pill" title="GitHub Profile">
        <i class="ri-github-fill"></i>
      </a>
      <a href="${personal.socials.linkedin}" target="_blank" rel="noopener noreferrer" class="social-pill" title="LinkedIn Profile">
        <i class="ri-linkedin-fill"></i>
      </a>
      <a href="${personal.socials.codechef}" target="_blank" rel="noopener noreferrer" class="social-pill" title="CodeChef 4★ (1800)">
        <i class="ri-star-line"></i>
      </a>
      <a href="${personal.socials.codeforces}" target="_blank" rel="noopener noreferrer" class="social-pill" title="Codeforces Specialist">
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
 * 3. METRICS BANNER
 * ------------------------------------------------------------------------- */
function renderMetrics(stats) {
  const container = document.getElementById('metrics-grid');
  if (!container) return;

  container.innerHTML = stats.map(stat => `
    <div class="metric-card ${stat.highlight ? 'highlight' : ''}">
      <div class="metric-val ${stat.highlight ? 'highlight-text' : ''}">${stat.value}</div>
      <div class="metric-label">${stat.label}</div>
      <div class="metric-sub">${stat.subtitle}</div>
    </div>
  `).join('');
}

/* -------------------------------------------------------------------------
 * 4. PROJECTS & FILTER MECHANISM
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

  container.innerHTML = filtered.map(project => `
    <article class="project-card" data-id="${project.id}">
      <div class="project-preview">
        <img src="${project.image}" alt="${project.title} Preview" loading="lazy" />
        <span class="project-category-tag">${project.categoryLabel}</span>
      </div>
      <div class="project-body">
        <div class="project-title">
          <h3>${project.title}</h3>
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
            <a href="${project.links.github}" target="_blank" rel="noopener noreferrer" class="project-link-btn">
              <i class="ri-github-line"></i> Source Code
            </a>
            ${project.links.demo ? `
              <a href="${project.links.demo}" target="_blank" rel="noopener noreferrer" class="project-link-btn">
                <i class="ri-external-link-line"></i> Live Demo
              </a>
            ` : ''}
          </div>
          <button class="project-deep-dive-btn" onclick="openProjectModal('${project.id}')">
            Architecture Details <i class="ri-arrow-right-line"></i>
          </button>
        </div>
      </div>
    </article>
  `).join('');
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
        <div class="achieve-icon-box" style="color: ${item.accent}; background: ${item.accent}15; border-color: ${item.accent}30;">
          <i class="ri-${item.icon === 'trophy' ? 'trophy-line' : item.icon === 'star' ? 'star-line' : item.icon === 'zap' ? 'flashlight-line' : item.icon === 'git-commit' ? 'git-commit-line' : 'shield-check-line'}"></i>
        </div>
        <span class="achieve-badge" style="background: ${item.accent}20; color: ${item.accent}; border: 1px solid ${item.accent}40;">
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
  // Education Timeline
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

  // Leadership & Responsibilities Timeline
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
    // Fallback for older browsers
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
 * 9. INTERACTIVE MODALS (Deep-Dive & Resume)
 * ------------------------------------------------------------------------- */
function setupModals(data) {
  // Close Modals on backdrop click or close button
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

  // ESC key listener to close modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllModals();
  });

  // Resume Modal Trigger
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
      <span class="project-category-tag" style="position: static; margin-bottom: 0.8rem; display: inline-block;">${project.categoryLabel}</span>
      <p style="font-size: 1.05rem; color: var(--text-secondary); line-height: 1.6;">${project.shortDescription}</p>
    </div>

    <div style="margin-bottom: 1.5rem;">
      <h4 style="font-size: 1.1rem; margin-bottom: 0.8rem; color: var(--text-main);">Technical Architecture &amp; Highlights</h4>
      <ul class="project-bullets" style="margin-bottom: 1rem;">
        ${project.highlights.map(h => `<li>${h}</li>`).join('')}
      </ul>
    </div>

    <div style="background: var(--bg-surface-elevated); padding: 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--border-light); margin-bottom: 1.5rem;">
      <h4 style="font-size: 0.95rem; margin-bottom: 0.5rem; color: var(--accent-cyan);">Key Engineering Metrics</h4>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem; font-size: 0.85rem;">
        ${Object.entries(project.stats || {}).map(([k, v]) => `
          <div>
            <div style="color: var(--text-muted); text-transform: capitalize;">${k}</div>
            <div style="color: var(--text-main); font-weight: 700; margin-top: 0.2rem;">${v}</div>
          </div>
        `).join('')}
      </div>
    </div>

    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <a href="${project.links.github}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
        <i class="ri-github-line"></i> View GitHub Repository
      </a>
      ${project.links.demo ? `
        <a href="${project.links.demo}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm">
          <i class="ri-external-link-line"></i> Live Deployment Link
        </a>
      ` : ''}
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
 * 10. NAVIGATION & SCROLL INTERACTIONS
 * ------------------------------------------------------------------------- */
function setupNavigation() {
  const navbar = document.querySelector('.navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');

  // Sticky Navbar blur on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active Section Indicator
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
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

  // Mobile Drawer Toggle
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
 * 11. CONTACT FORM HANDLING
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

    // Launch direct mail client so the message is reliably sent to Prashik's inbox
    const mailtoLink = `mailto:${receiverEmail}?subject=${encodeURIComponent(subject || `Portfolio Message from ${name}`)}&body=${encodeURIComponent(`Hi Prashik,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
    
    status.textContent = 'Opening your email client to send your message directly to Prashik...';
    status.className = 'form-status success';
    
    setTimeout(() => {
      window.location.href = mailtoLink;
      form.reset();
    }, 600);
  });
}

/* -------------------------------------------------------------------------
 * HELPER: TOAST NOTIFICATIONS
 * ------------------------------------------------------------------------- */
function showToast(message) {
  let toast = document.getElementById('toast-notice');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notice';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<i class="ri-checkbox-circle-fill"></i> ${message}`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}
