// Carveyance: lets carveyance.com install to a home screen and open pages you've read when offline.
// Network first, so every visit gets the latest version; a cached copy is only a fallback.
// FitDrive (/fitdrive/) has its own, and forms and /.netlify/ requests are never touched.
const C = "carveyance-v1";
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(C).then((c) => c.addAll(["/", "/assets/icons/carveyance-192.png"])).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k.startsWith("carveyance-") && k !== C).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", (e) => {
  const u = new URL(e.request.url);
  if (e.request.method !== "GET" || u.origin !== location.origin) return;
  if (u.pathname.startsWith("/fitdrive/") || u.pathname.startsWith("/.netlify/")) return;
  if (e.request.mode !== "navigate") return; // pages only; images and scripts go straight to the network
  e.respondWith(
    fetch(e.request)
      .then((r) => { if (r.ok) { const cp = r.clone(); caches.open(C).then((c) => c.put(e.request, cp)); } return r; })
      .catch(() => caches.match(e.request).then((m) => m || caches.match("/")))
  );
});
