// 최소 서비스워커: 설치 가능 조건용. 네트워크 우선, 실패 시 캐시 (앱 껍데기만).
const CACHE = 'bitoffice-v37';
self.addEventListener('install', e => { self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))); self.clients.claim(); });
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin) return;
  e.respondWith(fetch(e.request, {cache: 'no-cache'}).then(r => { if (r.ok && (u.pathname.endsWith('/') || u.pathname.endsWith('.html') || u.pathname.endsWith('.png') || u.pathname.endsWith('.webmanifest'))) { const c = r.clone(); caches.open(CACHE).then(x => x.put(e.request, c)); } return r; }).catch(() => caches.match(e.request)));
});
