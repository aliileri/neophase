/* ============================================
   NeoPhase — Magic UI Inspired Interactions
   Particle system, number ticker, blur fade,
   spotlight, language switcher, text shimmer
   ============================================ */

(function () {
  'use strict';

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ==========================================
     i18n — Translation Dictionaries
     ========================================== */
  const translations = {
    tr: {
      nav_why: 'Neden',
      nav_stats: 'Rakamlar',
      nav_modules: 'Modüller',
      nav_refs: 'Referanslar',
      hero_badge: 'Şantiye dijital yönetim platformu',
      hero_title: 'Projelerinizde <span class="text-gradient">net, hızlı</span> ve <span class="text-gradient">ölçülebilir</span> dijital yönetim.',
      hero_desc: 'Planlama, kalite, malzeme ve ekipman, iş güvenliği ve maliyet yönetimi süreçlerini uçtan uca dijitalleştirir; veriyi tek platformda toplar ve yönetimi kolaylaştırır.',
      hero_explore: 'Keşfet',
      chip_fast: 'Hızlı devreye alma',
      chip_integrate: 'Kolay entegrasyon',
      chip_measurable: 'Ölçülebilir fayda',
      chip_modular: 'Modüler',
      why_pill: 'Neden NeoPhase',
      why_title: 'Operasyonunuzu <span class="text-gradient">dönüştürün</span>',
      why_desc: 'NeoPhase ile sahada zaman kaybını azaltın, kaliteyi artırın ve proje risklerini minimuma indirin.',
      why_card1_title: 'Kolay Kullanım',
      why_card1_desc: 'Hiç eğitim gerektirmez. Herkes ilk günden rahatça kullanır. Sezgisel arayüz, hızlı adaptasyon.',
      why_card2_title: 'Hızlı Başlangıç',
      why_card2_desc: 'Tüm süreçleri kısa sürede dijitale taşıyın. Kurulum günler değil, saatler alır.',
      why_card3_title: 'Anında Katkı',
      why_card3_desc: 'Operasyon hızlanır, maliyetler düşer, ekibiniz rahatlar. İlk haftadan ölçülebilir sonuç.',
      stat1_label: 'Tamamlanan Proje',
      stat2_label: 'Aktif Kullanıcı',
      stat3_label: 'Modül',
      stat4_label: 'Maliyet Tasarrufu',
      what_pill: 'Modüller',
      what_title: 'Ne <span class="text-gradient">sunuyoruz</span>?',
      what_desc: 'Tüm proje süreçlerinizi dijitalleştiriyoruz. Planlama, kalite, İSG, proje yönetimi, maliyet kontrolü — hepsi tek platformda.',
      mod1_title: 'Planlama & Kalite',
      mod1_desc: 'Proje planları, kalite kontrol/denetim, NCR takibi, kalite günlükleri, standart yönetimi.',
      mod2_title: 'İSG & Güvenlik',
      mod2_desc: 'İş güvenliği denetimleri, risk değerlendirmeleri, eğitim takibi, kaza raporları, güvenlik protokolleri.',
      mod3_title: 'Proje Yönetimi',
      mod3_desc: 'Görev atamaları, ilerleme takibi, kaynak yönetimi, zaman çizelgeleri, milestone kontrolü.',
      mod4_title: 'Maliyet & Analiz',
      mod4_desc: 'Bütçe takibi, maliyet analizi, ROI hesaplamaları, performans metrikleri, detaylı raporlama.',
      mod5_title: 'Mobil & Offline',
      mod5_desc: 'Sahada foto/video kayıt, QR kod tarama, offline veri girişi, anlık senkronizasyon.',
      mod6_title: 'Entegrasyon',
      mod6_desc: 'REST/GraphQL API, Excel/CSV import/export, mevcut sistemlerle bağlantı, otomatik veri akışı.',
      mod7_title: 'Akıllı Raporlama',
      mod7_desc: 'Gerçek zamanlı dashboardlar, özelleştirilebilir raporlar, trend analizi, otomatik uyarılar.',
      ref_pill: 'Referanslar',
      ref_title: 'Sahada <span class="text-gradient">kanıtlanmış</span> çözümler',
      ref_desc: 'Dünya çapında enerji ve endüstri liderleriyle aynı projelerde yer aldık; sahada kanıtlanmış kurulumlarımız kaliteyi yükseltir, riskleri azaltır.',
      ref_brands_label: 'Projelerinde yer aldığımız markalar:',
      ref_contractors_label: 'Doğrudan hizmet verdiğimiz yüklenici şirketler:',
      footer_desc: 'Şantiyede yalın dijital yönetim. Planlama, kalite, malzeme & ekipman, İSG ve maliyet süreçlerinizi tek ekrandan yönetin.',
      footer_rights: '© 2026 NeoPhase. Tüm hakları saklıdır.'
    },
    en: {
      nav_why: 'Why',
      nav_stats: 'Numbers',
      nav_modules: 'Modules',
      nav_refs: 'References',
      hero_badge: 'Construction site digital management platform',
      hero_title: 'Achieve <span class="text-gradient">clear, fast</span> and <span class="text-gradient">measurable</span> digital management in your projects.',
      hero_desc: 'Digitize planning, quality, materials & equipment, safety and cost management processes end-to-end; collect data on a single platform and simplify management.',
      hero_explore: 'Explore',
      chip_fast: 'Quick deployment',
      chip_integrate: 'Easy integration',
      chip_measurable: 'Measurable impact',
      chip_modular: 'Modular',
      why_pill: 'Why NeoPhase',
      why_title: 'Transform your <span class="text-gradient">operations</span>',
      why_desc: 'Reduce time waste on site, increase quality, and minimize project risks with NeoPhase.',
      why_card1_title: 'Easy to Use',
      why_card1_desc: 'No training required. Anyone can use it comfortably from day one. Intuitive interface, fast adaptation.',
      why_card2_title: 'Quick Start',
      why_card2_desc: 'Move all processes to digital in a short time. Setup takes hours, not days.',
      why_card3_title: 'Instant Impact',
      why_card3_desc: 'Operations speed up, costs decrease, your team is relieved. Measurable results from the first week.',
      stat1_label: 'Completed Projects',
      stat2_label: 'Active Users',
      stat3_label: 'Modules',
      stat4_label: 'Cost Savings',
      what_pill: 'Modules',
      what_title: 'What do we <span class="text-gradient">offer</span>?',
      what_desc: 'We digitize all your project processes. Planning, quality, OHS, project management, cost control — all on one platform.',
      mod1_title: 'Planning & Quality',
      mod1_desc: 'Project plans, quality control/inspection, NCR tracking, quality logs, standards management.',
      mod2_title: 'OHS & Safety',
      mod2_desc: 'Safety inspections, risk assessments, training tracking, accident reports, safety protocols.',
      mod3_title: 'Project Management',
      mod3_desc: 'Task assignments, progress tracking, resource management, timelines, milestone control.',
      mod4_title: 'Cost & Analysis',
      mod4_desc: 'Budget tracking, cost analysis, ROI calculations, performance metrics, detailed reporting.',
      mod5_title: 'Mobile & Offline',
      mod5_desc: 'On-site photo/video recording, QR code scanning, offline data entry, instant sync.',
      mod6_title: 'Integration',
      mod6_desc: 'REST/GraphQL API, Excel/CSV import/export, connect to existing systems, automated data flow.',
      mod7_title: 'Smart Reporting',
      mod7_desc: 'Real-time dashboards, customizable reports, trend analysis, automatic alerts.',
      ref_pill: 'References',
      ref_title: 'Field-<span class="text-gradient">proven</span> solutions',
      ref_desc: 'We have participated in projects with global energy and industry leaders; our field-proven installations increase quality and reduce risks.',
      ref_brands_label: 'Brands we have worked with:',
      ref_contractors_label: 'Contractors we directly serve:',
      footer_desc: 'Lean digital management on the construction site. Manage planning, quality, materials & equipment, OHS and cost processes from a single screen.',
      footer_rights: '© 2026 NeoPhase. All rights reserved.'
    },
    de: {
      nav_why: 'Warum',
      nav_stats: 'Zahlen',
      nav_modules: 'Module',
      nav_refs: 'Referenzen',
      hero_badge: 'Digitale Management-Plattform für Baustellen',
      hero_title: 'Erreichen Sie <span class="text-gradient">klares, schnelles</span> und <span class="text-gradient">messbares</span> digitales Management in Ihren Projekten.',
      hero_desc: 'Digitalisieren Sie Planungs-, Qualitäts-, Material- & Geräte-, Sicherheits- und Kostenmanagementprozesse durchgängig; sammeln Sie Daten auf einer einzigen Plattform und vereinfachen Sie das Management.',
      hero_explore: 'Entdecken',
      chip_fast: 'Schnelle Inbetriebnahme',
      chip_integrate: 'Einfache Integration',
      chip_measurable: 'Messbarer Nutzen',
      chip_modular: 'Modular',
      why_pill: 'Warum NeoPhase',
      why_title: 'Transformieren Sie Ihre <span class="text-gradient">Abläufe</span>',
      why_desc: 'Reduzieren Sie Zeitverluste vor Ort, steigern Sie die Qualität und minimieren Sie Projektrisiken mit NeoPhase.',
      why_card1_title: 'Einfache Bedienung',
      why_card1_desc: 'Keine Schulung erforderlich. Jeder kann es ab dem ersten Tag bequem nutzen. Intuitive Benutzeroberfläche, schnelle Anpassung.',
      why_card2_title: 'Schneller Start',
      why_card2_desc: 'Stellen Sie alle Prozesse in kurzer Zeit auf digital um. Die Einrichtung dauert Stunden, nicht Tage.',
      why_card3_title: 'Sofortiger Beitrag',
      why_card3_desc: 'Der Betrieb beschleunigt sich, die Kosten sinken, Ihr Team wird entlastet. Messbare Ergebnisse ab der ersten Woche.',
      stat1_label: 'Abgeschlossene Projekte',
      stat2_label: 'Aktive Nutzer',
      stat3_label: 'Module',
      stat4_label: 'Kosteneinsparung',
      what_pill: 'Module',
      what_title: 'Was <span class="text-gradient">bieten</span> wir?',
      what_desc: 'Wir digitalisieren alle Ihre Projektprozesse. Planung, Qualität, Arbeitssicherheit, Projektmanagement, Kostenkontrolle — alles auf einer Plattform.',
      mod1_title: 'Planung & Qualität',
      mod1_desc: 'Projektpläne, Qualitätskontrolle/-prüfung, NCR-Verfolgung, Qualitätsprotokolle, Standardmanagement.',
      mod2_title: 'Arbeitssicherheit',
      mod2_desc: 'Sicherheitsinspektionen, Risikobewertungen, Schulungsverfolgung, Unfallberichte, Sicherheitsprotokolle.',
      mod3_title: 'Projektmanagement',
      mod3_desc: 'Aufgabenzuweisung, Fortschrittsverfolgung, Ressourcenmanagement, Zeitpläne, Meilenstein-Kontrolle.',
      mod4_title: 'Kosten & Analyse',
      mod4_desc: 'Budgetverfolgung, Kostenanalyse, ROI-Berechnungen, Leistungskennzahlen, detaillierte Berichterstattung.',
      mod5_title: 'Mobil & Offline',
      mod5_desc: 'Foto-/Videoaufnahme vor Ort, QR-Code-Scanning, Offline-Dateneingabe, sofortige Synchronisation.',
      mod6_title: 'Integration',
      mod6_desc: 'REST/GraphQL-API, Excel/CSV-Import/Export, Anbindung an bestehende Systeme, automatischer Datenfluss.',
      mod7_title: 'Intelligente Berichte',
      mod7_desc: 'Echtzeit-Dashboards, anpassbare Berichte, Trendanalyse, automatische Warnmeldungen.',
      ref_pill: 'Referenzen',
      ref_title: 'In der Praxis <span class="text-gradient">bewährte</span> Lösungen',
      ref_desc: 'Wir haben an Projekten mit weltweit führenden Energie- und Industrieunternehmen teilgenommen; unsere praxiserprobten Installationen steigern die Qualität und reduzieren Risiken.',
      ref_brands_label: 'Marken, in deren Projekten wir tätig waren:',
      ref_contractors_label: 'Auftragnehmer, die wir direkt betreuen:',
      footer_desc: 'Schlankes digitales Management auf der Baustelle. Verwalten Sie Planungs-, Qualitäts-, Material- & Geräte-, Arbeitssicherheits- und Kostenprozesse über einen einzigen Bildschirm.',
      footer_rights: '© 2026 NeoPhase. Alle Rechte vorbehalten.'
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

  /* ─── Particle System (Magic UI style) ─── */
  function initParticles() {
    if (prefersReduced) return;
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles = [];
    let w, h;
    const PARTICLE_COUNT = 40;
    const MAX_SPEED = 0.3;
    const SIZE_MIN = 1;
    const SIZE_MAX = 2.5;
    const CONNECTION_DISTANCE = 120;

    function resize() {
      const hero = canvas.parentElement;
      if (!hero) return;
      w = hero.offsetWidth;
      h = hero.offsetHeight;
      canvas.width = w;
      canvas.height = h;
    }

    function createParticle() {
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * MAX_SPEED,
        vy: (Math.random() - 0.5) * MAX_SPEED,
        size: SIZE_MIN + Math.random() * (SIZE_MAX - SIZE_MIN),
        opacity: 0.15 + Math.random() * 0.25
      };
    }

    function init() {
      resize();
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(createParticle());
      }
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DISTANCE) {
            const alpha = (1 - dist / CONNECTION_DISTANCE) * 0.08;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw and move particles
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99, 102, 241, ${p.opacity})`;
        ctx.fill();
      });

      requestAnimationFrame(draw);
    }

    init();
    draw();
    window.addEventListener('resize', () => { resize(); });
  }

  /* ─── Number Ticker (Magic UI style) ─── */
  function initNumberTicker() {
    const tickers = document.querySelectorAll('[data-ticker]');
    if (!tickers.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-ticker'), 10);
          if (isNaN(target)) return;
          animateNumber(el, target);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    tickers.forEach(el => observer.observe(el));
  }

  function animateNumber(el, target) {
    const duration = 1800;
    const start = performance.now();
    const startVal = 0;

    function easeOutExpo(t) {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    }

    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutExpo(progress);
      const current = Math.round(startVal + (target - startVal) * eased);
      el.textContent = current.toLocaleString('tr-TR');
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  /* ─── Scroll Animations (Blur Fade In) ─── */
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

  /* ─── Hero Slideshow ─── */
  function initHeroSlideshow() {
    const container = document.getElementById('hero-slideshow');
    if (!container) return;
    const imgA = container.querySelector('[data-slideshow-a]');
    const imgB = container.querySelector('[data-slideshow-b]');
    const list = (container.getAttribute('data-images') || '').split('|').map(s => s.trim()).filter(Boolean);
    if (!imgA || !imgB || list.length < 2) return;

    let index = 0;
    let showingA = true;

    function swap() {
      index = (index + 1) % list.length;
      const visible = showingA ? imgA : imgB;
      const hidden = showingA ? imgB : imgA;
      hidden.setAttribute('src', list[index]);
      visible.style.opacity = '0';
      hidden.style.opacity = '1';
      hidden.style.zIndex = '2';
      visible.style.zIndex = '1';
      showingA = !showingA;
    }

    setTimeout(swap, 2000);
    setInterval(swap, 5000);
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

  /* ─── Bento Card Spotlight Effect ─── */
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

  /* ─── Init All ─── */
  document.addEventListener('DOMContentLoaded', () => {
    initLanguageSwitcher();
    initParticles();
    initScrollAnimations();
    initNumberTicker();
    initHeroSlideshow();
    initMobileNav();
    initSmoothScroll();
    initActiveNavHighlight();
    initSpotlightEffect();
    initNavbarScroll();
  });
})();
