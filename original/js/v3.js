(() => {
  const hero = document.querySelector('#hero .hx'); if (!hero) return;
  const word = hero.querySelector('.hx-word'), arches = [...hero.querySelectorAll('.hx-arch')];
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  let raf = 0;
  const tick = () => {
    raf = 0; const y = Math.min(window.scrollY, 900);
    word.style.transform = `translateY(${y * 0.28}px)`;
    arches.forEach((a, i) => { a.style.translate = `0 ${y * (i === 1 ? -0.06 : 0.1)}px`; });
  };
  addEventListener('scroll', () => { if (!raf) raf = requestAnimationFrame(tick); }, { passive: true });
  hero.addEventListener('pointermove', e => {
    const r = hero.getBoundingClientRect(), dx = (e.clientX - r.left) / r.width - .5, dy = (e.clientY - r.top) / r.height - .5;
    arches.forEach((a, i) => { const k = i === 1 ? 6 : 12; a.querySelector('img').style.translate = `${dx * -k}px ${dy * -k}px`; });
  });
})();
