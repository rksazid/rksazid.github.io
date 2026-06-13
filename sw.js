/* Service worker — MD. Rezaul Karim portfolio
   Strategy: network-first for navigations (always fresh HTML),
   cache-first for static assets. Bump CACHE_NAME on each release. */
const CACHE_NAME = "rezaul-karim-portfolio-v2";
const PRECACHE = [
  "/",
  "/index.html",
  "/assets/css/styles.css",
  "/assets/js/main.js",
  "/assets/imgs/avatar.png",
  "/manifest.json",
];

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE)).catch(() => {})
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  // Network-first for page navigations so content is never stale.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((c) => c.put(request, copy));
          return res;
        })
        .catch(() => caches.match(request).then((r) => r || caches.match("/index.html")))
    );
    return;
  }

  // Cache-first for same-origin static assets.
  if (new URL(request.url).origin === self.location.origin) {
    event.respondWith(
      caches.match(request).then(
        (cached) =>
          cached ||
          fetch(request).then((res) => {
            if (res && res.status === 200 && res.type === "basic") {
              const copy = res.clone();
              caches.open(CACHE_NAME).then((c) => c.put(request, copy));
            }
            return res;
          })
      )
    );
  }
});

// Push notifications (kept for future use)
self.addEventListener("push", (event) => {
  const options = {
    body: event.data ? event.data.text() : "New update from MD. Rezaul Karim",
    icon: "/assets/imgs/avatar.png",
    badge: "/assets/imgs/avatar.png",
  };
  event.waitUntil(self.registration.showNotification("MD. Rezaul Karim", options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow("https://rksazid.onrender.com/"));
});
