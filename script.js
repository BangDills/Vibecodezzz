/* ============================================
   Vibefolio — Main Application Script
   ============================================ */

import { animate, inView } from 'https://cdn.jsdelivr.net/npm/motion@11.18.2/+esm';

const CONFIG_PATH = './config.json';

/* ============================================
   DOM References
   ============================================ */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

const els = {
  app: $('#app'),
  hero: $('#hero'),
  projects: $('#projects'),
  footer: $('#footer'),
};

/* ============================================
   Validation (lightweight)
   ============================================ */
function validateConfig(data) {
  const errors = [];

  if (!data || typeof data !== 'object') {
    errors.push('Config harus berupa objek JSON yang valid.');
    return { valid: false, errors };
  }

  // Profile validation
  if (!data.profile) errors.push('Field "profile" wajib diisi.');
  else {
    if (!data.profile.name || typeof data.profile.name !== 'string') errors.push('profile.name wajib diisi (string).');
    if (!data.profile.email || typeof data.profile.email !== 'string') errors.push('profile.email wajib diisi (string).');
  }

  // Projects validation
  if (!data.projects || !Array.isArray(data.projects)) {
    errors.push('Field "projects" wajib diisi (array).');
  } else {
    data.projects.forEach((p, i) => {
      if (!p.title) errors.push(`projects[${i}].title wajib diisi.`);
      if (!p.description) errors.push(`projects[${i}].description wajib diisi.`);
      if (!p.image) errors.push(`projects[${i}].image wajib diisi.`);
    });
  }

  return { valid: errors.length === 0, errors };
}

/* ============================================
   Render Functions
   ============================================ */

function renderNavbar() {
  return `
    <nav class="navbar">
      <div class="navbar-inner">
        <span class="navbar-brand">✦ vibefolio</span>
        <ul class="navbar-links">
          <li><a href="#hero">Beranda</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#footer">Kontak</a></li>
        </ul>
      </div>
    </nav>
  `;
}

function renderHero(profile) {
  const socialIcons = {
    github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
  };

  // Filter social links that exist
  const socialKeys = Object.keys(profile.social || {});
  const socialHTML = socialKeys
    .filter((key) => profile.social[key])
    .map((key) => {
      const icon = socialIcons[key] || '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="12"/></svg>';
      return `<a href="${profile.social[key]}" class="social-link" target="_blank" rel="noopener noreferrer" aria-label="${key}">${icon}</a>`;
    })
    .join('');

  return `
    <section id="hero" class="hero">
      <div class="container" style="display:flex;flex-direction:column;align-items:center;">
        <img src="${profile.avatar}" alt="${profile.name}" class="hero-avatar" data-animate="hero" onerror="this.style.display='none'" />
        <h1 class="hero-name" data-animate="hero">${profile.name}</h1>
        <p class="hero-role" data-animate="hero">${profile.role || ''}</p>
        <p class="hero-bio" data-animate="hero">${profile.bio || ''}</p>
        <div class="social-links" data-animate="hero">
          ${socialHTML || '<span style="color:var(--text-tertiary);font-size:14px;">Belum ada tautan sosial</span>'}
        </div>
      </div>
    </section>
  `;
}

function renderProjects(projects) {
  if (!projects || projects.length === 0) {
    return `
      <section id="projects" class="projects-section">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">Projects</h2>
            <p class="section-subtitle">Belum ada project yang ditambahkan.</p>
          </div>
        </div>
      </section>
    `;
  }

  const cards = projects
    .map(
      (project, index) => `
      <article class="project-card" data-animate="project" data-delay="${index * 80}">
        <img src="${project.image}" alt="${project.title}" class="project-image" loading="lazy" onerror="this.style.display='none'" />
        <div class="project-body">
          <h3 class="project-title">${project.title}</h3>
          <p class="project-description">${project.description}</p>
          ${project.tags && project.tags.length > 0
            ? `<div class="project-tags">${project.tags.map((tag) => `<span class="project-tag">${tag}</span>`).join('')}</div>`
            : ''}
          <div class="project-links">
            ${project.links?.live
              ? `<a href="${project.links.live}" class="project-link" target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                  Live
                </a>`
              : ''}
            ${project.links?.github
              ? `<a href="${project.links.github}" class="project-link" target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                  Source
                </a>`
              : ''}
          </div>
        </div>
      </article>
    `
    )
    .join('');

  return `
    <section id="projects" class="projects-section">
      <div class="container">
        <div class="section-header" data-animate="section">
          <h2 class="section-title">Projects</h2>
          <p class="section-subtitle">Beberapa karya yang telah saya bangun.</p>
        </div>
        <div class="project-grid">
          ${cards}
        </div>
      </div>
    </section>
  `;
}

