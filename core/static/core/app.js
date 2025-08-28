(function () {
  const body = document.body;
  const navButtons = Array.from(document.querySelectorAll('header [data-target]'));
  const ctaButtons = Array.from(document.querySelectorAll('[data-view-panel] [data-target]'));
  const panels = Array.from(document.querySelectorAll('[data-view-panel]'));
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function setActiveChip(target) {
    navButtons.forEach(btn => {
      const active = btn.getAttribute('data-target') === target;
      btn.setAttribute('aria-selected', String(active));
    });
  }

  function showPanel(name) {
    panels.forEach(panel => {
      const active = panel.getAttribute('data-view-panel') === name;
      panel.classList.toggle('hidden', !active);
      panel.setAttribute('data-active', String(active));
    });
  }

  function animateTransition(from, to) {
    if (prefersReduced) return; // sade animasyon

    // WHO -> WHAT
    if (from === 'who' && to === 'what') {
      document.documentElement.style.backgroundColor = '#F8FAFC';
      const heading = document.querySelector('[data-view-panel="what"] .heading');
      if (heading) {
        heading.classList.add('scale-in', 'underline-sweep');
        requestAnimationFrame(() => {
          heading.classList.add('show');
          setTimeout(() => heading.classList.add('show-underline'), 60);
        });
      }
      const cards = document.querySelectorAll('[data-view-panel="what"] .card');
      cards.forEach((el, i) => {
        el.classList.add('fade-up');
        setTimeout(() => el.classList.add('show'), 40 * i);
      });
    }

    // WHAT -> REFS
    if (from === 'what' && to === 'refs') {
      body.classList.add('tint', 'noise');
      document.documentElement.style.backgroundColor = '#F8FAFC';
      const grid = document.getElementById('refs-grid');
      if (grid) {
        const items = Array.from(grid.children);
        // Masonry shuffle: sadece order değişimi + fade
        items.forEach(el => el.classList.add('fade-up'));
        const shuffled = items.sort(() => Math.random() - 0.5);
        shuffled.forEach((el, i) => {
          el.style.order = String(i);
          setTimeout(() => el.classList.add('show'), 30 * i);
        });
      }
    }

    // REFS -> CTA
    if (from === 'refs' && to === 'cta') {
      const ctaBtn = document.querySelector('[data-view-panel="cta"] .btn-primary');
      if (ctaBtn) {
        ctaBtn.classList.add('pulse-once');
        setTimeout(() => ctaBtn.classList.remove('pulse-once'), 800);
      }
      const successIcon = document.querySelector('.success-icon');
      if (successIcon) {
        requestAnimationFrame(() => successIcon.classList.add('show'));
      }
    }

    // Reset states when returning back
    if (to === 'who') {
      body.classList.remove('noise');
      document.documentElement.style.backgroundColor = '#FFFFFF';
    }
  }

  function setView(name) {
    const from = body.getAttribute('data-view');
    if (from === name) return;
    body.setAttribute('data-view', name);
    setActiveChip(name);
    showPanel(name);
    animateTransition(from, name);
    if (name !== 'refs') {
      body.classList.remove('noise');
      if (name === 'who' || name === 'cta') document.documentElement.style.backgroundColor = '#FFFFFF';
    }
    if (name === 'what') document.documentElement.style.backgroundColor = '#F8FAFC';
    if (name === 'refs') document.documentElement.style.backgroundColor = '#F8FAFC';
  }

  // Keyboard activation with Enter
  function attachNav(btn) {
    btn.addEventListener('click', () => setView(btn.getAttribute('data-target')));
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setView(btn.getAttribute('data-target'));
      }
    });
  }

  navButtons.forEach(attachNav);
  ctaButtons.forEach(attachNav);

  // Magnet hover (CTA)
  const magnet = document.querySelector('.magnet');
  if (magnet) {
    const maxDistance = 12;
    const rect = () => magnet.getBoundingClientRect();
    const center = () => ({ x: rect().left + rect().width / 2, y: rect().top + rect().height / 2 });
    function onMove(e) {
      if (prefersReduced) return;
      const c = center();
      const dx = e.clientX - c.x;
      const dy = e.clientY - c.y;
      const dist = Math.hypot(dx, dy);
      const factor = Math.min(dist, maxDistance) / (dist || 1);
      const tx = dx * factor * 0.2;
      const ty = dy * factor * 0.2;
      magnet.style.transform = `translate(${tx}px, ${ty}px)`;
    }
    function reset() { magnet.style.transform = 'translate(0,0)'; }
    window.addEventListener('mousemove', onMove);
    magnet.addEventListener('mouseleave', reset);
  }

  // Initial view
  const initial = body.getAttribute('data-view') || 'who';
  setActiveChip(initial);
  showPanel(initial);
  // If initial is CTA and success icon exists, show its effect on first load
  const initialSuccess = document.querySelector('.success-icon');
  if (initial === 'cta' && initialSuccess && !prefersReduced) {
    requestAnimationFrame(() => initialSuccess.classList.add('show'));
  }

  // Hero slideshow (5s interval, fade)
  (function setupHeroSlideshow() {
    const container = document.getElementById('hero-slideshow');
    if (!container) return;
    const imgA = container.querySelector('[data-slideshow-a]');
    const imgB = container.querySelector('[data-slideshow-b]');
    const list = (container.getAttribute('data-images') || '')
      .split('|')
      .map(s => s.trim())
      .filter(Boolean);
    if (!imgA || !imgB || list.length === 0) return;
    let index = 0;
    let showingA = true;
    function nextIndex(i) { return (i + 1) % list.length; }
    // ensure stacking order
    imgA.style.zIndex = '2';
    imgB.style.zIndex = '1';
    function swap() {
      index = nextIndex(index);
      const nextSrc = list[index];
      const visible = showingA ? imgA : imgB;
      const hidden = showingA ? imgB : imgA;
      hidden.setAttribute('src', nextSrc);
      // cross-fade
      visible.classList.remove('opacity-100');
      visible.classList.add('opacity-0');
      hidden.classList.remove('opacity-0');
      hidden.classList.add('opacity-100');
      hidden.style.zIndex = '2';
      visible.style.zIndex = '1';
      showingA = !showingA;
    }
    // start with first two already set; advance every 5s
    setTimeout(swap, 1000);
    setInterval(swap, 5000);
  })();

  // Cookie consent banner
  (function cookieConsent() {
    try {
      const key = 'np_cookie_consent_v1';
      const accepted = localStorage.getItem(key) === '1';
      const banner = document.getElementById('cookie-consent');
      const acceptBtn = document.getElementById('cookie-accept');
      if (!banner || !acceptBtn) return;
      if (!accepted) {
        banner.classList.remove('hidden');
      }
      acceptBtn.addEventListener('click', () => {
        localStorage.setItem(key, '1');
        banner.classList.add('hidden');
      });
    } catch (_) {
      // storage unavailable; fail silently
    }
  })();
})();


