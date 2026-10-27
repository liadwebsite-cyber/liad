(() => {
  const init = () => {
    const cards = [...document.querySelectorAll('#proof .vcard')];
    cards.forEach(card => {
      const v = card.querySelector('video'); if (!v) return;
      v.preload = 'metadata'; v.muted = true; v.loop = true;
      const label = card.querySelector('.vlabel .ub-i');
      card.addEventListener('click', e => {
        e.stopPropagation();
        const on = !card.classList.contains('playing');
        cards.forEach(c => { c.classList.remove('playing'); const x = c.querySelector('video'); x.pause(); x.muted = true; const l = c.querySelector('.vlabel .ub-i'); if (l) l.textContent = '▶'; });
        if (on) { card.classList.add('playing'); v.muted = false; v.play().catch(() => { v.muted = true; v.play(); }); if (label) label.textContent = '❚❚'; }
      }, true);
    });
  };
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : setTimeout(init, 300);
})();
