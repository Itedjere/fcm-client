importScripts(
	"https://www.gstatic.com/firebasejs/11.4.0/firebase-app-compat.js"
);
importScripts(
	"https://www.gstatic.com/firebasejs/11.4.0/firebase-messaging-compat.js"
);

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
	apiKey: "AIzaSyDpcyL7SVfMzYtGd-rBUpU8x8bIIeLSr6M",
	authDomain: "testing-fcm-a6a49.firebaseapp.com",
	projectId: "testing-fcm-a6a49",
	storageBucket: "testing-fcm-a6a49.firebasestorage.app",
	messagingSenderId: "1006271281027",
	appId: "1:1006271281027:web:414d9d70e276b1bedea8b6",
	measurementId: "G-K8BGGETGPW",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
	console.log(
		"[firebase-messaging-sw.js] Received background message ",
		payload
	);
	// Customize notification here
	const notificationTitle = payload.notification.title;
	const notificationOptions = {
		body: payload.notification.body,
		icon: "/vite.svg",
		data: { url: payload.data?.url || "/" }, // Default to home page if no URL
	};

	self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close(); // Close the notification pop-up

  const targetUrl = event.notification.data.url || '/';
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // Focus if the app is open in a tab
      for (const client of clientList) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          return client.navigate(targetUrl).then(() => client.focus());
        }
      }
      // Open a new tab if no existing tab is found
      return clients.openWindow(targetUrl);
    })
  );
});