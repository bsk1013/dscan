/* DSCAN PWA Service Worker v4.6.19 — app-shell only; no DSCAN runtime/session persistence */
const VERSION = 'dscan-pwa-v4.6.19';
const SHELL_CACHE = `${VERSION}-shell`;
const RUNTIME_CACHE = `${VERSION}-runtime`;
const APP_SHELL = [
  './',
  './index.html',
  './dscan.webmanifest',
  './icons/favicon.svg',
  './icons/favicon-16x16.png',
  './icons/favicon-32x32.png',
  './icons/favicon-48x48.png',
  './icons/favicon.ico',
  './icons/apple-touch-icon.png',
  './icons/apple-touch-icon-152x152.png',
  './icons/apple-touch-icon-167x167.png',
  './icons/apple-touch-icon-180x180.png',
  './icons/android-chrome-192x192.png',
  './icons/android-chrome-512x512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(SHELL_CACHE)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key.startsWith('dscan-pwa-') && key !== SHELL_CACHE && key !== RUNTIME_CACHE)
          .map(key => caches.delete(key))
    )).then(() => self.clients.claim())
  );
});

function isCacheableCdn(url){
  return url.hostname === 'cdn.jsdelivr.net' ||
         url.hostname === 'cdn.sheetjs.com' ||
         url.hostname === 'cdnjs.cloudflare.com';
}

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req).then(res => {
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(SHELL_CACHE).then(cache => cache.put('./index.html', copy));
        }
        return res;
      }).catch(() => caches.match('./index.html').then(r => r || caches.match('./')))
    );
    return;
  }

  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(req).then(cached => cached || fetch(req).then(res => {
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(RUNTIME_CACHE).then(cache => cache.put(req, copy));
        }
        return res;
      }))
    );
    return;
  }

  if (isCacheableCdn(url)) {
    event.respondWith(
      caches.match(req).then(cached => {
        const network = fetch(req).then(res => {
          if (res && (res.ok || res.type === 'opaque')) {
            const copy = res.clone();
            caches.open(RUNTIME_CACHE).then(cache => cache.put(req, copy));
          }
          return res;
        });
        return cached || network;
      })
    );
  }
});

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});
