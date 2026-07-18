/* Marco's Pizza Club — service worker
 *
 * Release process: bumping VERSION forces a clean cache; but code/data updates
 * no longer depend on it — JS/CSS/HTML use stale-while-revalidate, so returning
 * visitors get new content on their next visit automatically. Media (images,
 * video, fonts) stay cache-first for speed and offline use.
 * On each release, also bump the ?b= query on css/js links in index.html so
 * the browser HTTP cache (independent of this SW) fetches fresh code too.
 */
const VERSION = "mpc-v17";
const CORE = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./css/tokens.css",
  "./css/app.css",
  "./js/app.js",
  "./js/share.js",
  "./js/data/lessons.js",
  "./js/data/recipes.js",
  "./js/data/pasta-lessons.js",
  "./js/data/pasta-recipes.js",
  "./js/data/builder.js",
  "./js/data/doughs.js",
  "./icons/icon-192.png",
  "./icons/icon-384.png",
  "./icons/icon-512.png",
  "./icons/favicon-48.png",
  "./images/chooser-pizza.jpg",
  "./images/chooser-pasta.jpg",
  "./images/mascot-hero.jpg",
  "./images/hero-margherita.jpg",
  "./images/pasta/pasta-hero.jpg"
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

function putCache(request, res) {
  const copy = res.clone();
  caches.open(VERSION).then(c => c.put(request, copy));
}

self.addEventListener("fetch", e => {
  const { request } = e;
  if (request.method !== "GET") return;
  const url = new URL(request.url);

  // Network-first for navigations (fresh HTML), cache fallback for offline
  if (request.mode === "navigate") {
    e.respondWith(
      fetch(request)
        .then(res => { putCache("./index.html", res); return res; })
        .catch(() => caches.match("./index.html"))
    );
    return;
  }

  const isCode = url.origin === location.origin &&
    /\.(js|css|webmanifest|html)$/.test(url.pathname);

  // Stale-while-revalidate for code & data: instant paint, fresh next visit
  if (isCode) {
    e.respondWith(
      caches.match(request).then(hit => {
        const net = fetch(request).then(res => {
          if (res.ok) putCache(request, res);
          return res;
        }).catch(() => hit);
        return hit || net;
      })
    );
    return;
  }

  // Cache-first for same-origin media (images, video)
  if (url.origin === location.origin) {
    e.respondWith(
      caches.match(request).then(hit => {
        if (hit) return hit;
        return fetch(request).then(res => {
          if (res.ok) putCache(request, res);
          return res;
        });
      })
    );
    return;
  }

  // Cross-origin (fonts etc): stale-while-revalidate
  e.respondWith(
    caches.match(request).then(hit => {
      const net = fetch(request).then(res => {
        if (res.ok) putCache(request, res);
        return res;
      }).catch(() => hit);
      return hit || net;
    })
  );
});
