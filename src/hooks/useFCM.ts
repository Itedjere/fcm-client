import { useEffect, useState } from "react";
import { getToken, messaging } from "../utilities/firebase";

export default function useFCM() {
	const [permissionDenied, setPermissionDenied] = useState(false);
	const [fcmToken, setFcmToken] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	// Request notification permission and get token
	const requestPermissionAndToken = async () => {
		try {
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

			// Set is loading to true
			setIsLoading(true);

			// Retrieve the FCM token
			const fcmToken = await getToken(messaging, {
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
		requestPermissionAndToken();
	}, []);

	return { fcmToken, isLoading, permissionDenied, requestPermissionAndToken };
}
