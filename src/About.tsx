import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function About() {
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
			<h1>About Us Page</h1>
			<div className="card">
					<a href="/" className="custom-link">
						Back To Home
					</a>
			</div>
			<p className="read-the-docs">
				Click on the Vite and React logos to learn more
			</p>
		</>
	);
}

export default About;
