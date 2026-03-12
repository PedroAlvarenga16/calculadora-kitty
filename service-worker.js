const CACHE = 'kitty-calc-v2';
const FILES = [
  '/calculadora-kitty/',
  '/calculadora-kitty/index.html',
  '/calculadora-kitty/manifest.json',
  '/calculadora-kitty/icon-192.png',
  '/calculadora-kitty/icon-512.png',
  'https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Nunito:wght@400;600;700;800;900&display=swap'
];

// Instala e cacheia todos os arquivos
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(FILES).catch(() => {}))
  );
  self.skipWaiting();
});

// Limpa caches antigos
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Serve do cache, cai na rede se não tiver
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
