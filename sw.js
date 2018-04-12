self.addEventListener('install', function(event) {
    var cacheName = 'static-cache';
    event.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.addAll(
                [
                    '/',
                    '/index.html',
                    '/american.html',
                    '/chinese.html',
                    '/filipino.html',
                    '/italian.html',
                    '/korean.html'

                ]
            );
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.open('mysite-dynamic').then(function(cache) {
            return cache.match(event.request).then(function (response) {
                return response || fetch(event.request).then(function(response) {
                        cache.put(event.request, response.clone());
                        return response;
                    });
            });
        })
    );
});