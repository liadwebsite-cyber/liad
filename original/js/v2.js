(() => {
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .15 });

  function setupFaq() {
    const list = document.querySelector('.faq-list'); if (!list) return false;
    const items = [...list.querySelectorAll('.faq-item')]; if (!items.length) return false;
    const data = items.map(it => ({ q: it.querySelector('.faq-question').childNodes[0].textContent.trim(), a: it.querySelector('.faq-answer p').textContent.trim() }));
    list.className = 'faq-list v2faq';
    list.innerHTML = `<div class="v2faq-list">${data.map((d, i) => `<button class="v2faq-q${i ? '' : ' on'}" data-i="${i}"><small>0${i + 1}</small>${d.q}</button>`).join('')}</div><div class="v2faq-panel"></div>`;
    const panel = list.querySelector('.v2faq-panel');
    const show = i => { panel.innerHTML = `<span class="big">0${i + 1}</span><div class="fade" style="display:flex;flex-direction:column;gap:14px;height:100%"><h3>${data[i].q}</h3><p>${data[i].a}</p><a href="mailto:rubinliad@gmail.com">שאלה אחרת? לכתוב לליעד ←</a></div>`; list.querySelectorAll('.v2faq-q').forEach((b, k) => b.classList.toggle('on', k === i)); };
    list.addEventListener('click', e => { const b = e.target.closest('.v2faq-q'); if (b) show(+b.dataset.i); });
    show(0); return true;
  }

  function setupFilm() {
    const v = document.querySelector('.film-video'); if (!v) return;
    const START = 3;
    const toStart = () => { if (v.currentTime < START) v.currentTime = START; };
    v.addEventListener('loadedmetadata', toStart);
    v.addEventListener('timeupdate', () => { if (v.currentTime < START - .05) v.currentTime = START; });
    v.addEventListener('ended', () => { v.currentTime = START; v.play().catch(() => {}); });
    if (v.readyState >= 1) toStart();
  }

  const init = () => {
    const els = [...document.querySelectorAll('[data-v2]')];
    const vh = innerHeight;
    els.forEach(el => { if (el.getBoundingClientRect().top < vh) el.classList.add('in'); });
    document.documentElement.classList.add('v2-anim');
    els.forEach(el => io.observe(el));
    const reveal = () => els.forEach(el => { if (!el.classList.contains('in') && el.getBoundingClientRect().top < innerHeight * .92) el.classList.add('in'); });
    addEventListener('scroll', reveal, { passive: true });
    setTimeout(() => els.forEach(el => el.classList.add('in')), 2500);
    let tries = 0; const t = setInterval(() => { if (setupFaq() || ++tries > 60) clearInterval(t); }, 150);
  };
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
