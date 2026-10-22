/* Carveyance Events — service worker for the home-screen app.
   Network first, always: with a connection you get the live page and the
   live events.js. The saved copy is only used when there's no connection. */
var CACHE = "cv-events-v1";
var CORE = ["/events/", "/events.js", "/events/events-common.js"];

self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(CORE); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
self.addEventListener("fetch", function (e) {
  var req = e.request, url = new URL(req.url);
  if (req.method !== "GET" || url.origin !== self.location.origin) return;     // fonts, maps, Instagram: browser handles
  var mine = url.pathname.indexOf("/events/") === 0 || url.pathname === "/events.js";
  if (!mine) return;
  e.respondWith(fetch(req).then(function (res) {
    if (res && res.ok) { var copy = res.clone(); caches.open(CACHE).then(function (c) { c.put(req, copy); }); }
    return res;
  }).catch(function () {
    return caches.match(req).then(function (hit) { return hit || caches.match("/events/"); });
  }));
});
