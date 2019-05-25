const staticCacheName = 'resturantCacheV4';
console.log(staticCacheName);
self.addEventListener('install', (event) => {
  console.log(event);
  event.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      return cache.addAll([
        './',
        'index.html',
        'restaurant.html',
        'js/dbhelper.js',
        'js/main.js',
        'js/restaurant_info.js',
        'data/restaurants.json',
        'css/styles.css',

      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open(staticCacheName).then(function(cache) {
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request).then(function(response) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});
 /*self.addEventListener('fetch', (event) => {
   const evt = event.request;
   console.log(evt.url);
   event.respondWith(
     caches.match(evt).then((request) => {
       console.log(request);
       return request || fetch(request.url).then((response) => {
         caches.open(staticCacheName).then((cache) => {
           cache.add(response);
         })
       })
     })
   );
 });*/

 self.addEventListener('activate', function(event) {
   event.waitUntil(
     caches.keys().then(function(cacheNames) {
       return Promise.all(
         cacheNames.filter(function(cacheName) {
           return cacheName != staticCacheName
         }).map(function(cacheName) {
           return caches.delete(cacheName);
         })
       );
     })
   );
 });