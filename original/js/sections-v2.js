(() => {
  const courses = [
    { k: 'gel-anatomy', title: 'קורס לק ג׳ל ומבנה אנטומי', meta: '6 מפגשים', img: 'assets/img/courses/course-gel-anatomy.jpg' },
    { k: 'acrygel', title: 'קורס בנייה באקריג׳ל', meta: '6 מפגשים', img: 'assets/img/courses/course-acrygel.jpg' },
    { k: 'teens', title: 'קורס לק ג׳ל נערות', meta: '4 מפגשים', img: 'assets/img/courses/course-teens.jpg' },
    { k: 'pedicure', title: 'קורס פדיקור קוסמטי פלוס', meta: '6 מפגשים', img: 'assets/img/courses/course-pedicure.jpg' }
  ];
  const stage = document.querySelector('.crs-stage');
  if (stage) {
    const list = courses.concat(courses, courses), N = list.length;
    stage.innerHTML = list.map((c, i) => `<a class="crs-card" href="syllabus.html?c=${c.k}" data-i="${i}" dir="rtl"><img src="${c.img}" alt="${c.title}" loading="lazy" draggable="false"><div class="crs-info"><small>${c.meta}</small><h3>${c.title}</h3><span>לקריאת סילבוס הקורס</span></div></a>`).join('');
    const cards = [...stage.children];
    let active = 0, timer, idle;
    const layout = () => {
      const w = Math.min(260, stage.offsetWidth / 3.8);
      stage.style.setProperty('--cw', w + 'px');
      cards.forEach((el, i) => {
        let d = ((i - active) % N + N) % N; if (d > N / 2) d -= N;
        const a = Math.abs(d);
        const S = {'-2':[-1.86,40,.95],'-1':[-.945,42,1.06],'0':[0,0,1],'1':[.97,-25,.8],'2':[1.82,-25,.86]};
        const s = S[d] || [Math.sign(d) * 2.6, -Math.sign(d) * 30, .8];
        el.style.transform = `translateX(${s[0] * w}px) perspective(${w * 3}px) rotateY(${s[1]}deg) scale(${s[2]})`;
        el.style.zIndex = 10 - a;
        el.style.opacity = a > 2 ? 0 : 1;
        el.style.pointerEvents = a > 2 ? 'none' : '';
        el.classList.toggle('is-active', d === 0);
      });
    };
    const go = n => { active = (n % N + N) % N; layout(); };
    const play = () => { clearInterval(timer); timer = setInterval(() => go(active + 1), 4200); };
    const pause = () => { clearInterval(timer); clearTimeout(idle); idle = setTimeout(play, 6000); };
    document.querySelectorAll('[data-crs]').forEach(b => b.addEventListener('click', () => { pause(); go(active + Number(b.dataset.crs)); }));
    stage.addEventListener('click', e => { const c = e.target.closest('.crs-card'); if (c && !c.classList.contains('is-active')) { e.preventDefault(); pause(); go(+c.dataset.i); } });
    let sx = null;
    stage.addEventListener('pointerdown', e => { sx = e.clientX; });
    stage.addEventListener('pointerup', e => { if (sx == null) return; const dx = e.clientX - sx; sx = null; if (Math.abs(dx) > 40) { pause(); go(active + (dx < 0 ? 1 : -1)); } });
    window.addEventListener('resize', layout);
    layout(); play();
  }
  const v = document.querySelector('#film .film-video');
  if (v) {
    const START = 3;
    v.muted = true; v.loop = false; v.style.opacity = '0'; v.style.transition = 'opacity .8s';
    const seek = () => { if (v.readyState >= 1 && v.currentTime < START) v.currentTime = START; };
    const show = () => { if (v.currentTime >= START - 0.05) v.style.opacity = '1'; };
    ['loadedmetadata','loadeddata','canplay','play','playing'].forEach(ev => v.addEventListener(ev, seek));
    v.addEventListener('seeked', show); v.addEventListener('timeupdate', () => { if (v.currentTime < START - 0.1) seek(); else show(); if (v.duration && v.currentTime > v.duration - 0.3) v.currentTime = START; });
    v.addEventListener('ended', () => { v.currentTime = START; v.play().catch(() => {}); });
    const tryPlay = () => { seek(); v.play().catch(() => {}); };
    new IntersectionObserver(es => es.forEach(e => e.isIntersecting ? tryPlay() : v.pause()), { rootMargin: '200px' }).observe(v);
    seek(); tryPlay();
  }
})();
