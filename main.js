/* ═══════════════════════════════════════════════════════════════
   PRESS PLAY — main.js
═══════════════════════════════════════════════════════════════ */

'use strict';

/* ── NAV: sticky scroll tint + mobile hamburger ── */
const nav        = document.getElementById('nav');
const hamburger  = document.getElementById('hamburger');
const navLinks   = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', String(isOpen));
});

// Close mobile nav when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

/* ── SCROLL REVEAL ── */
const revealTargets = [
  '.hero__tag',
  '.hero__headline',
  '.hero__sub',
  '.hero__actions',
  '.hero__stats',
  '.splash__left',
  '.prod-card',
  '.why__intro',
  '.why-item',
  '.step',
  '.ind-card',
  '.pillar',
  '.testi-card',
  '.quote-form',
  '.contact__item',
  '.hours-card',
];

// Apply .reveal class to each target
revealTargets.forEach(selector => {
  document.querySelectorAll(selector).forEach(el => {
    el.classList.add('reveal');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      observer.unobserve(entry.target);
      requestAnimationFrame(() => entry.target.classList.add('visible'));
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px',
});

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ── STAGGER CHILD ITEMS ── */
// Adds progressive delay so grid items reveal one by one
function staggerReveal(containerSelector, childSelector, delayStep = 80) {
  document.querySelectorAll(containerSelector).forEach(container => {
    container.querySelectorAll(childSelector).forEach((child, i) => {
      child.style.transitionDelay = `${i * delayStep}ms`;
    });
  });
}

staggerReveal('.prod-grid',  '.prod-card', 60);
staggerReveal('.steps',      '.step',      70);
staggerReveal('.ind-grid',   '.ind-card',  50);
staggerReveal('.why__items', '.why-item',  60);
staggerReveal('.mission__pillars', '.pillar', 80);

/* ── UPLOAD ZONE: filename feedback ── */
const uploadInput = document.getElementById('logoUpload');
const uploadZone  = document.getElementById('uploadZone');
const uploadText  = uploadZone ? uploadZone.querySelector('span') : null;

if (uploadInput && uploadText) {
  uploadInput.addEventListener('change', () => {
    const file = uploadInput.files[0];
    if (file) {
      uploadText.textContent = `✓ ${file.name}`;
      uploadZone.style.borderColor = '#E8187A';
      uploadZone.style.color = 'rgba(255,255,255,0.7)';
    }
  });

  // Drag & drop visual feedback
  uploadZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadZone.style.background = 'rgba(232, 24, 122, 0.12)';
    uploadZone.style.borderColor = '#E8187A';
  });
  uploadZone.addEventListener('dragleave', () => {
    uploadZone.style.background = '';
    uploadZone.style.borderColor = '';
  });
  uploadZone.addEventListener('drop', (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      uploadInput.files = e.dataTransfer.files;
      uploadText.textContent = `✓ ${file.name}`;
      uploadZone.style.background = '';
    }
  });
}

/* ── QUOTE FORM: validation + submission ── */
const quoteForm = document.getElementById('quoteForm');

if (quoteForm) {
  // Set the redirect URL dynamically so it works on any domain
  const formNext = document.getElementById('formNext');
  if (formNext) formNext.value = window.location.origin + '/?sent=1#quote';

  quoteForm.addEventListener('submit', (e) => {
    // Validate — only block submission if something is missing
    const required = quoteForm.querySelectorAll('[required]');
    let valid = true;

    required.forEach(field => {
      field.style.borderColor = '';
      if (!field.value.trim()) {
        field.style.borderColor = '#E8187A';
        valid = false;
      }
    });

    if (!valid) {
      e.preventDefault(); // stop here only when invalid
      const firstError = quoteForm.querySelector('[style*="E8187A"]');
      if (firstError) firstError.focus();
      return;
    }

    // Valid — update button and let the browser POST natively to Formsubmit
    const submitBtn = quoteForm.querySelector('.btn--submit');
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'SENDING...';
  });

  // Show success banner if redirected back after submission
  if (window.location.search.includes('sent=1')) {
    quoteForm.innerHTML = `
      <div style="
        text-align: center;
        padding: 48px 24px;
        background: rgba(232,24,122,0.08);
        border: 0.5px solid rgba(232,24,122,0.3);
        border-radius: 8px;
      ">
        <div style="
          width: 52px; height: 52px;
          background: #E8187A;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 18px;
        ">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20,6 9,17 4,12"/>
          </svg>
        </div>
        <p style="font-size:18px;font-weight:700;color:#fff;letter-spacing:0.04em;margin-bottom:8px;">QUOTE REQUEST SENT!</p>
        <p style="font-size:14px;color:rgba(255,255,255,0.5);line-height:1.7;">
          Thanks — we'll get back to you within 24 hours<br>with a custom quote for your order.
        </p>
      </div>
    `;
  }

  // Live border-color reset on input — deferred to avoid blocking paint (INP)
  quoteForm.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('input', () => {
      if (field.style.borderColor) {
        requestAnimationFrame(() => { field.style.borderColor = ''; });
      }
    });
  });
}

/* ── ACTIVE NAV LINK: highlight based on scroll position ── */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav__links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      requestAnimationFrame(() => {
        navAnchors.forEach(a => {
          a.style.color = '';
          if (a.getAttribute('href') === `#${id}`) {
            a.style.color = '#E8187A';
          }
        });
      });
    }
  });
}, { threshold: 0.35 });

sections.forEach(section => sectionObserver.observe(section));
