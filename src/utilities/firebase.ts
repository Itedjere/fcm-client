import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
	apiKey: "AIzaSyDpcyL7SVfMzYtGd-rBUpU8x8bIIeLSr6M",
	authDomain: "testing-fcm-a6a49.firebaseapp.com",
	projectId: "testing-fcm-a6a49",
	storageBucket: "testing-fcm-a6a49.firebasestorage.app",
	messagingSenderId: "1006271281027",
	appId: "1:1006271281027:web:414d9d70e276b1bedea8b6",
	measurementId: "G-K8BGGETGPW",
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { messaging, getToken, onMessage };
