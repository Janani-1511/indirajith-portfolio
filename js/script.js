/**
 * INDIRAJITH T B — Personal Portfolio Script
 * Vanilla JavaScript Implementation
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --- Dynamic Copyright Year ---
  const currentYearEl = document.getElementById('currentYear');
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }

  // --- Header Sticky Behavior & Scroll Spy ---
  const siteHeader = document.getElementById('siteHeader');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const handleScroll = () => {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    // Header blur/border class
    if (siteHeader) {
      if (scrollY > 50) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    }

    // Active navigation link highlighting
    let currentSectionId = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 140;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (currentSectionId) {
      navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}` || link.getAttribute('href') === `index.html#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check

  // --- Mobile Navigation Drawer Toggle ---
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.classList.toggle('active', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close when clicking nav link
    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close on clicking outside
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove('open');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  // --- Scroll Reveal Animation ---
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    reveals.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback for older browsers
    reveals.forEach((el) => el.classList.add('visible'));
  }

  // --- Back To Top Smooth Scroll ---
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });
  }

  // --- Project Modal Popup System ---
  const projectModal = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalBody = document.getElementById('modalBody');

  const projectDetailsDatabase = {
    blindstick: {
      title: 'Solar Powered Blind Stick',
      subtitle: 'Assistive Navigation Device for Visually Impaired Individuals',
      category: 'Assistive Robotics · Embedded Hardware',
      year: '2025',
      summary:
        'A comprehensive hardware and embedded engineering project designed to enhance the autonomy, safety, and confidence of visually impaired people during outdoor and indoor navigation.',
      features: [
        'Integrated solar panel on the upper handle providing continuous trickle-charging to an onboard lithium polymer battery.',
        'High-precision ultrasonic transceivers scanning the forward path up to 2.5 meters for instant obstacle recognition.',
        'Dual alert output featuring distinct acoustic audio frequencies and localized haptic vibration pulses.',
        'Designed with a high strength-to-weight ratio ergonomic chassis ensuring comfortable prolonged use.',
        'Fail-safe battery backup with intelligent power management to prevent abrupt shutoffs in low sunlight.',
      ],
      tech: ['Arduino Microcontroller', 'Ultrasonic HC-SR04', 'Solar Photovoltaic Cell', 'Haptic Vibration Motor', 'Embedded C/C++', 'Power Management Circuit'],
      outcome:
        'Successfully prototyped and demonstrated in college and competitive reviews, achieving consistent real-time obstacle avoidance with near-zero latency and high user acceptance.',
    },
    smartfactory: {
      title: 'AI-Powered Smart Factory',
      subtitle: 'Digital Twin & Industrial Automation Telemetry Platform',
      category: 'Artificial Intelligence · Industry 4.0',
      year: '2025 – 2026',
      summary:
        'An intelligent industrial monitoring ecosystem merging real-time IoT sensor telemetry with digital twin modeling to preemptively forecast disruptions and optimize manufacturing floor productivity.',
      features: [
        'Real-time machine health telemetry tracking vibration, temperature, and cycle runtimes.',
        'Predictive risk analysis engine to flag impending component fatigue before line stoppage occurs.',
        'Dynamic dispatch and path re-planning for Autonomous Mobile Robots (AMR/AGV) based on shop floor congestion.',
        'Comprehensive web dashboard rendering 2D/3D status of assembly stations, raw material buffer, and active orders.',
      ],
      tech: ['Python', 'Digital Twin Frameworks', 'AI Machine Learning Models', 'AMR/AGV Fleet Routing', 'IoT Sensor Telemetry', 'RESTful Telemetry Services'],
      outcome:
        'Simulation trials demonstrated an estimated 18% reduction in bottleneck transit times and improved predictive maintenance responsiveness.',
    },
    jarvis: {
      title: 'Project J.A.R.V.I.S.',
      subtitle: 'Intelligent Voice-Assisted System & Automation Engine',
      category: 'Award Winner · National Level Project',
      year: 'September 2026',
      summary:
        'Secured 2nd Place at IGNITTRON’26, a National-Level Techno-Management Fest hosted by KPRIET, Coimbatore. Project J.A.R.V.I.S. is an autonomous, voice-driven execution system tailored for system operations, peripheral management, and computational workflows.',
      features: [
        'Secured 2nd prize at IGNITTRON’26 among dozens of top engineering college project submissions.',
        'Offline speech-to-text and intent parsing logic for fast, low-latency command execution.',
        'Modular plugin architecture enabling integration with connected smart hardware and local operating system utilities.',
        'Natural speech synthesis engine delivering feedback and system status reports.',
      ],
      tech: ['Python', 'Natural Language Processing', 'Speech Recognition', 'Hardware Automation', 'API Web Integrations', 'System Scripting'],
      outcome:
        'Praised by symposium judges for robust live command recognition, real-time peripheral control, and polished system responsiveness.',
    },
    hallhive: {
      title: 'Hall Hive & API Monitoring System',
      subtitle: 'Institutional Space Scheduling & API Uptime Telemetry',
      category: 'Full-Stack Web Development',
      year: '2025',
      summary:
        'A dual suite of productivity platforms: Hall Hive provides automated seminar hall reservation and conflict resolution, while the API Monitoring System continuously inspects endpoint availability, response latency, and operational health.',
      features: [
        'Interactive calendar-based hall availability tracker preventing overlapping departmental bookings.',
        'Automated approval routing with instant reservation status updates for staff and students.',
        'API health inspection pinging critical endpoints and recording response latencies.',
        'Intuitive reporting dashboard with historical uptime percentages and error logs.',
      ],
      tech: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'SQL Database', 'RESTful API Testing', 'Uptime Metrics'],
      outcome:
        'Eliminated manual paper scheduling for institutional event halls and provided clear, actionable latency diagnostics for web services.',
    },
  };

  const openModal = (projectId) => {
    const data = projectDetailsDatabase[projectId];
    if (!data || !modalBody || !projectModal) return;

    modalBody.innerHTML = `
      <div style="margin-bottom: 24px;">
        <div style="font-size: 0.72rem; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: var(--accent-brown); margin-bottom: 6px;">
          ${data.category} &middot; ${data.year}
        </div>
        <h2 style="font-family: var(--font-serif); font-size: 2rem; font-weight: 600; color: var(--text-charcoal); line-height: 1.2; margin-bottom: 6px;">
          ${data.title}
        </h2>
        <p style="font-size: 0.95rem; font-weight: 600; color: var(--accent-olive-dark);">
          ${data.subtitle}
        </p>
      </div>

      <div style="font-size: 0.95rem; color: var(--text-muted); line-height: 1.7; margin-bottom: 24px; padding-bottom: 18px; border-bottom: 1px solid var(--border-light);">
        ${data.summary}
      </div>

      <h4 style="font-family: var(--font-serif); font-size: 1.15rem; font-weight: 600; color: var(--text-charcoal); margin-bottom: 12px;">
        Key Architectural Features
      </h4>
      <ul style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 24px;">
        ${data.features
          .map(
            (feat) => `
          <li style="display: flex; gap: 10px; font-size: 0.9rem; color: var(--text-charcoal); line-height: 1.6;">
            <span style="color: var(--accent-olive); font-weight: 700;">&mdash;</span>
            <span>${feat}</span>
          </li>
        `
          )
          .join('')}
      </ul>

      <h4 style="font-family: var(--font-serif); font-size: 1.15rem; font-weight: 600; color: var(--text-charcoal); margin-bottom: 12px;">
        Technologies &amp; Frameworks
      </h4>
      <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 24px;">
        ${data.tech
          .map(
            (t) => `
          <span style="font-size: 0.78rem; font-weight: 500; padding: 4px 10px; background-color: var(--bg-card); border: 1px solid var(--border-taupe); border-radius: var(--radius-sm); color: var(--text-charcoal);">
            ${t}
          </span>
        `
          )
          .join('')}
      </div>

      <div style="background-color: var(--bg-beige); border: 1px solid var(--border-taupe); border-radius: var(--radius-sm); padding: 16px 20px;">
        <small style="display: block; font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: var(--accent-brown); margin-bottom: 4px;">Project Impact &amp; Results</small>
        <p style="font-size: 0.88rem; color: var(--text-charcoal); line-height: 1.6; margin: 0;">${data.outcome}</p>
      </div>
    `;

    projectModal.classList.add('active');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    if (!projectModal) return;
    projectModal.classList.remove('active');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.open-project-modal').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const proj = btn.getAttribute('data-project');
      if (proj) openModal(proj);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal && projectModal.classList.contains('active')) {
      closeModal();
    }
  });

  // --- Contact Form Submission Handling & Client Validation ---
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  const submitBtn = document.getElementById('submitBtn');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = contactForm.querySelector('#formName');
      const emailInput = contactForm.querySelector('#formEmail');
      const subjectInput = contactForm.querySelector('#formSubject');
      const messageInput = contactForm.querySelector('#formMessage');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const subject = subjectInput ? subjectInput.value.trim() : '';
      const message = messageInput ? messageInput.value.trim() : '';

      // Validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!name || !email || !subject || !message) {
        formStatus.className = 'form-status error';
        formStatus.textContent = 'Please fill out all required fields.';
        return;
      }

      if (!emailRegex.test(email)) {
        formStatus.className = 'form-status error';
        formStatus.textContent = 'Please provide a valid email address.';
        return;
      }

      // Simulate sending state
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending message...';
      }

      setTimeout(() => {
        formStatus.className = 'form-status success';
        formStatus.textContent = `Thank you, ${name}! Your message regarding "${subject}" has been received. Indirajith will contact you at ${email} shortly.`;
        contactForm.reset();

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `Send Message <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>`;
        }
      }, 700);
    });
  }
});
