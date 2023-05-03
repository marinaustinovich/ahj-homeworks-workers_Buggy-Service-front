const version = 'v1';
const cacheName = `ahj-${version}`;

const files = [
  { url: 'index.html', revision: '1.0.0' },
  { url: '/main.js', revision: '1.0.0' },
  // { url: 'favicon.ico', revision: '1.0.0' },
];

async function putFilesToCache(file) {
  const cache = await caches.open(cacheName);
  console.log(file);
  await cache.addAll(file);
}

async function removeOldCache(retain) {
  const keys = await caches.keys();
  return Promise.all(
    keys.filter((key) => !retain.includes(key))
      .map((key) => caches.delete(key)),
  );
}

self.addEventListener('install', (evt) => {
  console.log(evt);
  evt.waitUntil((async () => {
    await putFilesToCache(files);
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (evt) => {
  console.log(evt);
  evt.waitUntil((async () => {
    await removeOldCache([cacheName]);
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (evt) => {
  const requestUrl = new URL(evt.request.url);
  if (requestUrl.pathname.startsWith('/news')) {
    return;
  }

  evt.respondWith((async () => {
    const cache = await caches.open(cacheName);
    try {
      const response = await fetch(evt.request);
      if (response.ok) evt.waitUntil(cache.put(evt.request, response.clone()));
      return response;
    } catch (e) {
      const cachedResponse = await cache.match(evt.request);
      if (cachedResponse) return cachedResponse;
      throw new Error(e.message);
    }
  })());
});