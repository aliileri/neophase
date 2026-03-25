/* ============================================
   NeoPhase — Splash-first Experience
   3D intro → click → animated transition → sequential content reveal
   ============================================ */

(function () {
  'use strict';

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ==========================================
     i18n — Translation Dictionaries
     ========================================== */
  const translations = {
    tr: {
      splash_hint: 'Keşfetmek için tıklayın',
      nav_why: 'Neden',
      nav_modules: 'Modüller',
      nav_contact: 'İletişim',
      hero_title: 'Şantiye ve İmalat Operasyonlarında <span class="text-gradient">«Sıfır Hata, Tam Kontrol»</span> Dönemi',
      hero_desc: 'Projelerinizde net, hızlı ve ölçülebilir dijital yönetim. Endüstriyel boru imalatı, kalite kontrol ve montaj süreçlerinizi manuel Excel tablolarından kurtarın.',
      hero_cta: 'Demo Talep Edin',
      why_pill: 'Neden NeoPhase & TERMINAL?',
      why_title: 'Operasyonunuzu Gider Merkezinden, <span class="text-gradient">Kâr Merkezine</span> Dönüştürün.',
      why_card1_title: 'Günlerden Dakikalara İnen Raporlama',
      why_card1_desc: 'Kalite ekiplerinizin saatlerini alan İmalat Onay Formları ve NDT raporları tek tıkla, saniyeler içinde hazır.',
      why_card2_title: 'Sahadan Anlık, «Temiz» Veri',
      why_card2_desc: 'Tablet ve telefon üzerinden kolayca veri girişi. Sıfır eğitim gerektiren sezgisel arayüz.',
      why_card3_title: 'Anında Validasyon ile Hata Önleme',
      why_card3_desc: 'Sertifika veya malzeme uyuşmazlığını sistem anında yakalar ve uyarır.',
      why_card4_title: 'Gizli Maliyet Yok',
      why_card4_desc: 'Kullanıcı başı lisans ücreti yok. Sınırsız kullanıcı, aylık sabit hizmet bedeli.',
      what_pill: 'Modüllerimiz',
      what_title: 'Ne <span class="text-gradient">Sunuyoruz</span>?',
      mod1_title: 'Kalite ve Kaynak Yönetimi (Weld Log & NDT)',
      mod1_desc: 'Kaynakçı performansları, WQT yeterlilikleri ve test paketlerinizi tek merkezden yönetin.',
      mod2_title: 'Malzeme ve «Heat No» İzlenebilirliği',
      mod2_desc: 'Her sac, profil ve sarf malzemenin Heat No takibini yapın. Sertifikalar otomatik eşleşir.',
      mod3_title: 'Spool & İzometri Takibi',
      mod3_desc: 'Üretim, boya, nakliye ve sahaya varışı izometrik çizim bazlı olarak anlık takip edin.',
      mod4_title: '«Zero-Touch» Dokümantasyon',
      mod4_desc: 'NDT raporları, sertifikalar ve kontrol formları otomatik paketlenir.',
      mod5_title: 'SAP/ERP Entegrasyonu',
      mod5_desc: 'Saha verisini toplar, temizler ve REST API ile SAP\'ye aktarır.',
      mod6_title: 'AI Destekli Dashboardlar',
      mod6_desc: 'Projenin Ahead/Behind durumunu canlı izleyin. AI olası riskleri önceden analiz eder.',
      cta_title: 'Sahadaki Karmaşaya Son Vermeye <span class="text-gradient">Hazır Mısınız?</span>',
      cta_desc: '30 dakikalık bir sistem demosu planlayalım.',
      cta_btn: 'Bizimle İletişime Geçin',
      contact_email_label: 'E-posta:',
      contact_phone_label: 'WhatsApp / Telefon:',
      footer_desc: 'TERMINAL ile şantiye ve imalat operasyonlarında sıfır hata, tam kontrol.',
      footer_rights: 'Tüm hakları saklıdır.'
    },
    en: {
      splash_hint: 'Click to explore',
      nav_why: 'Why',
      nav_modules: 'Modules',
      nav_contact: 'Contact',
      hero_title: 'The <span class="text-gradient">«Zero Error, Full Control»</span> Era for Site & Manufacturing',
      hero_desc: 'Clear, fast, measurable digital management for your projects. Move industrial pipe fabrication, quality control and assembly out of manual Excel.',
      hero_cta: 'Request a Demo',
      why_pill: 'Why NeoPhase & TERMINAL?',
      why_title: 'Turn Your Operation from a <span class="text-gradient">Cost</span> Centre into a <span class="text-gradient">Profit</span> Centre.',
      why_card1_title: 'Reporting from Days to Minutes',
      why_card1_desc: 'Manufacturing approval forms and NDT reports ready in seconds, one click.',
      why_card2_title: 'Instant, "Clean" Data from the Field',
      why_card2_desc: 'Easy data entry on tablet and phone. Zero-training, intuitive UI.',
      why_card3_title: 'Validation That Prevents Errors',
      why_card3_desc: 'The system catches certificate or material mismatches and alerts immediately.',
      why_card4_title: 'No Hidden Costs',
      why_card4_desc: 'No per-user licence fees. Unlimited users, fixed monthly service fee.',
      what_pill: 'Our modules',
      what_title: 'What do we <span class="text-gradient">offer</span>?',
      mod1_title: 'Quality & welding management (Weld Log & NDT)',
      mod1_desc: 'Manage welder performance, WQT qualifications and test packages from one place.',
      mod2_title: 'Materials & "Heat No" traceability',
      mod2_desc: 'Track Heat No for every plate, profile and consumable. Certificates auto-match.',
      mod3_title: 'Spool & isometric tracking',
      mod3_desc: 'Follow fabrication, paint, logistics and site arrival against isometrics.',
      mod4_title: '"Zero-touch" documentation',
      mod4_desc: 'NDT reports, certificates and checklists auto-packaged.',
      mod5_title: 'SAP/ERP integration',
      mod5_desc: 'Collects field data, cleans it and pushes to SAP via REST API.',
      mod6_title: 'AI-powered dashboards',
      mod6_desc: 'See Ahead/Behind status live. AI analyses quality risks proactively.',
      cta_title: 'Ready to end <span class="text-gradient">field chaos</span>?',
      cta_desc: 'Let\'s schedule a 30-minute system demo.',
      cta_btn: 'Contact us',
      contact_email_label: 'Email:',
      contact_phone_label: 'WhatsApp / phone:',
      footer_desc: 'TERMINAL: zero-error, full-control site and manufacturing operations.',
      footer_rights: 'All rights reserved.'
    },
    de: {
      splash_hint: 'Klicken zum Entdecken',
      nav_why: 'Warum',
      nav_modules: 'Module',
      nav_contact: 'Kontakt',
      hero_title: 'Das Zeitalter <span class="text-gradient">«Null Fehler, volle Kontrolle»</span> auf der Baustelle',
      hero_desc: 'Klares, schnelles und messbares digitales Management. Rohrleitungsfertigung, Qualitätskontrolle und Montage aus dem Excel-Alltag holen.',
      hero_cta: 'Demo anfragen',
      why_pill: 'Warum NeoPhase & TERMINAL?',
      why_title: 'Vom <span class="text-gradient">Kosten-</span> zum <span class="text-gradient">Ertrags-</span>zentrum',
      why_card1_title: 'Reporting: von Tagen zu Minuten',
      why_card1_desc: 'Fertigungsfreigaben und NDT-Berichte in Sekunden – ein Klick.',
      why_card2_title: 'Sofortige, „saubere" Daten vom Feld',
      why_card2_desc: 'Erfassung auf Tablet und Smartphone. Intuitive Oberfläche ohne Schulung.',
      why_card3_title: 'Validierung verhindert Fehler',
      why_card3_desc: 'Zertifikats- oder Materialabweichungen werden sofort erkannt und gemeldet.',
      why_card4_title: 'Keine versteckten Kosten',
      why_card4_desc: 'Keine Nutzerlizenzen. Unbegrenzte Nutzer, monatlicher Festpreis.',
      what_pill: 'Unsere Module',
      what_title: 'Was <span class="text-gradient">bieten</span> wir?',
      mod1_title: 'Qualität & Schweißmanagement (Weld Log & NDT)',
      mod1_desc: 'Schweißerleistung, WQT-Qualifikationen und Testpakete zentral steuern.',
      mod2_title: 'Material & „Heat No"-Rückverfolgbarkeit',
      mod2_desc: 'Heat No für Blech, Profile und Verbrauchsmaterial. Zertifikate automatisch zugeordnet.',
      mod3_title: 'Spool- & Isometrie-Tracking',
      mod3_desc: 'Fertigung, Lack, Logistik und Anlieferung isometriebasiert verfolgen.',
      mod4_title: '„Zero-touch"-Dokumentation',
      mod4_desc: 'NDT-Berichte, Zertifikate und Prüfungen automatisch paketiert.',
      mod5_title: 'SAP/ERP-Integration',
      mod5_desc: 'Felddaten sammeln, bereinigen und per REST API an SAP übergeben.',
      mod6_title: 'KI-gestützte Dashboards',
      mod6_desc: 'Ahead/Behind live sehen. KI analysiert Qualitätsrisiken proaktiv.',
      cta_title: 'Bereit, dem <span class="text-gradient">Chaos</span> ein Ende zu setzen?',
      cta_desc: '30-minütige Systemdemo planen.',
      cta_btn: 'Kontakt aufnehmen',
      contact_email_label: 'E-Mail:',
      contact_phone_label: 'WhatsApp / Telefon:',
      footer_desc: 'TERMINAL: Null Fehler, volle Kontrolle auf Baustelle und in der Fertigung.',
      footer_rights: 'Alle Rechte vorbehalten.'
    }
  };

  const langLabels = { tr: 'TR', en: 'EN', de: 'DE' };

  /* ─── Language Switcher ─── */
  function initLanguageSwitcher() {
    const switcher = document.getElementById('lang-switcher');
    const toggle = document.getElementById('lang-toggle');
    const dropdown = document.getElementById('lang-dropdown');
    if (!switcher || !toggle || !dropdown) return;

    const saved = localStorage.getItem('neophase-lang') || 'tr';
    if (saved !== 'tr') applyLang(saved);

    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      switcher.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(switcher.classList.contains('open')));
    });

    document.addEventListener('click', () => {
      switcher.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
    dropdown.addEventListener('click', (e) => e.stopPropagation());

    dropdown.querySelectorAll('.lang-option').forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        applyLang(lang);
        localStorage.setItem('neophase-lang', lang);
        dropdown.querySelectorAll('.lang-option').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cl = document.getElementById('current-lang');
        if (cl) cl.textContent = langLabels[lang] || lang.toUpperCase();
        switcher.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  function applyLang(lang) {
    const dict = translations[lang];
    if (!dict) return;
    document.documentElement.setAttribute('lang', lang);
    const cl = document.getElementById('current-lang');
    if (cl) cl.textContent = langLabels[lang] || lang.toUpperCase();
    const dropdown = document.getElementById('lang-dropdown');
    if (dropdown) {
      dropdown.querySelectorAll('.lang-option').forEach(b => {
        b.classList.toggle('active', b.getAttribute('data-lang') === lang);
      });
    }
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) el.textContent = dict[key];
    });
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.getAttribute('data-i18n-html');
      if (dict[key] !== undefined) el.innerHTML = dict[key];
    });
  }


  /* ==========================================================
     SPLASH — Full-screen 3D, click → 3s transition → site
     ========================================================== */
  function initSplash() {
    const splash = document.getElementById('splash');
    const navbar = document.getElementById('navbar');
    const main = document.getElementById('main');
    if (!splash || !navbar || !main) return;

    // Skip splash if already done this session (only on same-page navigation, not fresh loads)
    if (sessionStorage.getItem('np-splash-done') && document.referrer.includes(location.hostname)) {
      splash.classList.add('splash--done');
      navbar.classList.add('show');
      main.classList.remove('main--hidden');
      main.classList.add('main--visible');
      revealAllItems();
      return;
    }
    // Always clear on fresh visit
    sessionStorage.removeItem('np-splash-done');

    // Lock scroll (iOS fix: use class instead of just overflow)
    document.body.classList.add('splash-open');

    let entered = false;
    function enter(e) {
      if (e && e.type === 'touchend') e.preventDefault();
      if (entered) return;
      entered = true;
      sessionStorage.setItem('np-splash-done', '1');

      // Phase 1: 3D büyüyerek erir, arka plan beyaz olur (4s)
      splash.classList.add('splash--transitioning');

      // Phase 2 (3.7s): splash overlay kaybolur, içerik başlar
      setTimeout(() => {
        splash.classList.add('splash--exit');
        document.body.classList.remove('splash-open');

        main.classList.remove('main--hidden');
        main.classList.add('main--visible');
        navbar.classList.add('show');
        revealSequentially(400);
      }, 3700);

      // Phase 3 (4.2s): splash tamamen kaldırılır
      setTimeout(() => {
        splash.classList.add('splash--done');
      }, 4200);
    }

    const overlay = document.getElementById('splash-overlay');
    const target = overlay || splash;

    target.addEventListener('click', enter);
    target.addEventListener('touchend', enter, { passive: false });
    splash.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); enter(); }
    });

    // Auto-skip after 12s if user doesn't tap (mobile Spline load timeout)
    setTimeout(() => { if (!entered) enter(); }, 12000);

    // Splash particles
    initSplashParticles();
  }

  function revealSequentially(interval) {
    const items = document.querySelectorAll('.reveal-item');
    const hero = document.getElementById('hero-top');
    items.forEach((item, i) => {
      setTimeout(() => {
        item.classList.add('revealed');
        // Light up hero glow on first reveal
        if (i === 0 && hero) hero.classList.add('hero--lit');
      }, i * interval);
    });
  }

  function revealAllItems() {
    document.querySelectorAll('.reveal-item').forEach(el => el.classList.add('revealed'));
    const hero = document.getElementById('hero-top');
    if (hero) hero.classList.add('hero--lit');
  }

  /* ─── Splash Particles (dark bg) ─── */
  function initSplashParticles() {
    if (prefersReduced) return;
    const canvas = document.getElementById('splash-particles');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles = [], w, h, raf;
    const COUNT = 50, MAX_SPEED = 0.25, CONNECTION_DIST = 130;

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }

    function mkP() {
      return {
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * MAX_SPEED,
        vy: (Math.random() - 0.5) * MAX_SPEED,
        size: 1 + Math.random() * 1.5,
        opacity: 0.2 + Math.random() * 0.3
      };
    }

    resize();
    for (let i = 0; i < COUNT; i++) particles.push(mkP());
    window.addEventListener('resize', resize);

    function draw() {
      const splash = document.getElementById('splash');
      if (!splash || splash.classList.contains('splash--done')) {
        cancelAnimationFrame(raf);
        return;
      }
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < CONNECTION_DIST) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(99,102,241,${(1 - d / CONNECTION_DIST) * 0.15})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(140,130,255,${p.opacity})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    }
    draw();
  }


  /* ─── Hero Particle System (light bg) ─── */
  function initParticles() {
    if (prefersReduced) return;
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles = [];
    let w, h;
    const COUNT = 40, MAX_SPEED = 0.3, SIZE_MIN = 1, SIZE_MAX = 2.5, CONN_DIST = 120;

    function resize() {
      const hero = canvas.parentElement;
      if (!hero) return;
      w = hero.offsetWidth;
      h = hero.offsetHeight;
      canvas.width = w;
      canvas.height = h;
    }

    function mkP() {
      return {
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * MAX_SPEED,
        vy: (Math.random() - 0.5) * MAX_SPEED,
        size: SIZE_MIN + Math.random() * (SIZE_MAX - SIZE_MIN),
        opacity: 0.15 + Math.random() * 0.25
      };
    }

    resize();
    for (let i = 0; i < COUNT; i++) particles.push(mkP());

    function draw() {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONN_DIST) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(99,102,241,${(1 - dist / CONN_DIST) * 0.08})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99,102,241,${p.opacity})`;
        ctx.fill();
      });
      requestAnimationFrame(draw);
    }

    draw();
    window.addEventListener('resize', resize);
  }


  /* ─── Scroll Animations (cards inside sections) ─── */
  function initScrollAnimations() {
    if (prefersReduced) {
      document.querySelectorAll('.animate-on-scroll').forEach(el => el.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
  }


  /* ─── Mobile Navigation ─── */
  function initMobileNav() {
    const toggle = document.getElementById('mobile-toggle');
    const nav = document.getElementById('mobile-nav');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.contains('open');
      nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(!isOpen));
      const icon = toggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars', isOpen);
        icon.classList.toggle('fa-xmark', !isOpen);
      }
    });

    nav.querySelectorAll('[data-mobile-link]').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        const icon = toggle.querySelector('i');
        if (icon) { icon.classList.add('fa-bars'); icon.classList.remove('fa-xmark'); }
      });
    });
  }


  /* ─── Smooth Scroll ─── */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        if (!targetId || targetId === '#') return;
        const target = document.querySelector(targetId);
        if (!target) return;
        e.preventDefault();
        const navH = document.getElementById('navbar')?.offsetHeight || 64;
        const y = target.getBoundingClientRect().top + window.pageYOffset - navH - 16;
        window.scrollTo({ top: y, behavior: prefersReduced ? 'auto' : 'smooth' });
      });
    });
  }


  /* ─── Active Nav Link Highlight ─── */
  function initActiveNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-links a');
    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
              link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
            });
          }
        });
      },
      { threshold: 0.3, rootMargin: '-80px 0px -50% 0px' }
    );

    sections.forEach(section => observer.observe(section));
  }


  /* ─── Bento Card Spotlight ─── */
  function initSpotlightEffect() {
    if (prefersReduced) return;
    document.querySelectorAll('.bento-card').forEach(card => {
      const spotlight = card.querySelector('.spotlight');
      if (!spotlight) return;
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        spotlight.style.background = `radial-gradient(300px circle at ${x}px ${y}px, rgba(99,102,241,0.06), transparent 60%)`;
      });
      card.addEventListener('mouseenter', () => { spotlight.style.opacity = '1'; });
      card.addEventListener('mouseleave', () => { spotlight.style.opacity = '0'; });
    });
  }


  /* ─── Navbar Scroll Enhancement ─── */
  function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    let ticking = false;
    function update() {
      navbar.style.boxShadow = window.scrollY > 20 ? '0 1px 3px rgba(0,0,0,0.06)' : 'none';
      ticking = false;
    }
    window.addEventListener('scroll', () => {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
  }


  /* ─── Spline Viewer branding hide ─── */
  function hideSplineBranding(viewer) {
    const sr = viewer.shadowRoot;
    if (!sr) return;
    // Try all known selectors for the badge
    ['#logo', 'a[href*="spline"]', '[class*="logo"]', '[class*="brand"]', '[class*="watermark"]'].forEach(sel => {
      sr.querySelectorAll(sel).forEach(el => el.style.setProperty('display', 'none', 'important'));
    });
    // Inject a style tag into shadow root as a fallback
    if (!sr.querySelector('style[data-np]')) {
      const s = document.createElement('style');
      s.setAttribute('data-np', '1');
      s.textContent = '#logo,a[href*="spline"],[class*="logo"],[class*="brand"],[class*="watermark"]{display:none!important}';
      sr.appendChild(s);
    }
  }

  function initSplineBranding() {
    document.querySelectorAll('spline-viewer').forEach(viewer => {
      // On load
      viewer.addEventListener('load-complete', () => hideSplineBranding(viewer));
      // Also watch shadow DOM mutations
      const tryHide = () => { if (viewer.shadowRoot) hideSplineBranding(viewer); };
      setTimeout(tryHide, 500);
      setTimeout(tryHide, 1500);
      setTimeout(tryHide, 3000);
    });
  }


  /* ─── Init ─── */
  document.addEventListener('DOMContentLoaded', () => {
    initSplash();
    initLanguageSwitcher();
    initParticles();
    initScrollAnimations();
    initMobileNav();
    initSmoothScroll();
    initActiveNavHighlight();
    initSpotlightEffect();
    initSplineBranding();
    initNavbarScroll();
  });
})();
