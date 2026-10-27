(() => {
  const SHOP = 'shop.html';
  const MAIL = 'rubinliad@gmail.com';
  const page = (location.pathname.split('/').pop() || 'index.html');
  const home = page.startsWith('index') || page === '';
  const HOME = 'index.html';
  const padded = !home;
  const h = s => home ? s : HOME + s;
  const links = [
    ['בית', home ? '#hero' : HOME, home],
    ['מוצרים', SHOP, page === 'shop.html' || page === 'product.html' || page === 'checkout.html'],
    ['קטגוריות', h('#categories')],
    ['קורסים', 'courses.html', page === 'courses.html' || page === 'syllabus.html'],
    ['כתבות', h('#journal'), page === 'article.html'],
    ['אודות', h('#about')],
    ['יצירת קשר', h('#contact')]
  ];
  const ico = {
    search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>',
    heart: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
    bag: '<path d="M5 8h14l-1 12H6z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
    truck: '<path d="M3 6h11v10H3zM14 10h4l3 3v3h-7"/><circle cx="7" cy="17" r="1.6"/><circle cx="17" cy="17" r="1.6"/>',
    lock: '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
    arrow: '<path d="M19 12H5M11 6l-6 6 6 6"/>'
  };
  const svg = k => `<svg viewBox="0 0 24 24" aria-hidden="true">${ico[k]}</svg>`;
  const css = `
  .sbar{position:fixed;z-index:401;top:0;left:0;right:0;height:34px;display:flex;align-items:center;justify-content:center;gap:28px;background:#2A211C;color:#f3e7dc;font:300 12px 'Noto Sans Hebrew',sans-serif;direction:rtl;transition:transform .5s cubic-bezier(.22,1,.36,1)}
  .sbar span{display:flex;align-items:center;gap:8px}.sbar i{width:1px;height:12px;background:rgba(243,231,220,.35)}
  .sbar svg{width:15px;height:15px;stroke:currentColor;fill:none;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round}
  .snav{position:fixed;z-index:400;top:42px;left:3vw;right:3vw;height:56px;display:flex;align-items:center;justify-content:space-between;gap:24px;padding:0 24px;border-radius:999px;background:rgba(164,141,126,.72);backdrop-filter:blur(18px) saturate(1.15);-webkit-backdrop-filter:blur(18px) saturate(1.15);box-shadow:0 14px 40px rgba(60,40,30,.18),inset 0 0 0 1px rgba(255,255,255,.18);direction:rtl;font-family:'Noto Sans Hebrew',sans-serif;transition:top .5s cubic-bezier(.22,1,.36,1),height .4s,background .4s,transform .5s cubic-bezier(.22,1,.36,1),left .5s,right .5s}
  .snav a{text-decoration:none}
  body.s-scrolled .sbar{transform:translateY(-100%)}
  body.s-scrolled .snav{top:10px;height:50px;background:rgba(150,126,111,.9)}
  body.s-hide .snav{transform:translateY(-140%)}
  .snav-logo img{height:40px;width:auto;display:block}.snav-logo{display:flex;flex-direction:column;align-items:center;line-height:1;color:#f6eee4!important;order:3}
  .snav-logo bdi{font:300 26px/.9 'Cormorant Garamond',serif;letter-spacing:.06em}
  .snav-logo small{font:italic 300 10px 'Frank Ruhl Libre',serif;margin-top:3px;opacity:.92}
  .snav-links{order:2;display:flex;gap:clamp(14px,2.4vw,38px);font:400 13px 'Rubik','Noto Sans Hebrew',sans-serif}
  .snav-links a{color:#f6eee4!important;padding:6px 2px;position:relative}
  .snav-links a::after{content:'';position:absolute;right:0;left:0;bottom:0;height:1px;background:#f6eee4;transform:scaleX(0);transition:transform .35s}
  .snav-links a:hover::after,.snav-links a.on::after{transform:scaleX(1)}
  .snav-icons{order:1;display:flex;gap:18px;align-items:center}
  .snav-icons a,.snav-burger{color:#f6eee4!important;display:grid;place-items:center;width:30px;height:30px;background:none;border:0;cursor:pointer;padding:0;border-radius:50%;transition:background .3s}
  .snav-icons a:hover{background:rgba(255,255,255,.14)}
  .snav svg{width:19px;height:19px;stroke:currentColor;fill:none;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round}
  .snav-burger{display:none}
  .snav-panel{visibility:hidden;position:fixed;z-index:399;top:0;left:0;right:0;display:flex;flex-direction:column;padding:110px 26px 26px;background:rgba(120,98,86,.97);backdrop-filter:blur(16px);transform:translateY(-105%);transition:transform .5s cubic-bezier(.22,1,.36,1);direction:rtl}
  .snav-panel.open{transform:none;visibility:visible}
  .snav-panel a{color:#f6eee4!important;font:300 18px 'Noto Sans Hebrew',sans-serif;padding:15px 0;border-bottom:1px solid rgba(246,238,228,.22);text-decoration:none}
  @media(prefers-reduced-motion:reduce){.snav,.sbar,.snav-panel,.sbar span{transition:none!important}}
  ${padded ? 'body{padding-top:112px}' : ''}
  .sfoot{background:linear-gradient(180deg,#EFE1D4,#e8d8ca);color:#2A211C;direction:rtl;font-family:'Noto Sans Hebrew',sans-serif;padding:72px 6vw 0}
  .sfoot a{color:#2A211C;text-decoration:none;transition:color .3s}.sfoot a:hover{color:#8a6a4e}
  .sfoot-top{display:grid;grid-template-columns:minmax(0,1.4fr) repeat(3,minmax(0,1fr));gap:48px;max-width:1240px;margin:0 auto;padding-bottom:56px;border-bottom:1px solid rgba(42,33,28,.12)}
  .sfoot-brand{display:flex;flex-direction:column;gap:16px;align-items:flex-start}
  .sfoot-brand bdi{font:300 54px/.9 'Cormorant Garamond',serif;letter-spacing:.08em;color:#f6eee4}
  .sfoot-brand small{font:italic 300 13px 'Frank Ruhl Libre',serif;color:#6d5a4d;margin-top:-6px}
  .sfoot-brand p{font:300 14px/1.8 'Noto Sans Hebrew',sans-serif;color:#6d5a4d;max-width:34ch}
  .sfoot-cta{white-space:nowrap;display:inline-flex;align-items:center;gap:10px;padding:11px 22px;border-radius:999px;border:1px solid rgba(42,33,28,.5);font-size:13px;margin-top:6px}
  .sfoot-cta:hover{background:#2A211C;color:#F7F3EF!important}
  .sfoot-cta svg{width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:1.5}
  .sfoot h4{font:400 13px 'Noto Sans Hebrew',sans-serif;letter-spacing:.18em;color:#8a7566;margin:0 0 18px}
  .sfoot ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:12px;font:400 13px 'Rubik','Noto Sans Hebrew',sans-serif}
  .sfoot-trust{display:flex;justify-content:center;gap:40px;flex-wrap:wrap;max-width:1240px;margin:0 auto;padding:26px 0;border-bottom:1px solid rgba(42,33,28,.12);font:300 13px 'Noto Sans Hebrew',sans-serif;color:#6d5a4d}
  .sfoot-trust span{display:flex;align-items:center;gap:10px}
  .sfoot-trust svg{width:18px;height:18px;stroke:#6d5a4d;fill:none;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round}
  .sfoot-bottom{display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap;max-width:1240px;margin:0 auto;padding:22px 0 28px;font:300 12px 'Noto Sans Hebrew',sans-serif;color:#8a7566}
  @media(max-width:900px){.snav{top:42px;left:10px;right:10px;height:52px;padding:0 16px}.snav-links{display:none}.snav-burger{display:grid}.snav-logo bdi{font-size:23px}.snav-icons{gap:8px}.snav-icons a.hide-m{display:none}
    .sbar{font-size:11px;gap:0}.sbar i{display:none}.sbar span{position:absolute;inset:0;justify-content:center;opacity:0;transform:translateY(6px);transition:opacity .5s,transform .5s}.sbar span.cur{opacity:1;transform:none}
    ${padded ? 'body{padding-top:112px}' : ''}
    .sfoot{padding:52px 22px 0}.sfoot-top{grid-template-columns:1fr 1fr;gap:34px 22px}.sfoot-brand{grid-column:1/-1}.sfoot-brand bdi{font-size:44px}.sfoot-trust{gap:14px 26px;justify-content:flex-start}.sfoot-bottom{flex-direction:column}}`;
  const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
  const sharedStyle = document.createElement('style');
  sharedStyle.textContent = `
    .snav{background:rgba(243,232,221,.94);border:1px solid rgba(93,68,51,.14);box-shadow:0 14px 36px rgba(60,40,30,.14),inset 0 1px rgba(255,255,255,.7)}
    .snav-logo{color:#2a211c!important}
    .snav-logo img{filter:brightness(.42) sepia(.16) saturate(.75)}
    .snav-links a,.snav-icons a,.snav-icons button,.snav-burger{color:#2a211c!important}
    .snav-links a::after{background:#8a6651}
    .snav-icons a:hover,.snav-burger:hover{background:rgba(93,68,51,.1)}
    body.s-scrolled .snav{background:rgba(243,232,221,.98)}
    body.s-hide .snav{transform:none}
    .snav-panel{background:rgba(243,232,221,.99);color:#2a211c}
    .snav-panel a{color:#2a211c!important;border-color:rgba(42,33,28,.14)}
    /* One button system for the whole site: pill, solid ink or quiet outline, no rings or auto arrows. */
    :is(.btn,.ub,.lx-btn,.hl-btn,.cx-all,.cx-sub,.ed-pill,.cat-more a,.hl-cards a,.contact-send,.contact-result a,.community-input button,.course-cta,.sfoot-cta){display:inline-flex!important;align-items:center!important;justify-content:center!important;gap:10px!important;min-height:48px!important;padding:0 26px!important;border:1px solid #1d1611!important;border-radius:999px!important;outline:0!important;background:#1d1611!important;color:#fff!important;box-shadow:none!important;font:500 14px/1.2 'Rubik','Noto Sans Hebrew',sans-serif!important;letter-spacing:0!important;text-transform:none!important;white-space:nowrap!important;text-decoration:none!important;transform:none;transition:background-color .16s ease,border-color .16s ease,color .16s ease,transform .12s cubic-bezier(.23,1,.32,1)!important}
    :is(.btn,.ub,.lx-btn,.hl-btn,.cx-all,.cx-sub,.ed-pill,.cat-more a,.hl-cards a,.contact-send,.contact-result a,.community-input button,.course-cta,.sfoot-cta):hover{background:#3a2d24!important;border-color:#3a2d24!important;color:#fff!important;transform:none!important}
    :is(.btn,.ub,.lx-btn,.hl-btn,.cx-all,.cx-sub,.ed-pill,.cat-more a,.hl-cards a,.contact-send,.contact-result a,.community-input button,.course-cta,.sfoot-cta):active{transform:scale(.98)!important}
    :is(.btn,.ub,.lx-btn,.hl-btn,.cx-all,.cx-sub,.ed-pill,.cat-more a,.hl-cards a,.contact-send,.contact-result a,.community-input button,.course-cta,.sfoot-cta):focus-visible{outline:2px solid #1d1611!important;outline-offset:3px!important}
    :is(.btn.light,.ub:not(.solid),.lx-btn:not(.solid),.hl-btn:not(.solid),.cx-sub,.ed-pill:not(.solid),.cat-more a:not(.solid)){background:transparent!important;color:#1d1611!important;border-color:#bfae9f!important}
    :is(.btn.light,.ub:not(.solid),.lx-btn:not(.solid),.hl-btn:not(.solid),.cx-sub,.ed-pill:not(.solid),.cat-more a:not(.solid)):hover{background:#fffdfb!important;color:#1d1611!important;border-color:#1d1611!important}
    :is(.btn .arrow,.ub-i,.ed-pill>span,.cx-all>span,.cx-sub>span,.cat-more a>span){display:none!important}
    .sfoot-cta svg{width:18px;height:18px;padding:0;background:none;color:inherit}
    /* The original hero keeps its circular icon buttons, as in the reference video. */
    body.original-home :is(.ha-ctas,.ha-bottom) .ub{padding:0 22px 0 6px!important;gap:14px!important;justify-content:space-between!important}
    body.original-home :is(.ha-ctas,.ha-bottom) .ub-i{display:grid!important;place-items:center!important;flex:0 0 36px!important;width:36px!important;height:36px!important;margin:0!important;border:0!important;border-radius:50%!important;background:#f7f3ef!important;color:#1d1611!important;font:400 16px/1 'Rubik',sans-serif!important;font-style:normal!important}
    body.original-home :is(.ha-ctas,.ha-bottom) .ub:not(.solid) .ub-i{background:#1d1611!important;color:#f7f3ef!important}
    .btn.small,.course-cta{min-height:40px!important;padding:0 20px!important;font-size:13px!important}
    body.original-home .ha-top{display:flex;flex-direction:column;align-items:flex-start;gap:13px}
    body.original-home .ha-proof{display:flex!important;align-items:center;gap:10px;padding:5px 14px 5px 5px;border:1px solid rgba(110,82,66,.18);border-radius:999px;background:rgba(255,253,251,.72);box-shadow:0 8px 24px rgba(76,52,36,.08);backdrop-filter:blur(10px)}
    body.original-home .ha-av img{width:38px;height:38px;border:2px solid #fffdfb}
    body.original-home .ha-proof b{color:#2a211c;font-size:16px;direction:ltr;unicode-bidi:isolate}
    body.original-home .ha-proof span{font:400 12px/1.2 'Rubik',sans-serif;color:#6d5a4d}
    body.original-home .ha-eyebrow{order:2}
    @media(max-width:900px){
      .snav{top:42px;left:12px;right:12px;height:54px;padding:0 15px}
      .snav-logo img{height:36px}
    }
    @media(max-width:600px){
      .snav{top:40px;left:12px;right:12px;height:54px;padding:0 13px}
      body.s-scrolled .snav{top:8px;height:52px}
      body.original-home .ha-top{align-items:center;gap:11px}
      body.original-home .ha-proof{padding:4px 12px 4px 4px}
      body.original-home .ha-av img{width:34px;height:34px}
    }
    @media(prefers-reduced-motion:reduce){.snav,.snav-panel,:is(.btn,.ub,.lx-btn,.hl-btn,.cx-all,.cx-sub,.ed-pill,.cat-more a,.hl-cards a,.sfoot-cta,.contact-send,.contact-result a,.community-input button,.course-cta){transition:none!important}}
  `;
  document.head.appendChild(sharedStyle);
  const bar = document.createElement('div');
  bar.className = 'sbar';
  bar.innerHTML = `<span>${svg('truck')}משלוח חינם בקנייה מעל <bdi>329.90 ₪</bdi></span><i></i><span>${svg('heart')}ייעוץ אישי מליעד</span><i></i><span>${svg('heart')}מוצרים שנבחרו בקפידה אישית בסטודיו</span>`;
  const nav = document.createElement('header');
  nav.className = 'snav'; nav.setAttribute('aria-label', 'ניווט ראשי');
  nav.innerHTML = `<a class="snav-logo" href="${home ? '#hero' : HOME}" aria-label="LIAD"><img src="assets/img/brand/liad-logo-nav.png" alt="LIAD"></a>
    <nav class="snav-links">${links.map(([t, u, on]) => `<a href="${u}"${on ? ' class="on"' : ''}>${t}</a>`).join('')}</nav>
    <div class="snav-icons"><button class="snav-burger" aria-label="תפריט" aria-expanded="false"><svg viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button><a class="hide-m" href="${SHOP}#catalog-search" aria-label="חיפוש">${svg('search')}</a><a class="hide-m" href="${h('#contact')}" aria-label="ייעוץ אישי">${svg('user')}</a><a href="${SHOP}?favorites=1" aria-label="מועדפים">${svg('heart')}</a><button class="nav-cart" data-open-cart aria-label="פתיחת סל הקניות">${svg('bag')}<span data-cart-count class="nav-cart-count">0</span></button></div>`;
  const panel = document.createElement('nav');
  panel.className = 'snav-panel'; panel.setAttribute('aria-label', 'תפריט נייד');
  panel.innerHTML = links.map(([t, u]) => `<a href="${u}">${t}</a>`).join('') + `<a href="${SHOP}">לחנות</a>`;
  const foot = document.createElement('footer');
  foot.className = 'sfoot'; foot.setAttribute('data-screen-label', 'Footer');
  foot.innerHTML = `<div class="sfoot-top">
      <div class="sfoot-brand"><img src="assets/img/brand/liad-logo-crop.png" alt="LIAD" style="height:92px;width:auto"><small>יופי · אנשים · תשוקה</small><p>סטודיו, אקדמיה וחנות למקצועניות הציפורניים. מוצרים שנבחרו בעבודה היומיומית, וקורסים בכיתת בוטיק של עד 3 תלמידות.</p><a class="sfoot-cta" href="mailto:${MAIL}">${svg('mail')}לכתוב לליעד</a></div>
      <div><h4>החנות</h4><ul><li><a href="${SHOP}">כל המוצרים</a></li><li><a href="${h('#products')}">מוצרים מובילים</a></li><li><a href="${h('#categories')}">קטגוריות</a></li><li><a href="${SHOP}?favorites=1">המועדפים שלי</a></li></ul></div>
      <div><h4>האקדמיה</h4><ul><li><a href="syllabus.html?c=gel-anatomy">לק ג׳ל ומבנה אנטומי</a></li><li><a href="syllabus.html?c=acrygel">בנייה באקריג׳ל</a></li><li><a href="syllabus.html?c=teens">לק ג׳ל נערות</a></li><li><a href="syllabus.html?c=pedicure">פדיקור קוסמטי פלוס</a></li><li><a href="courses.html">לכל הקורסים</a></li></ul></div>
      <div><h4>מידע</h4><ul><li><a href="${h('#about')}">אודות</a></li><li><a href="${h('#branches')}">הסניפים</a></li><li><a href="${h('#journal')}">כתבות וטיפים</a></li><li><a href="${h('#contact')}">שאלות נפוצות</a></li><li><a href="mailto:${MAIL}" dir="ltr">${MAIL}</a></li></ul></div>
    </div>
    <div class="sfoot-trust"><span>${svg('truck')}משלוח חינם מעל <bdi>329.90 ₪</bdi></span><span>${svg('heart')}ייעוץ אישי מליעד</span><span>${svg('heart')}ליווי אישי גם אחרי הקורס</span></div>
    <div class="sfoot-bottom"><span>© 2026 LIAD. כל הזכויות שמורות.</span><span><a href="shipping.html">משלוחים</a> · <a href="privacy.html">פרטיות</a> · <a href="terms.html">תנאי שימוש</a> · <a href="accessibility.html">נגישות</a></span></div>`;
  const mount = () => {
    document.body.prepend(panel); document.body.prepend(nav); document.body.prepend(bar);
    const main = document.querySelector('main') || document.querySelector('x-dc > div') || document.body;
    (main === document.body ? document.body : main.parentNode).insertBefore(foot, main === document.body ? null : main.nextSibling);
  };
  document.body ? mount() : document.addEventListener('DOMContentLoaded', mount);
  panel.inert = true;
  const b = nav.querySelector('.snav-burger');
  addEventListener('keydown',e=>{if(e.key==='Escape'){panel.classList.remove('open');panel.inert=true;b.setAttribute('aria-expanded','false');}});
  b.addEventListener('click', () => { const o = panel.classList.toggle('open'); panel.inert = !o; b.setAttribute('aria-expanded', o); });
  panel.addEventListener('click', e => { if (e.target.closest('a')) { panel.classList.remove('open'); panel.inert=true; b.setAttribute('aria-expanded', false); } });
  const msgs = [...bar.querySelectorAll('span')]; let mi = 0; msgs[0].classList.add('cur');
  setInterval(() => { msgs[mi].classList.remove('cur'); mi = (mi + 1) % msgs.length; msgs[mi].classList.add('cur'); }, 3200);
  const onScroll = () => {
    document.body.classList.toggle('s-scrolled', scrollY > 40);
  };
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
})();
