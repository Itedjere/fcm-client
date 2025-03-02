import { useEffect, useState } from "react";
import { getToken, messaging, onMessage } from "../utilities/firebase";
import { Unsubscribe } from "firebase/messaging";

export default function useFCM() {
	const [permissionDenied, setPermissionDenied] = useState(false);
	const [fcmToken, setFcmToken] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	// Request notification permission and get token
	const requestPermissionAndToken = async () => {
		try {
			// Step 1: Check if Notifications are supported in the browser.
			if (!("Notification" in window)) {
				console.info(
					"This browser does not support desktop notification"
				);
				setPermissionDenied(true);
				return;
			}

			const permission = Notification.permission;
			if (permission === "default") {
				// Request permission only if it hasn't been granted or denied before
				const result = await Notification.requestPermission();
				if (result !== "granted") {
					setPermissionDenied(true);
					return;
				}
			} else if (permission === "denied") {
				setPermissionDenied(true);
				return;
			}

			const fcmMessaging = await messaging();

			if (!fcmMessaging) {
				console.log("Messaging API not set");
				setPermissionDenied(true);
				return;
			}

			// Set is loading to true
			setIsLoading(true);

			// Retrieve the FCM token
			const fcmToken = await getToken(fcmMessaging, {
				vapidKey:
					"BIJj92khKJLeGa6DmlYwK0vssQ8sxIvsGjiV05W8yTaaUIUvWcZUyNQyUKwWTdkAxKfiSu3pg8QYGNiQal25mWw",
			});
			if (fcmToken) {
				console.log("New FCM token:", fcmToken);
				setFcmToken(fcmToken);
				localStorage.setItem("fcm_token", fcmToken);
			} else {
				console.log(
					"No registration token available. Request permission to generate one."
				);
				setPermissionDenied(true);
			}
		} catch (error) {
			console.error("Error during notification setup:", error);
			setPermissionDenied(true);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if ("Notification" in window) {
			requestPermissionAndToken();
		}
	}, []);

	useEffect(() => {
		// Handle foreground notifications
		const setupListener = async () => {
			const fcmMessaging = await messaging();

			if (!fcmMessaging) return;

			const unsubscribe = onMessage(fcmMessaging, (payload) => {
				if (Notification.permission !== "granted") return;
				console.log("Foreground Notification:", payload);
				const { title, body, link } = payload.data || {};
				const url = link || "/";
				if (title && body) {
					const notification = new Notification(title, {
						body,
						icon: "/vite.svg",
					});

					notification.onclick = () => {
						window.open(url, "_blank"); // Open in a new tab
					};
				}
			});

			return unsubscribe;
		};

		let unsubscribe: Unsubscribe | null = null;

		setupListener().then((unsub) => {
			if (unsub) {
				unsubscribe = unsub;
			}
		});

		// Cleanup the listener when the component unmounts.
		return () => unsubscribe?.();
	}, []);

	return { fcmToken, isLoading, permissionDenied, requestPermissionAndToken };
}
