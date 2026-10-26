// TriAce service worker.
// Strategy:
//  - Pages (HTML navigations): network first, fall back to cache so the site still opens offline.
//  - Same-origin static assets (CSS, JS, images, manifest): stale-while-revalidate.
//  - Cross-origin requests (Firebase, Google fonts/SDKs) are never intercepted, so live scores always go to the network.
// Bump CACHE_VERSION whenever the shell changes to force clients onto the new files.

const CACHE_VERSION = 'triace-v2026.2';
const CACHE_NAME = CACHE_VERSION;

const PRECACHE_URLS = [
  './',
  './index.html',
  './rules.html',
  './seasons.html',
  './register.html',
  './register-success.html',
  './schedule.html',
  './schedule-b.html',
  './playoff-super-six.html',
  './standings.html',
  './history.html',
  './teams.html',
  './styles.css',
  './script.js',
  './pwa.js',
  './manifest.webmanifest',
  './triace-logo.png',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  // Never touch Firebase or any other third-party traffic.
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(request));
    return;
  }

  event.respondWith(staleWhileRevalidate(request));
});

function networkFirst(request) {
  return fetch(request)
    .then((response) => {
      const copy = response.clone();
      caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
      return response;
    })
    .catch(() => caches.match(request).then((cached) => cached || caches.match('./index.html')));
}

function staleWhileRevalidate(request) {
  return caches.open(CACHE_NAME).then((cache) =>
    cache.match(request).then((cached) => {
      const network = fetch(request)
        .then((response) => {
          if (response.ok) cache.put(request, response.clone());
          return response;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
}
