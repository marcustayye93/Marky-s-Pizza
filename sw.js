const VERSION = 'v1.0.0-pizza';
const CACHE_NAME = `markys-pizza-${VERSION}`;

const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './css/style.css',
  './js/app.js',
  './js/data/lessons.js',
  './js/data/recipes.js',
  './images/sharing-pizza.jpg',
  './images/baking-steel-oven.jpg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request).then((response) => {
        // Optionally cache new requests in future
        return response;
      }).catch(() => {
        // Offline fallback could be added here
        return new Response('Offline — some content may not be available.');
      });
    })
  );
});
