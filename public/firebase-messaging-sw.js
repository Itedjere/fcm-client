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

messaging.onMessage(function (payload) {
	console.log(
		"[firebase-messaging-sw.js] Received background message ",
		payload
	);
	// Customize notification here
	const notificationTitle = "Foreground Title";
	const notificationOptions = {
		body: "Foreground Message body.",
		icon: "https://logospng.org/download/vite-js/vite-js-256-logo.png",
	};

	self.registration.showNotification(notificationTitle, notificationOptions);
});

messaging.onBackgroundMessage(function (payload) {
	console.log(
		"[firebase-messaging-sw.js] Received background message ",
		payload
	);
	// Customize notification here
	const notificationTitle = "Background Title";
	const notificationOptions = {
		body: "Background Message body.",
		icon: "https://logospng.org/download/vite-js/vite-js-256-logo.png",
	};

	self.registration.showNotification(notificationTitle, notificationOptions);
});
