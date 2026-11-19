/* The Content Hub — shared behaviour for the public pages (landing, services, towns, guides, portfolio, shoot builder,
   brokerages, reviews, services, privacy). No page shows a price.
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
  var studio = false; try{ studio = !!(localStorage.getItem('rem_admin_token_v1') || localStorage.getItem('rem_pipeline_v1') || localStorage.getItem('rem_setup_v1')); }catch(e){}   // any browser that holds the Command Centre
  var now = new Date(), mo = now.getFullYear() + '-' + ('0' + (now.getMonth() + 1)).slice(-2);
  function count(label, onceKey){
    if(studio) return;
    try{ if(onceKey){ if(sessionStorage.getItem(onceKey)) return; sessionStorage.setItem(onceKey, '1'); } }catch(e){}
    try{ fetch(E, {method: 'POST', keepalive: true, body: JSON.stringify({kind: 'biohit', ref: 'site-' + mo, project: '', dname: '', who: '', body: JSON.stringify({t: 'link', l: label})})}).catch(function(){}); }catch(e){}
  }
  SITE.count = count;
  count('v:' + page, 'sitehit:' + mo + ':' + page);
  document.addEventListener('click', function(e){
    var a = e.target.closest ? e.target.closest('a[href*="calendly.com"]') : null; if(a) count('book', 'sitebook:' + page);
    var t = e.target.closest ? e.target.closest('a[href^="sms:"]') : null; if(t) count('text', 'sitetext:' + page);
  }, true);
  /* where this visit came from — counted once per browser session. Only the kind of place is kept (Instagram, Google,
     typed in…), never the address. A link can say so itself: thecontenthub.ca/?src=ig */
  (function(){
    var k = '', q = '';
    try{ var sp = new URLSearchParams(location.search); q = String(sp.get('src') || sp.get('utm_source') || '').toLowerCase().replace(/[^a-z]/g, '').slice(0, 12); }catch(e){}
    var MAP = {ig: 'ig', instagram: 'ig', fb: 'fb', facebook: 'fb', tt: 'tt', tiktok: 'tt', google: 'go', gbp: 'go', email: 'em', em: 'em', text: 'tx', tx: 'tx', sms: 'tx', qr: 'qr', card: 'qr'};
    if(q && MAP[q]) k = MAP[q];
    else {
      var h = ''; try{ h = document.referrer ? new URL(document.referrer).hostname.toLowerCase() : ''; }catch(e){}
      if(!h) k = 'direct';
      else if(h === location.hostname) k = '';                       // moving around the site
      else if(/(^|\.)instagram\.com$/.test(h)) k = 'ig';
      else if(/(^|\.)(facebook|fb)\.com$/.test(h)) k = 'fb';
      else if(/(^|\.)tiktok\.com$/.test(h)) k = 'tt';
      else if(/(^|\.)google\.[a-z.]+$/.test(h)) k = 'go';
      else if(/(^|\.)(bing|duckduckgo|yahoo)\.com$/.test(h)) k = 'se';
      else k = 'other';
    }
    if(k) count('s:' + k, 'sitesrc:' + mo);
  })();

  /* (Nov 19, 2026) The public site shows no prices — agents see them in their hub. Nothing here reads or prints one. */

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
  var SVC = {photo: 'Listing photos', video: 'Listing video', reels: 'Reels', head: 'Headshots', event: 'Events'};
  function tile(x){
    if(!x || typeof x !== 'object') return null;
    var cap = String(x.c || '').trim().slice(0, 80), vid = x.k === 'v', id = driveId(x.u), ext = id ? '' : extUrl(x.u), sv = SVC[x.s] ? x.s : '';
    if(id){
      var img = vid ? 'https://drive.google.com/thumbnail?id=' + id + '&sz=w600' : 'https://lh3.googleusercontent.com/d/' + id + '=w900';
      return {vid: vid, s: sv, cap: cap, html: '<button type="button" class="shot" data-s="' + sv + '" data-shot="' + id + '" data-kind="' + (vid ? 'v' : 'p') + '" aria-label="' + esc(cap || (vid ? 'Play the video' : 'Open the photo')) + '"><img loading="lazy" alt="" src="' + img + '">' + (vid ? '<span class="play">▶</span>' : '') + (cap ? '<span class="cap">' + esc(cap) + '</span>' : '') + '</button>'};
    }
    if(ext && vid){
      var host = /instagram/i.test(ext) ? 'Instagram' : /youtu/i.test(ext) ? 'YouTube' : /tiktok/i.test(ext) ? 'TikTok' : 'Vimeo';
      return {vid: true, s: sv, cap: cap, html: '<a class="shot ext" data-s="' + sv + '" target="_blank" rel="noopener" href="' + esc(ext) + '"><b>' + esc(cap || 'Watch the reel') + '</b><span>Watch on ' + host + ' ↗</span></a>'};
    }
    return null;
  }
  {
    fetch(E + '?review=site-content').then(function(r){ return r.json(); }).then(function(j){
      var d = (j && j.state) || null; if(!d || typeof d !== 'object'){ storyPage(null); return; }
      // 🖼 the portfolio page: everything published, with a chip per kind of work
      var pf = $('portfolio');
      if(pf){
        var items = (Array.isArray(d.show) ? d.show.slice(0, 48) : []).map(tile).filter(Boolean);
        if(items.length){
          var kinds = []; items.forEach(function(t){ if(t.s && kinds.indexOf(t.s) < 0) kinds.push(t.s); });
          $('pf-grid').innerHTML = items.map(function(t){ return t.html; }).join('');
          if(kinds.length > 1){
            $('pf-chips').innerHTML = '<button type="button" class="chip on" data-pf="">All</button>' + kinds.map(function(k){ return '<button type="button" class="chip" data-pf="' + k + '">' + SVC[k] + '</button>'; }).join('');
            $('pf-chips').addEventListener('click', function(e){ var c = e.target.closest ? e.target.closest('[data-pf]') : null; if(!c) return; var k = c.getAttribute('data-pf');
              all('#pf-chips .chip').forEach(function(x){ x.classList.toggle('on', x === c); });
              all('#pf-grid .shot').forEach(function(x){ x.hidden = !!k && x.getAttribute('data-s') !== k; }); });
            $('pf-chips').hidden = false;
          }
          pf.hidden = false;
          all('#pf-grid .shot img').forEach(function(im){ im.addEventListener('error', function(){ var t = im.closest('.shot'); if(t) t.remove(); if(!document.querySelector('#pf-grid .shot')) pf.hidden = true; }); });
        }
      }
      // recent work — a page can ask for photos only, videos only, or only the pieces whose caption names its town
      var sc = $('showcase');
      if(sc){
        var want = sc.getAttribute('data-show') || '', town = String(sc.getAttribute('data-town') || '').toLowerCase();
        var show = Array.isArray(d.show) ? d.show.slice(0, 18) : [], reels = '', shots = '';
        show.forEach(function(x){
          var t = tile(x); if(!t) return;
          if((want === 'p' && t.vid) || (want === 'v' && !t.vid)) return;
          if(town && t.cap.toLowerCase().indexOf(town) < 0) return;
          if(t.vid) reels += t.html; else shots += t.html;
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
      if(ca && digits.replace(/\D/g, '').length >= 10 && digits.length <= 16){ var a = document.createElement('a'); a.className = 'btn sec'; a.href = 'tel:' + digits; a.textContent = '📞 ' + String(d.phone).trim().slice(0, 24); ca.appendChild(a);
        var tx = document.createElement('a'); tx.className = 'btn sec'; tx.href = 'sms:' + digits; tx.textContent = '💬 Text us'; ca.appendChild(tx); }
      var stk = $('stick');
      if(stk && digits.replace(/\D/g, '').length >= 10 && digits.length <= 16){ var sb = stk.querySelector('.btn.sec'); if(sb){ sb.href = 'sms:' + digits; sb.textContent = '💬 Text us'; } }
      var ig = String(d.ig || '').replace(/^@/, '').trim(), f = $('igfoot');
      if(f && /^[A-Za-z0-9._]{1,30}$/.test(ig)){ f.href = 'https://www.instagram.com/' + ig + '/'; f.hidden = false; }
      // the sample listing page: a real published listing when one has been chosen (opened in sample mode — nothing is counted or sent)
      var gb = String(d.gbp || '').trim();
      if(gbpOk(gb)) all('[data-gbp]').forEach(function(l){ l.href = gb; l.hidden = false; });
      storyPage(storyOf(d));
      var demo = String(d.demo || '').trim();
      if(/^https:\/\/thecontenthub\.ca\/listing-layouts\.html\?[\w=&%.\-]{3,200}$/.test(demo)) all('[data-demo]').forEach(function(l){ l.href = demo + '&demo=1'; });
    }).catch(function(){ storyPage(null); });
  }
  /* ---- 🤝 agents we work with: only agents who ticked "List me" in their own hub. The footer link shows once someone has.
     The home page and the agents page ask; the count is remembered for six hours so the other pages don't have to. ---- */
  (function(){
    var box = $('aglist'), links = all('[data-ags]'); if(!box && !links.length) return;
    var K = 'site_ags_v1', n = -1;
    try{ var c = JSON.parse(localStorage.getItem(K) || 'null'); if(c && Date.now() - c.at < 216e5) n = +c.n || 0; }catch(e){}
    var showLinks = function(k){ if(k > 0) links.forEach(function(l){ l.hidden = false; }); };
    if(n >= 0) showLinks(n);
    if(!box && (n >= 0 || page !== 'start')) return;
    var none = function(){ if(box) box.innerHTML = '<div class="empty">No one is listed here yet — this page fills in as agents choose to be on it.</div>'; };
    fetch(E + '?agents=1').then(function(r){ return r.json(); }).then(function(j){
      var list = ((j && j.ok && Array.isArray(j.agents)) ? j.agents : []).filter(function(x){ return x && /^p[0-9a-f]{20}$/.test(String(x.p || '')) && String(x.n || '').trim(); }).slice(0, 200);
      try{ localStorage.setItem(K, JSON.stringify({n: list.length, at: Date.now()})); }catch(e){}
      showLinks(list.length);
      if(!box) return;
      if(!list.length){ none(); return; }
      box.innerHTML = list.map(function(x){
        var hd = /^[-\w]{25,60}$/.test(String(x.h || '')) ? 'https://drive.google.com/thumbnail?id=' + x.h + '&sz=w240' : '';
        return '<a class="agcard" target="_blank" rel="noopener" href="bio.html?p=' + x.p + '"><i class="ph"' + (hd ? ' style="background-image:url(&quot;' + hd + '&quot;)"' : '') + ' aria-hidden="true">' + (hd ? '' : '🏡') + '</i><span class="tx"><b>' + esc(String(x.n).trim().slice(0, 60)) + '</b>' +
          (String(x.b || '').trim() ? '<small>' + esc(String(x.b).trim().slice(0, 60)) + '</small>' : '') + (String(x.t || '').trim() ? '<span class="tg">' + esc(String(x.t).trim().slice(0, 140)) + '</span>' : '') + '</span></a>'; }).join('');
    }).catch(none);
  })();
  function gbpOk(u){ return u.length <= 300 && !/["'<>\s\\]/.test(u) && /^https:\/\/(g\.page\/|maps\.app\.goo\.gl\/|goo\.gl\/maps\/|(www\.)?google\.[a-z.]+\/maps[\/?]|search\.google\.com\/local\/|share\.google\/)/i.test(u); }
  /* 📖 one agent's story — written in the Command Centre, shown only once it is published there with her OK */
  function storyOf(d){
    var st = d && d.story; if(!st || typeof st !== 'object' || st.ok !== true) return null;
    var t = function(v, n){ return String(v || '').trim().slice(0, n); };
    var o = {name: t(st.name, 60), role: t(st.role, 80), head: t(st.head, 120), did: t(st.did, 900), quote: t(st.quote, 500),
      res: (Array.isArray(st.res) ? st.res : []).map(function(r){ return t(r, 90); }).filter(Boolean).slice(0, 4)};
    return (o.name && o.head && o.did) ? o : null;
  }
  function storyPage(st){
    if(st) all('[data-story]').forEach(function(l){ l.hidden = false; });
    var box = $('story'); if(!box) return;
    if(!st){ box.innerHTML = '<div class="empty">This story isn’t published yet. <a href="./">Back to the home page →</a></div>'; return; }
    document.title = st.head + ' — The Content Hub';
    box.innerHTML = '<div class="eyebrow">Agent story</div><h1>' + esc(st.head) + '</h1><p class="lede"><b>' + esc(st.name) + '</b>' + (st.role ? ' · ' + esc(st.role) : '') + '</p>' +
      (st.res.length ? '<div class="facts">' + st.res.map(function(r){ var m = r.match(/^(\S+)\s+(.*)$/); return '<div class="fact"><b>' + esc(m ? m[1] : r) + '</b><span>' + esc(m ? m[2] : '') + '</span></div>'; }).join('') + '</div>' : '') +
      '<div class="storybody">' + st.did.split(/\n{2,}/).map(function(p){ return '<p class="prose">' + esc(p.trim()) + '</p>'; }).join('') + '</div>' +
      (st.quote ? '<blockquote class="bigq"><p>“' + esc(st.quote) + '”</p><footer>' + esc(st.name) + '</footer></blockquote>' : '');
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
    var pre = t.getAttribute('data-enquire-msg'); if(pre != null) $('enqf').elements.m.value = String(pre).slice(0, 800);
    $('enq-fields').style.display = ''; $('enqf').querySelector('.msg').textContent = '';
    enq.classList.add('on'); try{ $('enqf').elements.n.focus(); }catch(e2){}
  });

  /* ---- 🧮 build your shoot: tick what you need and send the list. The choices are read off the services page; no prices. ---- */
  (function(){
    var box = $('builder'); if(!box) return;
    var fail = function(){ box.innerHTML = '<div class="empty">Couldn’t load the services — <a href="services.html">open the full list</a>.</div>'; };
    fetch('services.html').then(function(r){ return r.ok ? r.text() : ''; }).then(function(t){
      var doc = new DOMParser().parseFromString(t || '', 'text/html'), groups = [];
      [].slice.call(doc.querySelectorAll('.pl .cat')).forEach(function(c){
        var h = c.querySelector('h2'); if(!h) return;
        var title = h.textContent.replace(/\s+/g, ' ').trim().slice(0, 40);
        var rows = [].slice.call(c.querySelectorAll('.row')).map(function(row){
          var n = row.querySelector('.nm b'), sub = row.querySelector('.nm .sub');
          var bk = row.querySelector('a.rowbook'), cal = bk ? String(bk.getAttribute('href') || '') : '';
          if(!/^https:\/\/calendly\.com\/hello-reelestatemedia\/[a-z0-9-]+$/.test(cal)) cal = '';
          return n ? {n: n.textContent.trim().slice(0, 60), sub: sub ? sub.textContent.trim().slice(0, 90) : '', cal: cal} : null;
        }).filter(Boolean);
        if(rows.length) groups.push({t: title, rows: rows});
      });
      if(!groups.length){ fail(); return; }
      box.innerHTML = groups.map(function(g){
        return '<fieldset class="bgroup"><legend>' + esc(g.t) + '</legend>' + g.rows.map(function(r){
          return '<label class="bitem"><input type="checkbox" data-n="' + esc(r.n) + '" data-g="' + esc(g.t) + '" data-cal="' + esc(r.cal || '') + '"><span class="bn"><b>' + esc(r.n) + '</b>' + (r.sub ? '<small>' + esc(r.sub) + '</small>' : '') + '</span></label>'; }).join('') + '</fieldset>';
      }).join('');
      var bar = $('bsum'), picked = function(){ return all('#builder input:checked').map(function(i){ return {n: i.getAttribute('data-n'), g: i.getAttribute('data-g'), c: i.getAttribute('data-cal') || ''}; }); };
      var upd = function(){
        var ps = picked();
        $('btot').textContent = String(ps.length); $('bcount').textContent = ps.length ? (ps.length === 1 ? 'item picked' : 'items picked') : 'Nothing picked yet';
        bar.classList.toggle('on', ps.length > 0);
        all('#builder .bitem').forEach(function(l){ l.classList.toggle('on', l.querySelector('input').checked); });
        var hasP = ps.some(function(x){ return x.n === 'Listing Photos'; }), hasV = ps.some(function(x){ return x.n === 'Listing Video'; }), hasB = ps.some(function(x){ return /Photo Package|Film Package/i.test(x.n); });
        $('bhint').hidden = !(hasP && hasV && !hasB);
        var msg = ps.length ? 'I’d like to book:\n' + ps.map(function(x){ return '• ' + x.n; }).join('\n') + '\n\nAddress / preferred date: ' : '';
        $('bsend').setAttribute('data-enquire-msg', msg);
        // 📅 everything picked lives on one Calendly page → Book opens that page; otherwise the full list
        var bb = $('bbook'); if(bb){ var cs = {}; ps.forEach(function(x){ cs[x.c || '*'] = 1; }); var ks = Object.keys(cs); bb.href = (ks.length === 1 && ks[0] !== '*') ? ks[0] : bb.getAttribute('data-all'); }
      };
      box.addEventListener('change', upd); upd();
    }).catch(fail);
  })();
})();
