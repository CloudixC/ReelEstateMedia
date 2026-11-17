/* The Content Hub — shared behaviour for the public pages (landing, services, towns, brokerages, reviews, price list).
   Every part looks for its own elements and does nothing on a page that doesn't have them. */
(function(){
  var E = 'https://script.google.com/macros/s/AKfycbyALH9lG_dzg13ooj1brWBifZfAWVcZ3JgtJc617PPLii4kK1igFyU4Gu41Lzwy5gGEiw/exec';
  var $ = function(id){ return document.getElementById(id); };
  var all = function(sel){ return [].slice.call(document.querySelectorAll(sel)); };
  var esc = function(s){ var d = document.createElement('div'); d.textContent = s == null ? '' : String(s); return d.innerHTML.replace(/"/g, '&quot;'); };
  var page = String(document.body.getAttribute('data-page') || 'page').replace(/[^a-z0-9-]/g, '').slice(0, 40) || 'page';
  var SITE = window.SITE = {page: page};

  /* ---- 📈 counts: one row per visit to a page, per Book click and per enquiry. No names, nothing about the visitor.
     Kept by month (ref 'site-YYYY-MM'); the Command Centre reads the totals. The studio's own browser isn't counted. ---- */
  var studio = false; try{ studio = !!localStorage.getItem('rem_admin_token_v1'); }catch(e){}
  var now = new Date(), mo = now.getFullYear() + '-' + ('0' + (now.getMonth() + 1)).slice(-2);
  function count(label, onceKey){
    if(studio) return;
    try{ if(onceKey){ if(sessionStorage.getItem(onceKey)) return; sessionStorage.setItem(onceKey, '1'); } }catch(e){}
    try{ fetch(E, {method: 'POST', keepalive: true, body: JSON.stringify({kind: 'biohit', ref: 'site-' + mo, project: '', dname: '', who: '', body: JSON.stringify({t: 'link', l: label})})}).catch(function(){}); }catch(e){}
  }
  SITE.count = count;
  count('v:' + page, 'sitehit:' + mo + ':' + page);
  document.addEventListener('click', function(e){ var a = e.target.closest ? e.target.closest('a[href*="calendly.com"]') : null; if(a) count('book', 'sitebook:' + page); }, true);

  /* ---- prices are never typed on these pages: each figure is read off the price list ---- */
  if(document.querySelector('[data-price]')){
    fetch('pricing.html').then(function(r){ return r.ok ? r.text() : ''; }).then(function(t){
      if(!t) return;
      var doc = new DOMParser().parseFromString(t, 'text/html'), map = {};
      [].slice.call(doc.querySelectorAll('.row')).forEach(function(row){
        var n = row.querySelector('.nm b'), p = row.querySelector('.pr');
        if(n && p && /\d/.test(p.textContent)) map[n.textContent.trim()] = p.textContent.replace(/\s+/g, '');
      });
      all('[data-price]').forEach(function(el){ var v = map[el.getAttribute('data-price')]; if(!v) return; (el.querySelector('b') || el).textContent = v; el.classList.add('on'); });
    }).catch(function(){});
  }

  /* ---- reviews: the links to the reviews page, and the reviews themselves, appear only once there are some ---- */
  if(document.querySelector('[data-rev]') || $('quotes') || $('wallgrid')){
    fetch(E + '?wall=1').then(function(r){ return r.json(); }).then(function(j){
      var items = (j && j.ok && j.items) ? j.items.filter(function(t){ return t && t.q; }) : [];
      var g = $('wallgrid');
      if(!items.length){ if(g) g.innerHTML = '<div class="empty">The first reviews are on their way.</div>'; return; }
      all('[data-rev]').forEach(function(a){ a.hidden = false; });
      var card = function(t, max){ var q = String(t.q); if(max && q.length > max) q = q.slice(0, max - 3).replace(/\s+\S*$/, '') + '…';
        return '<div class="q"><p>“' + esc(q) + '”</p><div class="who"><b>' + esc(t.w) + '</b>' + (t.b ? ' · ' + esc(t.b) : '') + '</div></div>'; };
      if($('quotes')){ $('quotes').innerHTML = items.slice(0, 3).map(function(t){ return card(t, 240); }).join(''); if($('reviews')) $('reviews').hidden = false; }
      if(g) g.innerHTML = items.map(function(t){ return card(t, 0); }).join('');
    }).catch(function(){ var g = $('wallgrid'); if(g) g.innerHTML = '<div class="empty">Couldn’t load the reviews — refresh to try again.</div>'; });
  }

  /* ---- 📱 on a phone the Book button follows once the first one has scrolled away ---- */
  (function(){
    var first = document.querySelector('.hero .acts'); if(!first || !$('stick') || !('IntersectionObserver' in window)) return;
    new IntersectionObserver(function(en){ document.body.classList.toggle('stuck', !en[0].isIntersecting && en[0].boundingClientRect.top < 0); }).observe(first);
  })();

  /* ---- 🌐 the parts managed from the Command Centre (More → Website): recent work, phone, Instagram, towns, questions,
     the sample listing page. Each stays hidden until there is something to show. Everything is treated as plain text, and
     a link is only used when it points at Google Drive (shown here) or Instagram / YouTube / TikTok / Vimeo (new tab). ---- */
  var driveId = function(u){ u = String(u || ''); if(!/^https:\/\/(drive|docs)\.google\.com\//i.test(u) && !/^https:\/\/lh3\.googleusercontent\.com\/d\//i.test(u)) return '';
    var m = u.match(/\/d\/([-\w]{25,})/) || u.match(/[?&]id=([-\w]{25,})/); return m ? m[1] : ''; };
  var extUrl = function(u){ u = String(u || '').trim(); if(u.length > 300 || /["'<>\s\\]/.test(u)) return ''; return /^https:\/\/(www\.)?(instagram\.com|youtube\.com|youtu\.be|tiktok\.com|vimeo\.com)\//i.test(u) ? u : ''; };
  var lb = null, lbin = null;
  function viewer(){
    if(lb) return;
    lb = document.createElement('div'); lb.id = 'lb'; lb.setAttribute('role', 'dialog'); lb.setAttribute('aria-modal', 'true'); lb.setAttribute('aria-label', 'Viewer');
    lb.innerHTML = '<button type="button" class="x" aria-label="Close">✕</button><div id="lbin"></div>'; document.body.appendChild(lb); lbin = $('lbin');
    lb.addEventListener('click', function(e){ if(e.target === lb || (e.target.closest && e.target.closest('.x'))) shut(); });
  }
  function shut(){ if(lb){ lb.classList.remove('on'); lbin.innerHTML = ''; } var q = $('enq'); if(q) q.classList.remove('on'); }
  document.addEventListener('keydown', function(e){ if(e.key === 'Escape') shut(); });
  document.addEventListener('click', function(e){
    var t = e.target.closest ? e.target.closest('[data-shot]') : null; if(!t) return;
    viewer(); var id = t.getAttribute('data-shot');
    lbin.innerHTML = t.getAttribute('data-kind') === 'v' ? '<iframe src="https://drive.google.com/file/d/' + id + '/preview" allow="autoplay; fullscreen" allowfullscreen title="Video"></iframe>' : '<img alt="" src="https://lh3.googleusercontent.com/d/' + id + '=w2000">';
    lb.classList.add('on');
  });
  if($('showcase') || $('faq') || $('towns') || $('closeacts') || $('igfoot') || document.querySelector('[data-demo]')){
    fetch(E + '?review=site-content').then(function(r){ return r.json(); }).then(function(j){
      var d = (j && j.state) || null; if(!d || typeof d !== 'object') return;
      // recent work — a page can ask for photos only, videos only, or only the pieces whose caption names its town
      var sc = $('showcase');
      if(sc){
        var want = sc.getAttribute('data-show') || '', town = String(sc.getAttribute('data-town') || '').toLowerCase();
        var show = Array.isArray(d.show) ? d.show.slice(0, 18) : [], reels = '', shots = '';
        show.forEach(function(x){
          if(!x || typeof x !== 'object') return;
          var cap = String(x.c || '').trim().slice(0, 80), vid = x.k === 'v', id = driveId(x.u), ext = id ? '' : extUrl(x.u);
          if((want === 'p' && vid) || (want === 'v' && !vid)) return;
          if(town && cap.toLowerCase().indexOf(town) < 0) return;
          if(id){
            var img = vid ? 'https://drive.google.com/thumbnail?id=' + id + '&sz=w600' : 'https://lh3.googleusercontent.com/d/' + id + '=w900';
            var tile = '<button type="button" class="shot" data-shot="' + id + '" data-kind="' + (vid ? 'v' : 'p') + '" aria-label="' + esc(cap || (vid ? 'Play the video' : 'Open the photo')) + '"><img loading="lazy" alt="" src="' + img + '">' + (vid ? '<span class="play">▶</span>' : '') + (cap ? '<span class="cap">' + esc(cap) + '</span>' : '') + '</button>';
            if(vid) reels += tile; else shots += tile;
          } else if(ext && vid){
            var host = /instagram/i.test(ext) ? 'Instagram' : /youtu/i.test(ext) ? 'YouTube' : /tiktok/i.test(ext) ? 'TikTok' : 'Vimeo';
            reels += '<a class="shot ext" target="_blank" rel="noopener" href="' + esc(ext) + '"><b>' + esc(cap || 'Watch the reel') + '</b><span>Watch on ' + host + ' ↗</span></a>';
          }
        });
        if(reels || shots){
          $('reels').innerHTML = reels; $('shots').innerHTML = shots; sc.hidden = false;
          // a file that isn't shared with "anyone with the link" simply drops out
          all('#showcase .shot img').forEach(function(im){ im.addEventListener('error', function(){ var t = im.closest('.shot'); if(t) t.remove(); if(!document.querySelector('#showcase .shot')) sc.hidden = true; }); });
        }
      }
      var tw = $('towns');
      if(tw){ var towns = (Array.isArray(d.towns) ? d.towns : []).map(function(t){ return String(t || '').trim().slice(0, 30); }).filter(Boolean).slice(0, 24);
        if(towns.length){ tw.innerHTML = '<b>Shooting in</b> ' + towns.map(esc).join(' · '); tw.hidden = false; } }
      var fq = $('faq');
      if(fq){ var faq = (Array.isArray(d.faq) ? d.faq : []).filter(function(x){ return x && String(x.q || '').trim() && String(x.a || '').trim(); }).slice(0, 12);
        if(faq.length){ fq.innerHTML = faq.map(function(x){ return '<details><summary>' + esc(String(x.q).trim().slice(0, 140)) + '</summary><p>' + esc(String(x.a).trim().slice(0, 700)) + '</p></details>'; }).join(''); if($('questions')) $('questions').hidden = false; } }
      var ca = $('closeacts'), digits = String(d.phone || '').replace(/[^\d+]/g, '');
      if(ca && digits.replace(/\D/g, '').length >= 10 && digits.length <= 16){ var a = document.createElement('a'); a.className = 'btn sec'; a.href = 'tel:' + digits; a.textContent = '📞 ' + String(d.phone).trim().slice(0, 24); ca.appendChild(a); }
      var ig = String(d.ig || '').replace(/^@/, '').trim(), f = $('igfoot');
      if(f && /^[A-Za-z0-9._]{1,30}$/.test(ig)){ f.href = 'https://www.instagram.com/' + ig + '/'; f.hidden = false; }
      // the sample listing page: a real published listing when one has been chosen (opened in sample mode — nothing is counted or sent)
      var demo = String(d.demo || '').trim();
      if(/^https:\/\/thecontenthub\.ca\/listing-layouts\.html\?[\w=&%.\-]{3,200}$/.test(demo)) all('[data-demo]').forEach(function(l){ l.href = demo + '&demo=1'; });
    }).catch(function(){});
  }

  /* ---- ✉ the enquiry form: any link marked data-enquire opens it instead of the visitor's mail app ---- */
  var enq = null, topic = '', openedAt = 0, lastSent = 0;
  function enquiry(){
    if(enq) return;
    enq = document.createElement('div'); enq.id = 'enq'; enq.setAttribute('role', 'dialog'); enq.setAttribute('aria-modal', 'true'); enq.setAttribute('aria-labelledby', 'enq-h');
    enq.innerHTML = '<form id="enqf" novalidate><button type="button" class="x" aria-label="Close">✕</button><div class="eyebrow">Get in touch</div><h3 id="enq-h"></h3>' +
      '<div id="enq-fields"><label>Your name<input name="n" maxlength="60" autocomplete="name"></label>' +
      '<div class="two"><label>Phone<input name="p" type="tel" maxlength="24" autocomplete="tel"></label><label>Email<input name="e" type="email" maxlength="80" autocomplete="email"></label></div>' +
      '<label>What would you like to know?<textarea name="m" rows="4" maxlength="800"></textarea></label>' +
      '<input name="company" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true">' +
      '<div class="acts"><button type="submit" class="btn pri">Send</button></div></div>' +
      '<p class="msg" role="status"></p><p class="fine">This goes straight to Reel Estate Media. We only use it to reply to you.</p></form>';
    document.body.appendChild(enq);
    enq.addEventListener('click', function(e){ if(e.target === enq || (e.target.closest && e.target.closest('.x'))) enq.classList.remove('on'); });
    var f = $('enqf'), msg = f.querySelector('.msg');
    f.addEventListener('submit', function(e){
      e.preventDefault();
      var v = function(k){ return String(f.elements[k].value || '').trim(); };
      var n = v('n'), p = v('p'), em = v('e'), m = v('m');
      if(!n){ msg.textContent = 'Please add your name.'; return; }
      var okP = p.replace(/\D/g, '').length >= 7, okE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em);
      if(!okP && !okE){ msg.textContent = 'Add a phone number or an email so we can reply.'; return; }
      var done = function(){ $('enq-fields').style.display = 'none'; msg.textContent = '✓ Sent — we’ll be in touch shortly.'; };
      if(v('company') || Date.now() - openedAt < 2500){ done(); return; }           // a form filled by a script: say thanks, send nothing
      if(Date.now() - lastSent < 20000){ msg.textContent = 'Already sent — give it a moment.'; return; }
      var btn = f.querySelector('button[type=submit]'); btn.disabled = true; msg.textContent = 'Sending…';
      fetch(E, {method: 'POST', body: JSON.stringify({kind: 'enquiry', ref: 'website', project: 'Website enquiry', dname: topic, who: n.slice(0, 60), from: 'web',
        body: 'About: ' + topic + '\nName: ' + n + '\nPhone: ' + (p || '—') + '\nEmail: ' + (em || '—') + '\nPage: ' + page + (m ? '\n\n' + m : '')})})
        .then(function(r){ return r.json(); }).then(function(j){ btn.disabled = false; if(!j || !j.ok) throw new Error('no'); lastSent = Date.now(); done(); count('enquiry'); })
        .catch(function(){ btn.disabled = false; msg.innerHTML = 'Couldn’t send just now. Email <a href="mailto:hello@reelestatemedia.com?subject=' + encodeURIComponent(topic) + '">hello@reelestatemedia.com</a> instead.'; });
    });
  }
  document.addEventListener('click', function(e){
    var t = e.target.closest ? e.target.closest('[data-enquire]') : null; if(!t) return;
    e.preventDefault(); enquiry();
    topic = String(t.getAttribute('data-enquire') || 'General').slice(0, 60); openedAt = Date.now();
    $('enq-h').textContent = t.getAttribute('data-enquire-title') || 'Send us a note';
    $('enq-fields').style.display = ''; $('enqf').querySelector('.msg').textContent = '';
    enq.classList.add('on'); try{ $('enqf').elements.n.focus(); }catch(e2){}
  });
})();
