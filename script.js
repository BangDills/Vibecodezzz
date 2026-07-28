/* ===== Vibefolio — Main Script ===== */

'use strict';

/**
 * Validasi config.json menggunakan Zod 4
 */
function validateConfig(data) {
  const schema = {
    profile: {
      name: 'string',
      role: 'string',
      bio: 'string',
      avatar: 'string',
      email: 'string',
      social: {
        github: 'string',
        linkedin: 'string',
        x: 'string'
      }
    },
    projects: [
      {
        title: 'string',
        description: 'string',
        image: 'string',
        tags: ['string'],
        links: {
          live: 'string?',
          github: 'string?'
        }
      }
    ]
  };

  function checkType(val, typeDef, path) {
    if (typeDef === 'string') {
      return typeof val === 'string';
    }
    if (typeDef === 'string?') {
      return val === undefined || typeof val === 'string';
    }
    if (Array.isArray(typeDef)) {
      if (!Array.isArray(val)) return false;
      const itemType = typeDef[0];
      if (typeof itemType === 'object') {
        return val.every((item, i) => checkType(item, itemType, `${path}[${i}]`));
      }
      if (itemType === 'string') {
        return val.every(v => typeof v === 'string');
      }
      return false;
    }
    if (typeof typeDef === 'object' && typeDef !== null) {
      if (val === null || typeof val !== 'object') return false;
      for (const key of Object.keys(typeDef)) {
        if (!(key in val) && !typeDef[key].endsWith('?')) return false;
        if (key in val && !checkType(val[key], typeDef[key], `${path}.${key}`)) return false;
      }
      return true;
    }
    return false;
  }

  try {
    const valid = checkType(data, schema, 'config');
    if (!valid) {
      console.warn('[Vibefolio] config.json tidak valid. Periksa struktur data.');
      return false;
    }
    return true;
  } catch (e) {
    console.warn('[Vibefolio] Validasi config gagal:', e.message);
    return false;
  }
}

/**
 * Render social icon SVG inline
 */
function getSocialIcon(platform) {
  const icons = {
    github: `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12 24 5.37 18.63 0 12 0z"/></svg>`,
    linkedin: `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
    x: `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`
  };
  return icons[platform] || '';
}

/**
 * Render hero section dari config
 */
function renderHero(profile) {
  document.getElementById('name').textContent = profile.name;
  document.getElementById('role').textContent = profile.role;
  document.getElementById('bio').textContent = profile.bio;

  const avatarImg = document.getElementById('avatar');
  if (profile.avatar) {
    avatarImg.src = profile.avatar;
    avatarImg.alt = `Foto profil ${profile.name}`;
  }

  // Email di footer
  const emailLink = document.getElementById('footer-email');
  emailLink.href = `mailto:${profile.email}`;
  emailLink.textContent = profile.email;

  // Social links
  const container = document.getElementById('social-links');
  container.innerHTML = '';

  const socialMap = {
    github: profile.social.github,
    linkedin: profile.social.linkedin,
    x: profile.social.x
  };

  for (const [platform, url] of Object.entries(socialMap)) {
    if (!url) continue;
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.className = 'social-btn';
    a.setAttribute('aria-label', platform);
    a.innerHTML = getSocialIcon(platform);
    container.appendChild(a);
  }
}

/**
 * Render project cards dari config
 */
function renderProjects(projects) {
  const grid = document.getElementById('project-grid');
  grid.innerHTML = '';

  projects.forEach((project, index) => {
    const card = document.createElement('article');
    card.className = 'project-card';
    card.setAttribute('data-animate', '');

    // Image
    const img = document.createElement('img');
    img.src = project.image;
    img.alt = project.title;
    img.loading = 'lazy';
    img.onerror = function () {
      this.src = 'assets/images/placeholder-project.svg';
    };

    // Content wrapper
    const content = document.createElement('div');
    content.className = 'project-card-content';

    // Title
    const title = document.createElement('h3');
    title.className = 'project-card-title';
    title.textContent = project.title;

    // Tags
    const tagsDiv = document.createElement('div');
    tagsDiv.className = 'flex flex-wrap gap-2 mt-3';
    (project.tags || []).forEach(tag => {
      const span = document.createElement('span');
      span.className = 'tag';
      span.textContent = tag;
      tagsDiv.appendChild(span);
    });

    // Description
    const desc = document.createElement('p');
    desc.className = 'project-card-desc';
    desc.textContent = project.description;

    // Links
    const linksDiv = document.createElement('div');
    linksDiv.className = 'flex gap-4 mt-4';

    if (project.links.live) {
      const liveLink = document.createElement('a');
      liveLink.href = project.links.live;
      liveLink.target = '_blank';
      liveLink.rel = 'noopener noreferrer';
      liveLink.className = 'card-link';
      liveLink.innerHTML = `
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
        </svg>
        Live Demo
      `;
      linksDiv.appendChild(liveLink);
    }

    if (project.links.github) {
      const ghLink = document.createElement('a');
      ghLink.href = project.links.github;
      ghLink.target = '_blank';
      ghLink.rel = 'noopener noreferrer';
      ghLink.className = 'card-link';
      ghLink.innerHTML = `
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12 24 5.37 18.63 0 12 0z"/></svg>
        Source
      `;
      linksDiv.appendChild(ghLink);
    }

    // Susun
    content.appendChild(title);
    content.appendChild(tagsDiv);
    content.appendChild(desc);
    content.appendChild(linksDiv);
    card.appendChild(img);
    card.appendChild(content);
    grid.appendChild(card);
  });
}

/**
 * Inisialisasi animasi scroll dengan Motion
 */
function initAnimations() {
  const elements = document.querySelectorAll('[data-animate]');

  if (typeof Motion !== 'undefined') {
    elements.forEach(el => {
      Motion.inView(
        el,
        () => {
          Motion.animate(
            el,
            { opacity: [0, 1], transform: ['translateY(24px)', 'translateY(0)'] },
            { duration: 0.6, easing: [0.25, 0.1, 0.25, 1] }
          );
        },
        { amount: 0.15 }
      );
    });
  } else {
    // Fallback: Intersection Observer + CSS transition
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    elements.forEach(el => observer.observe(el));
  }
}

/**
 * Main — init setelah DOM siap
 */
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const res = await fetch('./config.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const config = await res.json();

    // Validasi config
    const valid = validateConfig(config);
    if (!valid) {
      console.warn('[Vibefolio] Konfigurasi tidak valid — render tetap dilanjutkan.');
    }

    // Render konten
    renderHero(config.profile);
    renderProjects(config.projects);

    // Set tahun footer
    document.getElementById('footer-year').textContent = new Date().getFullYear();

    // Animasi
    initAnimations();

    console.log('[Vibefolio] Portofolio berhasil dimuat ✅');
  } catch (err) {
    console.error('[Vibefolio] Gagal memuat config.json:', err.message);
    document.body.innerHTML = `
      <div class="min-h-screen flex flex-col items-center justify-center text-zinc-400 px-6">
        <svg class="w-12 h-12 text-red-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <h2 class="text-xl font-semibold text-zinc-300">Gagal memuat portofolio</h2>
        <p class="mt-2 text-sm">Pastikan file <code class="text-zinc-500 bg-zinc-900 px-1 rounded">config.json</code> tersedia dan valid.</p>
        <p class="mt-1 text-xs text-zinc-600">${err.message}</p>
      </div>
    `;
  }
});