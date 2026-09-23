// ==============================================================================
// NoxWire Service Worker — Offline Resilience & Asset Caching
// ==============================================================================

const CACHE_NAME = "noxwire-cache-v1.1";
const STATIC_ASSETS = [
  "/",
  "/manifest.webmanifest",
  "/favicon.ico",
  "/art/dating_comparison_guide.jpg",
  "/art/casino_betting_hero.jpg",
  "/art/adult_lifestyle_hero.jpg",
  "/art/crypto_privacy_hero.jpg",
];

// Install: Cache critical static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate: Clean up old cache versions
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch: Network first with offline cache fallback
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);

  // Avoid caching admin or API routes
  if (url.pathname.startsWith("/admin") || url.pathname.startsWith("/api")) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Cache successful static and image responses
        if (
          response.status === 200 &&
          (url.pathname.startsWith("/art/") ||
            url.pathname.startsWith("/avatars/") ||
            url.pathname.endsWith(".webp") ||
            url.pathname.endsWith(".jpg") ||
            url.pathname.endsWith(".png"))
        ) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) return cachedResponse;
          if (event.request.mode === "navigate") {
            return caches.match("/");
          }
          return new Response("Network unavailable", {
            status: 503,
            statusText: "Service Unavailable",
          });
        });
      })
  );
});
