import React, { useState } from "react";
import styles from "./BoardGamesBrowser.module.css";

const API_URL = "/api";
// const API_URL = "http://98.71.35.179/api";

export default function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [response, setResponse] = useState(false);

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
				setResponse(data);
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	}

	function postBoardGame() {
		const jwtToken = response.token;

		// Assuming you have the data you want to send in the request body stored in a variable called `postData`
		const postData = {
			name: "Name",
			description:
				"In Catan (formerly The Settlers of Catan), players try to be the dominant force on the island of Catan by building settlements, cities, and roads. On each turn dice are rolled to determine what resources the island produces. Players collect these resources (cards)&mdash;wood, grain, brick, sheep, or stone&mdash;to build up their civilizations to get to 10 victory points and win the game.&#10;&#10;Setup includes randomly placing large hexagonal tiles (each showing a resource or the desert) in a honeycomb shape and surrounding them with water tiles, some of which contain ports of exchange. Number disks, which will correspond to die rolls (two 6-sided dice are used), are placed on each resource tile. Each player is given two settlements (think: houses) and roads (sticks) which are, in turn, placed on intersections and borders of the resource tiles. Players collect a hand of resource cards based on which hex tiles their last-placed house is adjacent to. A robber pawn is placed on the desert tile.&#10;&#10;A turn consists of possibly playing a development card, rolling the dice, everyone (perhaps) collecting resource cards based on the roll and position of houses (or upgraded cities&mdash;think: hotels) unless a 7 is rolled, turning in resource cards (if possible and desired) for improvements, trading cards at a port, and trading resource cards with other players. If a 7 is rolled, the active player moves the robber to a new hex tile and steals resource cards from other players who have built structures adjacent to that tile.&#10;&#10;Points are accumulated by building settlements and cities, having the longest road and the largest army (from some of the development cards), and gathering certain development cards that simply award victory points. When a player has gathered 10 points (some of which may be held in secret), he announces his total and claims the win.&#10;&#10;Catan has won multiple awards and is one of the most popular games in recent history due to its amazing ability to appeal to experienced gamers as well as those new to the hobby.&#10;&#10;Die Siedler von Catan was originally published by KOSMOS and has gone through multiple editions. It was licensed by Mayfair and has undergone four editions as The Settlers of Catan. In 2015, it was formally renamed Catan to better represent itself as the core and base game of the Catan series. It has been re-published in two travel editions, portable edition and compact edition, as a special gallery edition (replaced in 2009 with a family edition), as an anniversary wooden edition, as a deluxe 3D collector's edition, in the basic Simply Catan, as a beginner version, and with an entirely new theme in Japan and Asia as Settlers of Catan: Rockman Edition. Numerous spin-offs and expansions have also been made for the game.&#10;&#10;",
			rating: 7.26569,
			year: 1995,
			minPlayers: 3,
			maxPlayers: 4,
			playingTime: 120,
			categories: [
				{
					name: "Negotiation",
				},
			],
			designers: [{ name: "Klaus Teuber" }],
		};

		// URL to which you want to make the POST request
		const url = API_URL + "/BoardGames";

		// Options for the fetch request
		const requestOptions = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + jwtToken, // Attaching JWT token to the Authorization header
			},
			body: JSON.stringify(postData),
		};

		// Making the fetch request
		fetch(url, requestOptions)
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				return response.json();
			})
			.then((data) => {
				console.log("Response data:", data);
				// Do something with the response data
			})
			.catch((error) => {
				console.error("There was a problem with your fetch operation:", error);
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
			{response &&
				(response.token ? (
					<div className={styles.response}>
						<h3>Token</h3>
						<p>{response.token}</p>
						<button onClick={postBoardGame}>Klik</button>
					</div>
				) : (
					<div>
						<h3>Unable to login</h3>
						<p>{`${response.title}: ${response.status}`}</p>
					</div>
				))}
		</section>
	);
}
