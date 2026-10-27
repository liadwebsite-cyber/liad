(() => {
 const topic=new URLSearchParams(location.search).get('topic')||'';
 const heroProof=document.querySelector('.ha-proof');
 const heroTop=document.querySelector('.ha-top');
 if(heroProof&&heroTop){
  heroTop.prepend(heroProof);
 }
 const contact=document.getElementById('contact');
 const block=document.createElement('div');block.className='home-contact';
 block.innerHTML=`<div><h3>בואי נדבר.</h3><p>מתלבטת לגבי מוצר או מסלול לימודים? כתבי לי ונמצא יחד את מה שמתאים לך.</p><a href="mailto:rubinliad@gmail.com" dir="ltr">rubinliad@gmail.com</a><p style="margin-top:24px">בנימינה · מתחם הפיל<br>נתניה · שדרות בן צבי 18<br>הגעה בתיאום מראש.</p></div><form id="home-contact-form"><label>שם מלא<input name="name" autocomplete="name" required minlength="2"></label><label>טלפון<input type="tel" name="phone" autocomplete="tel" pattern="[0-9+\\(\\)\\- ]{9,16}" required></label><label class="wide">נושא הפנייה<input name="topic" id="inquiry-topic" required></label><label class="wide">איך אפשר לעזור?<textarea name="message" rows="3" required maxlength="2000"></textarea></label><p class="home-form-note wide">הטופס מכין הודעת מייל. שליחת הפנייה מתבצעת מתוכנת המייל שלך.</p><button class="contact-send" type="submit">להכנת הפנייה</button><div id="home-contact-result" class="contact-result wide" aria-live="polite"></div></form>`;
 contact.append(block);document.getElementById('inquiry-topic').value=topic;
 const form=document.getElementById('home-contact-form'),result=document.getElementById('home-contact-result');
 form.addEventListener('input',()=>result.replaceChildren());
 form.addEventListener('submit',e=>{e.preventDefault();const d=Object.fromEntries(new FormData(form));const p=document.createElement('p');p.textContent='הפנייה מוכנה, אך עדיין לא נשלחה. פתחי אותה במייל ושלחי לליעד.';const a=document.createElement('a');a.href='mailto:rubinliad@gmail.com?subject='+encodeURIComponent(d.topic)+'&body='+encodeURIComponent(`שלום ליעד,\n${d.message}\n\nשם: ${d.name}\nטלפון: ${d.phone}`);a.textContent='לפתיחת הפנייה במייל';result.replaceChildren(p,a);});
 // Let anchor navigation settle after the original page's dynamic sections mount.
 const restoreAnchor=()=>{if(location.hash){const el=document.getElementById(location.hash.slice(1));if(el){if(window.liadScroll)window.liadScroll.scrollTo(el,{immediate:true,offset:-110});else el.scrollIntoView({block:'start',behavior:'instant'});}}};
 addEventListener('load',()=>{requestAnimationFrame(()=>{window.ScrollTrigger?.refresh();restoreAnchor();});},{once:true});
 addEventListener('hashchange',restoreAnchor);
 document.querySelectorAll('.snav-links a').forEach(a=>a.addEventListener('click',()=>{document.body.classList.remove('s-hide');}));
})();