function renderFooter(profile) {
  const year = new Date().getFullYear();
  return `
    <footer id="footer" class="footer">
      <div class="container">
        ${profile.email
          ? `<a href="mailto:${profile.email}" class="footer-email">${profile.email}</a>`
          : ''}
        <p class="footer-copyright">&copy; ${year} ${profile.name || 'Vibefolio'}. All rights reserved.</p>
      </div>
    </footer>
  `;
}

function renderError(message) {
  return `
    <div class="error-state">
      <div class="error-icon">⚠</div>
      <h2 class="error-title">Gagal memuat portofolio</h2>
      <p class="error-message">${message || 'Terjadi kesalahan saat memuat data. Pastikan file config.json tersedia dan valid.'}</p>
    </div>
  `;
}

function renderLoading() {
  return `
    <div class="loading-state">
      <div class="loading-spinner"></div>
      <p class="loading-text">Memuat portofolio...</p>
    </div>
  `;
}

/* ============================================
   Animation Setup (Motion)
   ============================================ */
function setupAnimations() {
  // Hero entrance: fade in + slide up
  const heroElements = $$('[data-animate="hero"]');
  heroElements.forEach((el, i) => {
    animate(
      el,
      { opacity: [0, 1], y: [24, 0] },
      { duration: 0.6, delay: i * 0.12, easing: 'ease-out' }
    );
  });

  // Section header
  const sectionHeaders = $$('[data-animate="section"]');
  sectionHeaders.forEach((el) => {
    inView(el, () => {
      animate(
        el,
        { opacity: [0, 1], y: [20, 0] },
        { duration: 0.5, easing: 'ease-out' }
      );
    });
  });

  // Project cards: staggered on scroll
  const projectCards = $$('[data-animate="project"]');
  projectCards.forEach((card) => {
    const delay = parseInt(card.dataset.delay) || 0;
    inView(card, () => {
      animate(
        card,
        { opacity: [0, 1], y: [24, 0] },
        { duration: 0.5, delay: delay / 1000, easing: 'ease-out' }
      );
    });
  });

  // Footer fade in
  const footer = document.querySelector('.footer');
  if (footer) {
    inView(footer, () => {
      animate(
        footer,
        { opacity: [0, 1] },
        { duration: 0.6, easing: 'ease-out' }
      );
    });
  }
}

/* ============================================
   Bootstrap
   ============================================ */

async function init() {
  const app = els.app;
  if (!app) return;

  try {
    // Show loading state
    app.innerHTML = renderNavbar() + renderLoading();

    // Fetch config
    const res = await fetch(CONFIG_PATH, {
      headers: { Accept: 'application/json' },
    });

    if (!res.ok) {
      throw new Error(`Gagal memuat config.json (HTTP ${res.status}). Pastikan file tersedia.`);
    }

    const data = await res.json();

    // Validate
    const { valid, errors } = validateConfig(data);
    if (!valid) {
      throw new Error(`Konfigurasi tidak valid:\n${errors.join('\n')}`);
    }

    const { profile, projects } = data;

    // Render all sections
    const navbar = renderNavbar();
    const hero = renderHero(profile);
    const projectSection = renderProjects(projects);
    const footer = renderFooter(profile);

    app.innerHTML = navbar + hero + projectSection + footer;

    // Setup animations after render
    requestAnimationFrame(() => {
      setupAnimations();
    });

    // Update document title
    document.title = `${profile.name} — Vibefolio`;

    // Log success
    console.info('✓ Vibefolio berhasil dimuat');
  } catch (err) {
    console.error('✗ Vibefolio error:', err);
    app.innerHTML = renderNavbar() + renderError(err.message);
  }
}

// Start
init();
