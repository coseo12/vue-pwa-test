let version = 'V2';

self.addEventListener('message', function (event) {
	console.log('data type : ', event.data.type);
	if (event.data && event.data.type === 'SKIP_WAITING') {
		self.skipWaiting();
	}
});

self.addEventListener('push', function (event) {
	console.log('[Service Worker] Push Received.');

	let title = 'Push Codelab';
	let options = {
		body: 'Yay it works.',
		icon: 'img/icon.png',
		badge: 'img/badge.png',
	};

	let notificationPromise = self.registration.showNotification(title, options);
	event.waitUntil(notificationPromise);
});

self.addEventListener('notificationclick', function (event) {
	console.log('[Service Worker] Notification click Received.');

	event.notification.close();
	event.waitUntil(
		// eslint-disable-next-line no-undef
		clients.openWindow('http://www.fastcampus.co.kr/dev_camp_wap/'),
	);
});


// eslint-disable-next-line no-undef
if (workbox) {
	console.log(`${version} Yay! Workbox is loaded 🎉`);
	// self.skipWaiting();

	/**
	 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
	 * requests for URLs in the manifest.
	 * See https://goo.gl/S9QRab
	 */

	// eslint-disable-next-line no-undef
	workbox.routing.registerRoute(
		/\.js$/,
		// eslint-disable-next-line no-undef
		new workbox.strategies.NetworkFirst()
	);

	// eslint-disable-next-line no-undef
	workbox.routing.registerRoute(
		// Cache CSS files.
		/\.css$/,
		// Use cache but update in the background.
		// eslint-disable-next-line no-undef
		new workbox.strategies.StaleWhileRevalidate({
			// Use a custom cache name.
			cacheName: 'css-cache',
		})
	);

	// eslint-disable-next-line no-undef
	workbox.routing.registerRoute(
		// Cache image files.
		/\.(?:png|jpg|jpeg|svg|gif)$/,
		// Use the cache if it's available.
		// eslint-disable-next-line no-undef
		new workbox.strategies.CacheFirst({
			// Use a custom cache name.
			cacheName: 'image-cache',
			plugins: [
				// eslint-disable-next-line no-undef
				new workbox.expiration.Plugin({
					// Cache only 20 images.
					maxEntries: 20,
					// Cache for a maximum of a week.
					maxAgeSeconds: 7 * 24 * 60 * 60,
				})
			],
		})
	);

	// eslint-disable-next-line no-undef
	workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
	addEventListener('message', event => {
		const replyPort = event.ports[0]
		const message = event.data
		if (replyPort && message && message.type === 'skip-waiting') {
			event.waitUntil(
				self.skipWaiting().then(
					() => replyPort.postMessage({ error: null }),
					error => replyPort.postMessage({ error })
				)
			)
		}
	})

} else {
	console.log(`Boo! Workbox didn't load 😬`);
}


