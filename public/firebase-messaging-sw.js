import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging/sw";
import { onBackgroundMessage } from "firebase/messaging/sw";

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
const firebaseApp = initializeApp({
	apiKey: "AIzaSyDpcyL7SVfMzYtGd-rBUpU8x8bIIeLSr6M",
	authDomain: "testing-fcm-a6a49.firebaseapp.com",
	databaseURL: "https://testing-fcm-a6a49.firebaseio.com",
	projectId: "testing-fcm-a6a49",
	storageBucket: "testing-fcm-a6a49.firebasestorage.app",
	messagingSenderId: "1006271281027",
	appId: "1:1006271281027:web:414d9d70e276b1bedea8b6",
	measurementId: "G-K8BGGETGPW",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = getMessaging(firebaseApp);

onBackgroundMessage(messaging, (payload) => {
	console.log(
		"[firebase-messaging-sw.js] Received background message ",
		payload
	);
	// Customize notification here
	const notificationTitle = "New Sale";
	const notificationOptions = {
		body: "A New Sale Has Been Added To Your Account.",
		icon: "https://logospng.org/download/vite-js/vite-js-256-logo.png",
	};

	self.registration.showNotification(notificationTitle, notificationOptions);
});
