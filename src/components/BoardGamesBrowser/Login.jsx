import React, { useState } from "react";
import styles from "./BoardGamesBrowser.module.css";
import { useNavigate } from "react-router-dom";
import { useBG_APIContext } from "../../routes/BoardGamesView";

export default function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const API_URL = useBG_APIContext();

	const navigate = useNavigate();

	function handleSubmit(event) {
		event.preventDefault();

		const url = API_URL + "/account/login";

		const obj = {
			userName: username,
			password,
		};
		const body = JSON.stringify(obj);

		fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: body,
		})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				sessionStorage.setItem("JWT", data.token);
				navigate("/board-games/user");
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	}
	return (
		<section className={styles.loginWrapper}>
			<form onSubmit={handleSubmit} className={styles.loginForm}>
				<div>
					<label>Username (admin)</label>
					<input
						id="username"
						onChange={(event) => setUsername(event.target.value)}
						value={username}
						type="text"
						placeholder="Username"
						required
					/>
				</div>
				<div>
					<label>Password (Adm!n123)</label>
					<input
						id="password"
						onChange={(event) => setPassword(event.target.value)}
						value={password}
						type="password"
						placeholder="Password"
						required
					/>
				</div>

				<button>Login</button>
			</form>
			{/* {response &&
				(response.token ? (
					<div className={styles.response}>
						<h3>Token</h3>
						<p>{response.token}</p>
					</div>
				) : (
					<div>
						<h3>Unable to login</h3>
						<p>{`${response.title}: ${response.status}`}</p>
					</div>
				))} */}
		</section>
	);
}
