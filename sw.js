var filesToCache = [
  "index.html",
  "halftime.mp3", 
  "class.wav"
];

var cacheName = "LESSONSLIST";

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(cacheName)
      .then(function(cache) {
        return cache.addAll(filesToCache);
      })
  );
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request)
          .then(function(response) {
            return caches.open(cacheName)
              .then(function(cache) {
                cache.put(event.request, response.clone());
                return response;
              });
          });
      })
  );
});
