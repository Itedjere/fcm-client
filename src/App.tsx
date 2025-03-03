import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import useFCM from "./hooks/useFCM";

function App() {
	const { fcmToken, isLoading, permissionDenied, requestPermissionAndToken } =
		useFCM();
	return (
		<>
			<div>
				<a href="https://vite.dev" target="_blank">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
				<a href="https://react.dev" target="_blank">
					<img
						src={reactLogo}
						className="logo react"
						alt="React logo"
					/>
				</a>
			</div>
			<h1>Vite + React</h1>
			<div className="card">
				{permissionDenied && (
					<button onClick={requestPermissionAndToken}>
						Request Permission
					</button>
				)}
				<h3>Token</h3>
				<p>{isLoading ? "Fetching token..." : fcmToken}</p>
			</div>
			<p className="read-the-docs">
				Click on the Vite and React logos to learn more
			</p>
		</>
	);
}

export default App;
