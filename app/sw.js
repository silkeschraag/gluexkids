/* GlüXkids Eltern-App — Service Worker (offline nutzbar)
   Bei inhaltlichen Änderungen VERSION hochzählen, damit alle Geräte neu laden. */
const VERSION = 'gluexkids-v4';
const CORE = [
  './', 'index.html', 'styles.css', 'app.js', 'content.js', 'manifest.webmanifest',
  'img/logo.png', 'img/fox.png', 'img/silke.webp', 'img/mutig.webp',
  'img/erzaehl-doch-mal.webp', 'img/finger-affirmationen.webp',
  'icons/icon-192.png', 'icons/favicon.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
    .then(() => self.clients.claim()));
});

/* Inhalte (HTML/JS) zuerst aus dem Netz – damit neue Impulse sofort da sind –,
   offline aus dem Cache. Bilder & Schriften zuerst aus dem Cache. */
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const isAsset = /\.(png|webp|jpg|jpeg|svg|woff2?)$/.test(url.pathname) || url.host.includes('fonts.g');
  if (isAsset) {
    e.respondWith(caches.match(req).then((hit) => hit || fetch(req).then((res) => {
      const copy = res.clone(); caches.open(VERSION).then((c) => c.put(req, copy)); return res;
    })));
  } else if (url.origin === location.origin) {
    e.respondWith(fetch(req).then((res) => {
      const copy = res.clone(); caches.open(VERSION).then((c) => c.put(req, copy)); return res;
    }).catch(() => caches.match(req).then((hit) => hit || caches.match('index.html'))));
  }
});
