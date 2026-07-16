/* Marco's Pizza Club — service worker */
const VERSION = "mpc-v6";
const CORE = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./css/tokens.css",
  "./css/app.css",
  "./js/app.js",
  "./js/data/lessons.js",
  "./js/data/recipes.js",
  "./js/data/builder.js",
  "./js/data/doughs.js",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/favicon-48.png"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(VERSION).then(c => c.addAll(CORE)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const { request } = e;
  if (request.method !== "GET") return;
  const url = new URL(request.url);

  // Network-first for navigations (fresh HTML), cache fallback for offline
  if (request.mode === "navigate") {
    e.respondWith(
      fetch(request)
        .then(res => {
          const copy = res.clone();
          caches.open(VERSION).then(c => c.put("./index.html", copy));
          return res;
        })
        .catch(() => caches.match("./index.html"))
    );
    return;
  }

  // Cache-first for same-origin static assets and images
  if (url.origin === location.origin) {
    e.respondWith(
      caches.match(request).then(hit => {
        if (hit) return hit;
        return fetch(request).then(res => {
          if (res.ok) {
            const copy = res.clone();
            caches.open(VERSION).then(c => c.put(request, copy));
          }
          return res;
        });
      })
    );
    return;
  }

  // Fonts etc: stale-while-revalidate
  e.respondWith(
    caches.match(request).then(hit => {
      const net = fetch(request).then(res => {
        if (res.ok) {
          const copy = res.clone();
          caches.open(VERSION).then(c => c.put(request, copy));
        }
        return res;
      }).catch(() => hit);
      return hit || net;
    })
  );
});
