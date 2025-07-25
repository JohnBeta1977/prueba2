const CACHE_NAME = 'comprasfaciles-cache-v3'; // Incrementado la versión para forzar la actualización del caché
const urlsToCache = [
    '/',
    '/index.html',
    '/css/style.css',
    '/js/script.js',
    'http://raw.githubusercontent.com/JohnBeta1977/transformoney/refs/heads/main/logo.png',
    '/images/product1.jpg',
    '/images/product2.jpg',
    '/images/product3.jpg',
    '/images/product4.jpg',
    '/images/product5.jpg',
    '/images/product6.jpg',
    '/images/hero-bg.jpg' // Asegurando que la imagen de fondo también esté en caché
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Service Worker: Cache abierto');
                return cache.addAll(urlsToCache);
            })
            .then(() => self.skipWaiting()) // Forzar la activación del nuevo service worker
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Si está en caché, devolver la versión cacheada
                if (response) {
                    return response;
                }
                // Si no está en caché, buscar en la red
                return fetch(event.request).then(
                    response => {
                        // Si la respuesta no es válida, la red está offline o error HTTP
                        if(!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // Clonar la respuesta porque la original es un stream y solo se puede consumir una vez
                        const responseToCache = response.clone();

                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    }
                ).catch(error => {
                    // Esto maneja errores de red si el asset no está en caché
                    console.error('Fetch failed; returning offline page or specific fallback', error);
                    // Aquí podrías servir una página offline si tienes una, o un asset de fallback
                    // if (event.request.mode === 'navigate') {
                    //     return caches.match('/offline.html');
                    // }
                    return new Response('Network error or item not in cache.', { status: 503, statusText: 'Service Unavailable' });
                });
            })
    );
});

self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim()) // Tomar control de las páginas existentes
    );
});