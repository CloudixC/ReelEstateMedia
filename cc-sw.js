/* Command Centre — offline shell (scope: index.html only, so the hub's push worker is untouched).
   · the page itself: network first (updates arrive the moment you're online), cached copy when offline or slow
   · React + fonts: cached after first use
   Everything else (inbox, Calendly, Drive…) is left alone. Bump V to drop old caches. */
const V = 'cc-shell-v1';
const SHELL = [
  'index.html',
  'https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(V).then(c => Promise.all(SHELL.map(u => c.add(new Request(u, {cache: 'reload'})).catch(() => null)))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.indexOf('cc-shell-') === 0 && k !== V).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
async function pageFirst(req){
  const c = await caches.open(V);
  try{
    const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), 4500);
    const res = await fetch(req, {signal: ctl.signal}); clearTimeout(t);
    if(res && res.ok) c.put('index.html', res.clone());
    return res;
  }catch(err){
    const hit = await c.match('index.html');
    if(hit) return hit;
    throw err;
  }
}
async function cacheFirst(req){
  const c = await caches.open(V);
  const hit = await c.match(req);
  if(hit) return hit;
  const res = await fetch(req);
  if(res && (res.ok || res.type === 'opaque')) c.put(req, res.clone());
  return res;
}
self.addEventListener('fetch', e => {
  const req = e.request; if(req.method !== 'GET') return;
  let u; try{ u = new URL(req.url); }catch(err){ return; }
  if(u.origin === self.location.origin){
    if(/\/index\.html$/.test(u.pathname) && !/\/(beta|prev)\//.test(u.pathname)) e.respondWith(pageFirst(req));
    return;
  }
  if(/(^|\.)cdnjs\.cloudflare\.com$|(^|\.)fonts\.googleapis\.com$|(^|\.)fonts\.gstatic\.com$/.test(u.hostname)) e.respondWith(cacheFirst(req));
});
