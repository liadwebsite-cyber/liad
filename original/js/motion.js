/* LIAD motion layer for inner pages: scroll reveals, headline word reveals, image unmasking,
   count-ups, hero parallax, magnetic primary buttons and staggered catalog cards.
   Everything is progressive: without JS or with reduced motion the page is fully visible and static. */
(() => {
  'use strict';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced || !('IntersectionObserver' in window)) return;
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  document.documentElement.classList.add('motion');

  const REVEAL = ['.crumb:not(.ac-cine .crumb)', '.page-heading', '.ac-cine-copy > *', '.ac-values > div', '.ac-head > *', '.ac-jump a',
    '.ac-track', '.ac-steps li', '.story', '.faq-list details', '.ac-contact > *', '.sy-hero-copy > *', '.sy-facts > div',
    '.sy-sec > *', '.sy-timeline li', '.check-list li', '.kit-list li', '.sy-aside', '.sy-others h2', '.sy-others-grid a',
    '.product-summary > *', '.related .section-head', '.contact-band > *', '.journal-card', '.article-hero > div > *',
    '.article-body section', '.policy > *', '.checkout-layout > *', '.notice', '.categories-filter', '.filter-group', '.catalog-tools'].join(',');
  const CLIP = '.ac-cine-frame, .ac-track-media, .sy-hero-media, .product-detail-media, .article-hero img, .journal-card > a';
  const SPLIT = '.ac-title, .ac-head h2, .sy-hero h1, .sy-sec h2, .page-heading h1, .ac-contact h2, .sy-others h2, .section-head h2, .contact-band h2';

  // Split simple headings into masked words. Only text + <br> headings are touched.
  function split(el) {
    if (el.dataset.mx || [...el.childNodes].some(n => n.nodeType === 1 && n.tagName !== 'BR')) return;
    el.dataset.mx = '1';
    const parts = [];
    el.childNodes.forEach(n => {
      if (n.nodeType === 3) n.textContent.split(/(\s+)/).forEach(w => parts.push(/^\s+$/.test(w) ? ' ' : w ? `<span class="mxw"><span>${w.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</span></span>` : ''));
      else parts.push('<br>');
    });
    el.setAttribute('aria-label', el.textContent.trim());
    el.innerHTML = parts.join('');
    el.querySelectorAll('.mxw').forEach(m => m.setAttribute('aria-hidden', 'true'));
    el.querySelectorAll('.mxw > span').forEach((s, i) => s.style.transitionDelay = `${Math.min(i * 70, 700)}ms`);
    el.classList.add('mx-split');
  }

  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in');
    if (e.target.dataset.count) countUp(e.target);
    io.unobserve(e.target);
  }), { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

  function stagger(list) {
    const groups = new Map();
    list.forEach(el => { const k = el.parentElement; groups.set(k, (groups.get(k) || 0) + 1); el.style.setProperty('--d', `${Math.min((groups.get(k) - 1) * 80, 480)}ms`); });
  }

  function countUp(el) {
    const target = +el.dataset.count, from = performance.now(), dur = 1400, txt = el.dataset.tpl;
    const step = t => { const p = Math.min(1, (t - from) / dur), v = Math.round(target * (1 - Math.pow(1 - p, 4))); el.textContent = txt.replace('#', v.toLocaleString('he-IL')); if (p < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  }

  function prepare(root = document) {
    $$(SPLIT, root).forEach(split);
    $$(SPLIT, root).forEach(el => { if (!el.classList.contains('rv-h')) { el.classList.add('rv-h'); io.observe(el); } });
    const items = $$(REVEAL, root).filter(el => !el.classList.contains('rv') && !el.matches(SPLIT));
    items.forEach(el => el.classList.add('rv'));
    stagger(items);
    items.forEach(el => io.observe(el));
    $$(CLIP, root).forEach(el => { if (!el.classList.contains('rv-clip')) { el.classList.add('rv-clip'); io.observe(el); } });
    $$('.ac-values b, .sy-facts dd', root).forEach(el => {
      const m = el.textContent.match(/\d[\d,]*/); if (!m || el.dataset.count || el.querySelector('bdi')) return;
      el.dataset.count = m[0].replace(/,/g, ''); el.dataset.tpl = el.textContent.replace(m[0], '#'); el.textContent = el.dataset.tpl.replace('#', '0'); io.observe(el);
    });
  }

  // Catalog cards appear in a short cascade whenever the grid re-renders (filter, sort, page).
  function watchGrid(grid) {
    const animate = () => $$('.product-card', grid).forEach((c, i) => { c.classList.remove('card-in'); c.style.setProperty('--d', `${Math.min(i, 11) * 45}ms`); void c.offsetWidth; c.classList.add('card-in'); });
    new MutationObserver(animate).observe(grid, { childList: true });
    animate();
  }

  // Gentle scroll parallax on hero media.
  function parallax() {
    const els = $$('.sy-hero-media img, .ac-cine-frame video, .ac-cine-bg');
    if (!els.length) return;
    let ticking = false;
    const run = () => { ticking = false; const y = scrollY; els.forEach(el => { if (y > innerHeight * 1.4) return; const k = el.classList.contains('ac-cine-bg') ? 0.25 : 0.08; el.style.translate = `0 ${(y * k).toFixed(1)}px`; }); };
    addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(run); } }, { passive: true });
  }

  // Primary buttons lean slightly toward the pointer (desktop only).
  function magnetic() {
    if (!fine) return;
    document.addEventListener('pointermove', e => {
      const b = e.target.closest('.btn:not(.light), .add-small, .ac-contact-links a');
      if (!b) return;
      const r = b.getBoundingClientRect(), x = (e.clientX - r.left - r.width / 2) / r.width, y = (e.clientY - r.top - r.height / 2) / r.height;
      b.style.translate = `${(x * 8).toFixed(1)}px ${(y * 6).toFixed(1)}px`;
      if (!b._mg) { b._mg = 1; b.addEventListener('pointerleave', () => { b.style.translate = ''; }, { once: false }); }
    }, { passive: true });
  }

  // Thin reading progress on long reads.
  function progress() {
    if (!document.querySelector('.sy-layout, .article-layout')) return;
    const bar = document.createElement('div'); bar.className = 'read-progress'; bar.setAttribute('aria-hidden', 'true'); document.body.append(bar);
    const run = () => { const h = document.documentElement.scrollHeight - innerHeight; bar.style.transform = `scaleX(${h > 0 ? Math.min(1, scrollY / h) : 0})`; };
    addEventListener('scroll', () => requestAnimationFrame(run), { passive: true }); run();
  }

  function start() {
    const main = document.getElementById('main');
    if (!main || !main.children.length) return requestAnimationFrame(start);
    prepare(main);
    const grid = document.getElementById('catalog-products') || null;
    if (grid) watchGrid(grid);
    $$('.related .product-grid').forEach(watchGrid);
    parallax(); magnetic(); progress();
    requestAnimationFrame(() => document.documentElement.classList.add('motion-ready'));
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => setTimeout(start, 0)); else start();
})();
