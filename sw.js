const CACHE_NAME = 'rezaul-karim-portfolio-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/assets/css/johndoe.css',
  '/assets/css/modern-styles.css',
  '/assets/js/johndoe.js',
  '/assets/vendors/themify-icons/css/themify-icons.css',
  '/assets/vendors/bootstrap/bootstrap.bundle.js',
  '/assets/vendors/jquery/jquery-3.4.1.min.js',
  '/assets/vendors/isotope/isotope.pkgd.js',
  '/assets/imgs/avatar.png',
  '/assets/imgs/header.png',
  '/manifest.json'
];

// Install Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.log('Cache failed:', error);
      })
  );
});

// Fetch resources
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        return fetch(event.request).then(
          (response) => {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      }
    )
  );
});

// Activate Service Worker
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Background Sync for offline form submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    console.log('Background sync triggered');
    // Handle offline form submissions here
  }
});

// Push notifications
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'New update from Rezaul Karim',
    icon: '/assets/imgs/avatar.png',
    badge: '/assets/imgs/avatar.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: '2'
    },
    actions: [
      {
        action: 'explore', title: 'View Portfolio',
        icon: '/assets/imgs/avatar.png'
      },
      {
        action: 'close', title: 'Close',
        icon: '/assets/imgs/avatar.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('MD. Rezaul Karim', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  console.log('Notification click received');

  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('https://rksazid.onrender.com/')
    );
  }
});
