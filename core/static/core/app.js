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
      nav_partner: 'İş modeli',
      nav_contact: 'İletişim',
      hero_title: 'Şantiye ve İmalat Operasyonlarında <span class="text-gradient">«Sıfır Hata, Tam Kontrol»</span> Dönemi',
      hero_desc: 'Projelerinizde net, hızlı ve ölçülebilir dijital yönetim. Endüstriyel boru imalatı, kalite kontrol ve montaj süreçlerinizi manuel Excel tablolarından kurtarın. Veriyi sahada doğduğu an dijitalleştirin, ofisten tek tıkla yönetin.',
      hero_cta: 'Demo Talep Edin',
      why_pill: 'Neden NeoPhase & TERMINAL?',
      why_title: 'Operasyonunuzu Gider Merkezinden, <span class="text-gradient">Kâr Merkezine</span> Dönüştürün.',
      why_desc: 'Paket bir yazılım değil, projenizin hızına ayak uyduran yaşayan bir teknoloji ortağıyız. TERMINAL ile sahada zaman kaybını sıfırlayın, kaliteyi garanti altına alın ve proje risklerini yapay zeka ile önceden tespit edin.',
      why_card1_title: 'Günlerden Dakikalara İnen Raporlama',
      why_card1_desc: 'Kalite ekiplerinizin saatlerini alan İmalat Onay Formları ve NDT raporları tek tıkla, saniyeler içinde hazır. Yılda yaklaşık 700 adam/saat tasarruf edin.',
      why_card2_title: 'Sahadan Anlık, «Temiz» Veri',
      why_card2_desc: 'Tablet ve telefon üzerinden kolayca veri girişi yapın. Sıfır eğitim gerektiren sezgisel arayüz ile formenleriniz sistemi ilk günden benimser.',
      why_card3_title: 'Anında Validasyon ile Hata Önleme',
      why_card3_desc: 'Üretim anında sertifika veya malzeme uyuşmazlığını sistem anında yakalar ve uyarır. %100 hatalı üretim iadesinin önüne geçin.',
      why_card4_title: 'Gizli Maliyet Yok, Sürpriz Fatura Yok',
      why_card4_desc: 'Klasik kullanıcı başı lisans ücreti ödemezsiniz. Proje süresince tüm geliştirmeler ve sınırsız kullanıcı erişimi aylık sabit hizmet bedeline dahildir.',
      stats_heading: 'Rakamlarla TERMINAL Etkisi',
      stat1_label: 'Özelleştirilebilir Saha Modülü',
      stat2_label: 'Dijital İzlenebilirlik (Traceability) ve Kağıtsız Saha',
      stat3_value: 'Sıfır',
      stat3_label: 'Kullanıcı Başı Lisans Maliyeti',
      stat4_label: 'Veri Özgürlüğü (Dilediğiniz an verilerinizle ayrılma garantisi)',
      what_pill: 'Modüllerimiz',
      what_lead: 'Uçtan Uca Kesintisiz Süreç Yönetimi',
      what_title: 'Ne <span class="text-gradient">Sunuyoruz</span>?',
      mod1_title: 'Kalite ve Kaynak Yönetimi (Weld Log & NDT)',
      mod1_desc: 'Kaynakçı performansları, WQT yeterlilikleri ve test paketlerinizi tek merkezden yönetin. RT/UT ve MT/PT red oranlarını anlık olarak izleyerek kalite standartlarınızı koruyun.',
      mod2_title: 'Malzeme ve «Heat No» İzlenebilirliği',
      mod2_desc: 'Kullanılan her sac, profil ve sarf malzemenin Heat No (Döküm No) takibini yapın. İmalattaki her parçanın sertifikası sistemde otomatik eşleşir.',
      mod3_title: 'Spool & İzometri Takibi',
      mod3_desc: 'Üretim, boya, nakliye ve sahaya varış adımlarını izometrik çizim bazlı olarak anlık takip edin. «Hangi parça nerede?» sorusu tarih oluyor.',
      mod4_title: '«Zero-Touch» Dokümantasyon & Arşivleme',
      mod4_desc: 'Konteyner veya test paketi tamamlandığında; sistem ilgili NDT raporlarını, sertifikaları ve kontrol formlarını otomatik çeker ve tek bir dosya halinde paketler.',
      mod5_title: 'Mevcut Sistemlerle (SAP/ERP) Kusursuz Entegrasyon',
      mod5_desc: 'TERMINAL sahanın karmaşık verisini toplar, temizler ve özet, onaylanmış veriyi SAP sisteminize (REST API ile) zahmetsizce aktarır. SAP ekibinizin yükü artmaz, hafifler.',
      mod6_title: 'Yapay Zeka (AI) Destekli Akıllı Dashboardlar',
      mod6_desc: 'Yönetim ekibi, projenin Ahead/Behind durumunu cepten canlı olarak izler. Google Gemini API entegrasyonu olası kalite risklerini sizin için analiz edip raporlar.',
      partner_pill: 'İş birliği',
      partner_title: 'Yeni Nesil <span class="text-gradient">İş Birliği</span> Modelimiz',
      partner_lead: 'Bir paket yazılım satın almıyorsunuz; bütünleşik bir yazılım departmanı kiralıyorsunuz.',
      partner_card1_title: 'Lisanslama Yok',
      partner_card1_desc: 'Kurumunuza özel «Hizmet ve Çözüm Ortaklığı» modeliyle çalışırız.',
      partner_card2_title: 'Esneklik',
      partner_card2_desc: 'Yeni bir rapor formatı mı gerekti? Sahadan yeni bir veri alanı talebi mi geldi? Ek fatura çıkarılmadan paket kapsamında anında geliştirilir.',
      partner_card3_title: 'Güvenli Çıkış',
      partner_card3_desc: 'Bizi denemekten korkmayın. Taahhüt yok; sistemi dilediğiniz zaman kapatabilir ve tüm verilerinizi eksiksiz (SQL/Excel) teslim alabilirsiniz.',
      cta_title: 'Sahadaki Karmaşaya Son Vermeye <span class="text-gradient">Hazır Mısınız?</span>',
      cta_desc: 'Operasyonel çevikliğe adım atın. Süreçlerinizi nasıl %100 izlenebilir hale getireceğimizi görmek için 30 dakikalık bir sistem demosu planlayalım.',
      cta_btn: 'Bizimle İletişime Geçin',
      contact_email_label: 'E-posta:',
      contact_phone_label: 'WhatsApp / Telefon:',
      contact_web_label: 'Web:',
      footer_desc: 'TERMINAL ile şantiye ve imalat operasyonlarında sıfır hata, tam kontrol. Weld Log, NDT, Heat No ve SAP entegrasyonu tek platformda.',
      footer_rights: 'Tüm hakları saklıdır.'
    },
    en: {
      nav_why: 'Why',
      nav_stats: 'Numbers',
      nav_modules: 'Modules',
      nav_partner: 'Partnership',
      nav_contact: 'Contact',
      hero_title: 'The <span class="text-gradient">«Zero Error, Full Control»</span> Era for Site & Manufacturing Operations',
      hero_desc: 'Clear, fast, measurable digital management for your projects. Move industrial pipe fabrication, quality control and assembly out of manual Excel. Capture data where it is born and manage it from the office in one click.',
      hero_cta: 'Request a Demo',
      why_pill: 'Why NeoPhase & TERMINAL?',
      why_title: 'Turn Your Operation from a <span class="text-gradient">Cost</span> Centre into a <span class="text-gradient">Profit</span> Centre.',
      why_desc: 'We are not an off-the-shelf product but a living technology partner that keeps pace with your project. With TERMINAL, cut time waste on site, lock in quality and spot project risks early with AI.',
      why_card1_title: 'Reporting from Days to Minutes',
      why_card1_desc: 'Manufacturing approval forms and NDT reports that used to take hours are ready in seconds, one click. Save around 700 person-hours per year.',
      why_card2_title: 'Instant, “Clean” Data from the Field',
      why_card2_desc: 'Easy data entry on tablet and phone. Supervisors adopt the system from day one thanks to a zero-training, intuitive UI.',
      why_card3_title: 'Validation That Prevents Errors',
      why_card3_desc: 'The system catches certificate or material mismatches at production time and alerts immediately. Prevent defective rework and returns.',
      why_card4_title: 'No Hidden Costs, No Surprise Invoices',
      why_card4_desc: 'No classic per-user licence fees. For the project duration, all enhancements and unlimited user access are included in a fixed monthly service fee.',
      stats_heading: 'TERMINAL impact in numbers',
      stat1_label: 'Customisable field modules',
      stat2_label: 'Digital traceability & paperless site',
      stat3_value: 'Zero',
      stat3_label: 'Per-user licence cost',
      stat4_label: 'Data freedom (leave with your data whenever you choose)',
      what_pill: 'Our modules',
      what_lead: 'End-to-end continuous process management',
      what_title: 'What do we <span class="text-gradient">offer</span>?',
      mod1_title: 'Quality & welding management (Weld Log & NDT)',
      mod1_desc: 'Manage welder performance, WQT qualifications and test packages from one place. Track RT/UT and MT/PT reject rates live to protect your standards.',
      mod2_title: 'Materials & “Heat No” traceability',
      mod2_desc: 'Track Heat No (cast number) for every plate, profile and consumable. Certificates for each part automatically match in the system.',
      mod3_title: 'Spool & isometric tracking',
      mod3_desc: 'Follow fabrication, paint, logistics and site arrival against isometrics. “Which part is where?” becomes history.',
      mod4_title: '“Zero-touch” documentation & archiving',
      mod4_desc: 'When a container or test package is complete, the system pulls NDT reports, certificates and checklists into one file automatically.',
      mod5_title: 'Seamless integration with SAP/ERP',
      mod5_desc: 'TERMINAL collects complex field data, cleans it and pushes approved summaries to SAP via REST API—without overloading your SAP team.',
      mod6_title: 'AI-powered smart dashboards',
      mod6_desc: 'Management sees Ahead/Behind status live on the phone. Google Gemini integration analyses quality risks and reports them for you.',
      partner_pill: 'Partnership',
      partner_title: 'Our next-generation <span class="text-gradient">partnership</span> model',
      partner_lead: 'You are not buying software off the shelf—you are renting a fully embedded software department.',
      partner_card1_title: 'No licensing',
      partner_card1_desc: 'We work in a bespoke “service & solution partnership” model for your organisation.',
      partner_card2_title: 'Flexibility',
      partner_card2_desc: 'Need a new report format or a new field from site? Developed in scope immediately—no extra invoice.',
      partner_card3_title: 'Safe exit',
      partner_card3_desc: 'No fear to try. No long-term lock-in; switch off anytime and receive your full data in SQL/Excel.',
      cta_title: 'Ready to end <span class="text-gradient">field chaos</span>?',
      cta_desc: 'Move to operational agility. Let’s schedule a 30-minute system demo to show how we make your processes 100% traceable.',
      cta_btn: 'Contact us',
      contact_email_label: 'Email:',
      contact_phone_label: 'WhatsApp / phone:',
      contact_web_label: 'Web:',
      footer_desc: 'TERMINAL: zero-error, full-control site and manufacturing operations. Weld Log, NDT, Heat No and SAP integration on one platform.',
      footer_rights: 'All rights reserved.'
    },
    de: {
      nav_why: 'Warum',
      nav_stats: 'Zahlen',
      nav_modules: 'Module',
      nav_partner: 'Modell',
      nav_contact: 'Kontakt',
      hero_title: 'Das Zeitalter <span class="text-gradient">«Null Fehler, volle Kontrolle»</span> auf der Baustelle und in der Fertigung',
      hero_desc: 'Klares, schnelles und messbares digitales Management für Ihre Projekte. Rohrleitungsfertigung, Qualitätskontrolle und Montage aus dem Excel-Alltag holen. Daten entstehen, wo sie anfallen – und werden vom Büro aus in einem Klick gesteuert.',
      hero_cta: 'Demo anfragen',
      why_pill: 'Warum NeoPhase & TERMINAL?',
      why_title: 'Vom <span class="text-gradient">Kosten-</span> zum <span class="text-gradient">Ertrags-</span>zentrum',
      why_desc: 'Kein Standardprodukt, sondern ein lebendiger Technologiepartner im Takt Ihres Projekts. Mit TERMINAL Zeitverluste vor Ort minimieren, Qualität sichern und Risiken mit KI früh erkennen.',
      why_card1_title: 'Reporting: von Tagen zu Minuten',
      why_card1_desc: 'Fertigungsfreigaben und NDT-Berichte in Sekunden – ein Klick. Rund 700 Personenstunden pro Jahr einsparen.',
      why_card2_title: 'Sofortige, „saubere“ Daten vom Feld',
      why_card2_desc: 'Erfassung auf Tablet und Smartphone. Intuitive Oberfläche ohne Schulungsaufwand – Ihre Vorarbeiter sind vom ersten Tag an dabei.',
      why_card3_title: 'Validierung verhindert Fehler',
      why_card3_desc: 'Zertifikats- oder Materialabweichungen werden in der Produktion erkannt und gemeldet. Fehlerhafte Nacharbeiten und Retouren reduzieren.',
      why_card4_title: 'Keine versteckten Kosten, keine Überraschungsrechnungen',
      why_card4_desc: 'Keine klassischen Nutzerlizenzen. Alle Weiterentwicklungen und unbegrenzte Nutzer sind im monatlichen Festpreis enthalten.',
      stats_heading: 'TERMINAL in Zahlen',
      stat1_label: 'Anpassbare Feldmodule',
      stat2_label: 'Digitale Rückverfolgbarkeit & papierlose Baustelle',
      stat3_value: 'Null',
      stat3_label: 'Lizenzkosten pro Nutzer',
      stat4_label: 'Datenfreiheit (jederzeit mit Ihren Daten gehen)',
      what_pill: 'Unsere Module',
      what_lead: 'Durchgängiges Prozessmanagement von Anfang bis Ende',
      what_title: 'Was <span class="text-gradient">bieten</span> wir?',
      mod1_title: 'Qualität & Schweißmanagement (Weld Log & NDT)',
      mod1_desc: 'Schweißerleistung, WQT-Qualifikationen und Testpakete zentral steuern. RT/UT- und MT/PT-Ablehnungen live verfolgen.',
      mod2_title: 'Material & „Heat No“-Rückverfolgbarkeit',
      mod2_desc: 'Heat No (Schmelznummer) für Blech, Profile und Verbrauchsmaterial. Zertifikate werden automatisch zugeordnet.',
      mod3_title: 'Spool- & Isometrie-Tracking',
      mod3_desc: 'Fertigung, Lack, Logistik und Anlieferung isometriebasiert verfolgen. „Welches Teil ist wo?“ gehört der Vergangenheit an.',
      mod4_title: '„Zero-touch“-Dokumentation & Archiv',
      mod4_desc: 'Nach Container oder Testpaket zieht das System NDT-Berichte, Zertifikate und Prüfungen automatisch in einem Paket zusammen.',
      mod5_title: 'Nahtlose Integration mit SAP/ERP',
      mod5_desc: 'TERMINAL sammelt komplexe Felddaten, bereinigt sie und übergibt freigegebene Summaries per REST API an SAP – ohne Mehrbelastung für Ihr SAP-Team.',
      mod6_title: 'KI-gestützte Dashboards',
      mod6_desc: 'Management sieht Ahead/Behind live auf dem Smartphone. Google Gemini analysiert Qualitätsrisiken und liefert Berichte.',
      partner_pill: 'Partnerschaft',
      partner_title: 'Unser neues <span class="text-gradient">Partnerschafts-</span>modell',
      partner_lead: 'Sie kaufen keine Software – Sie „mieten“ eine eingebettete Softwareabteilung.',
      partner_card1_title: 'Keine Lizenzierung',
      partner_card1_desc: 'Wir arbeiten im Modell „Dienst- und Lösungspartnerschaft“ für Ihr Unternehmen.',
      partner_card2_title: 'Flexibilität',
      partner_card2_desc: 'Neues Reportformat oder neues Feld von der Baustelle? Im Paket sofort umgesetzt – ohne Zusatzrechnung.',
      partner_card3_title: 'Sicherer Ausstieg',
      partner_card3_desc: 'Kein Risiko beim Testen. Jederzeit abschaltbar – alle Daten vollständig als SQL/Excel.',
      cta_title: 'Bereit, dem <span class="text-gradient">Chaos vor Ort</span> ein Ende zu setzen?',
      cta_desc: 'Operative Agilität. Wir planen eine 30-minütige Systemdemo, um 100% Rückverfolgbarkeit zu zeigen.',
      cta_btn: 'Kontakt aufnehmen',
      contact_email_label: 'E-Mail:',
      contact_phone_label: 'WhatsApp / Telefon:',
      contact_web_label: 'Web:',
      footer_desc: 'TERMINAL: Null Fehler, volle Kontrolle auf Baustelle und in der Fertigung. Weld Log, NDT, Heat No und SAP – eine Plattform.',
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

  /* ─── Spline viewer: “Built with Spline” rozeti (shadow içi #logo) ─── */
  function initSplineBrandingHide() {
    document.querySelectorAll('spline-viewer').forEach((viewer) => {
      const hide = () => {
        try {
          const logo = viewer.shadowRoot && viewer.shadowRoot.querySelector('#logo');
          if (logo) logo.style.setProperty('display', 'none', 'important');
        } catch (_) { /* ignore */ }
      };
      viewer.addEventListener('load-complete', hide);
      hide();
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
    initMobileNav();
    initSmoothScroll();
    initActiveNavHighlight();
    initSpotlightEffect();
    initNavbarScroll();
    initSplineBrandingHide();
  });
})();
