import Widget from './Widget';

/* eslint-disable */
console.log('it works!');

if (navigator.serviceWorker) {
  window.addEventListener('load', async () => {
    try {
      const registration  = await navigator.serviceWorker.register(
        './serviceworker.js',
        { scope: './' },
      );
      if (registration) {
        console.log('Service Worker зарегистрирован:', registration);
        const netlifyUrl = 'https://buggy-service-back.netlify.app/news/';
        const localUrl = 'http://localhost:7000/news'; //for local server
        const widget = new Widget(document.getElementById('buggy-container'), netlifyUrl);
        widget.start();
      }
      
      window.addEventListener('offline', async () => {
        // Проверяем состояние связи
        if (!navigator.onLine) {
          await registration.unregister();
          console.log('Регистрация Service Worker отменена');
        }
         const cacheName = 'workbox-precache-v2-http://localhost:8081'; // Имя кэша должно совпадать с именем в Service Worker
        console.log(cacheName);
        if ('caches' in window) {
          const result = await caches.match(cacheName);
          console.log(result);
        }
      });
    } catch (e) {
      console.log('Ошибка регистрации Service Worker:', e);
    }
  });
}

