const CACHE_ELEMENTS = [
  "./",
  "https://unpkg.com/react@17/umd/react.production.min.js",
  "https://unpkg.com/react-dom@17/umd/react-dom.production.min.js",
  "https://unpkg.com/@babel/standalone/babel.min.js",
  "./style.css",
  "./components/Contador.js",
];

const CACHE_NAME = "v2_cache_contador_react";

// //instala la cache del sw
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      cache
        .addAll(CACHE_ELEMENTS)
        .then(() => {
          self.skipWaiting();
        })
        .catch(console.log);
    })
  );
});

// // borra el cache antiguo
self.addEventListener("activate", (e) => {
  const cacheWithelist = [CACHE_NAME];
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map(
          (cacheName) =>
            cacheWithelist.indexOf(cacheName) === -1 && caches.delete(cacheName)
        )
      );
    })
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      return res ? res : fetch(e.request);
    })
  );
});
