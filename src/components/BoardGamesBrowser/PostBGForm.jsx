import React, { useEffect, useState } from "react";
import styles from "./PostBGForm.module.css";
import { useBG_APIContext } from "../../routes/BoardGamesView";

export default function PostBGForm() {
	const [enteredValues, setEnteredValues] = useState({
		name: "Catan",
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
	});
	const [statusCode, setStatusCode] = useState(0);
	const [fetchSucess, setFetchSucess] = useState(false);

	const { API_URL, setRefresh } = useBG_APIContext();

	const JWT = sessionStorage.getItem("JWT");

	useEffect(() => {
		if (statusCode !== 201) return;
		setStatusCode(0);
		setFetchSucess(true);
		setEnteredValues({
			name: "",
			description: "",
			rating: 0,
			year: 0,
			minPlayers: 0,
			maxPlayers: 0,
			playingTime: 0,
			categories: [
				{
					name: "",
				},
			],
			designers: [{ name: "" }],
		});
	}, [statusCode]);

	// const postData = {
	// 	name: "Catan",
	// 	description:
	// 		"In Catan (formerly The Settlers of Catan), players try to be the dominant force on the island of Catan by building settlements, cities, and roads. On each turn dice are rolled to determine what resources the island produces. Players collect these resources (cards)&mdash;wood, grain, brick, sheep, or stone&mdash;to build up their civilizations to get to 10 victory points and win the game.&#10;&#10;Setup includes randomly placing large hexagonal tiles (each showing a resource or the desert) in a honeycomb shape and surrounding them with water tiles, some of which contain ports of exchange. Number disks, which will correspond to die rolls (two 6-sided dice are used), are placed on each resource tile. Each player is given two settlements (think: houses) and roads (sticks) which are, in turn, placed on intersections and borders of the resource tiles. Players collect a hand of resource cards based on which hex tiles their last-placed house is adjacent to. A robber pawn is placed on the desert tile.&#10;&#10;A turn consists of possibly playing a development card, rolling the dice, everyone (perhaps) collecting resource cards based on the roll and position of houses (or upgraded cities&mdash;think: hotels) unless a 7 is rolled, turning in resource cards (if possible and desired) for improvements, trading cards at a port, and trading resource cards with other players. If a 7 is rolled, the active player moves the robber to a new hex tile and steals resource cards from other players who have built structures adjacent to that tile.&#10;&#10;Points are accumulated by building settlements and cities, having the longest road and the largest army (from some of the development cards), and gathering certain development cards that simply award victory points. When a player has gathered 10 points (some of which may be held in secret), he announces his total and claims the win.&#10;&#10;Catan has won multiple awards and is one of the most popular games in recent history due to its amazing ability to appeal to experienced gamers as well as those new to the hobby.&#10;&#10;Die Siedler von Catan was originally published by KOSMOS and has gone through multiple editions. It was licensed by Mayfair and has undergone four editions as The Settlers of Catan. In 2015, it was formally renamed Catan to better represent itself as the core and base game of the Catan series. It has been re-published in two travel editions, portable edition and compact edition, as a special gallery edition (replaced in 2009 with a family edition), as an anniversary wooden edition, as a deluxe 3D collector's edition, in the basic Simply Catan, as a beginner version, and with an entirely new theme in Japan and Asia as Settlers of Catan: Rockman Edition. Numerous spin-offs and expansions have also been made for the game.&#10;&#10;",
	// 	rating: 7.26569,
	// 	year: 1995,
	// 	minPlayers: 3,
	// 	maxPlayers: 4,
	// 	playingTime: 120,
	// 	categories: [
	// 		{
	// 			name: "Negotiation",
	// 		},
	// 	],
	// 	designers: [{ name: "Klaus Teuber" }],
	// };

	function handleInputChange(identifier, value) {
		setEnteredValues((prevValues) => ({
			...prevValues,
			[identifier]: value,
		}));
	}

	function handleArrayChange(identifier, value, index = 0) {
		let enteredArray;
		if (identifier === "categories") {
			enteredArray = enteredValues.categories;
		} else if (identifier === "designers") {
			enteredArray = enteredValues.designers;
		}

		enteredArray[index].name = value;

		setEnteredValues((prevValues) => ({
			...prevValues,
			[identifier]: enteredArray,
		}));
	}

	function handleSubmit(event) {
		event.preventDefault();

		setFetchSucess(false);

		const url = API_URL + "/api/BoardGames";

		const json = JSON.stringify(enteredValues);

		console.log(json);

		const requestOptions = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + JWT,
			},
			body: json,
		};

		fetch(url, requestOptions)
			.then((response) => {
				setStatusCode(response.status);
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				if (response.status === 201) {
					return response.json();
				}
			})
			.then((data) => {
				console.log(data);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	return (
		<main className={styles.section}>
			<div className={styles.tokenWrapper}>
				<h3>JWT:</h3>
				<p>{JWT}</p>
			</div>
			<section
				id="formWrapper"
				className={styles.formWrapper}
				style={{
					background: "linear-gradient(45deg, #a0e3d8, #dddddd, #a0e3d8)",
				}}
			>
				<h2>Add Board Game</h2>
				<form id="form" onSubmit={handleSubmit}>
					<input
						id="gameName"
						className="mb-4 rounded-0 border-0 p-2"
						onChange={(event) => handleInputChange("name", event.target.value)}
						value={enteredValues.name}
						type="text"
						placeholder="Game Name"
						required
					/>
					<textarea
						id="description"
						className="mb-4 rounded-0 border-0 p-2"
						onChange={(event) =>
							handleInputChange("description", event.target.value)
						}
						value={enteredValues.description}
						type="text"
						placeholder="Description"
						maxLength="3000"
					/>
					<input
						id="rating"
						className="mb-4 rounded-0 border-0 p-2"
						onChange={(event) =>
							handleInputChange("rating", event.target.value)
						}
						value={enteredValues.rating}
						type="number"
						placeholder="Rating"
						required
					/>
					<input
						id="year"
						className="mb-4 rounded-0 border-0 p-2"
						onChange={(event) => handleInputChange("year", event.target.value)}
						value={enteredValues.year}
						type="number"
						placeholder="Year of Realese"
						required
					/>
					<input
						id="minPlayers"
						className="mb-4 rounded-0 border-0 p-2"
						onChange={(event) =>
							handleInputChange("minPlayers", event.target.value)
						}
						value={enteredValues.minPlayers}
						type="number"
						placeholder="Minimum nr of Players"
						required
					/>
					<input
						id="maxPlayers"
						className="mb-4 rounded-0 border-0 p-2"
						onChange={(event) =>
							handleInputChange("maxPlayers", event.target.value)
						}
						value={enteredValues.maxPlayers}
						type="number"
						placeholder="Maximum nr od Players"
						required
					/>
					<input
						id="playingTime"
						className="mb-4 rounded-0 border-0 p-2"
						onChange={(event) =>
							handleInputChange("playingTime", event.target.value)
						}
						value={enteredValues.playingTime}
						type="number"
						placeholder="Playing Time"
						required
					/>
					<input
						id="categories"
						className="mb-4 rounded-0 border-0 p-2"
						onChange={(event) =>
							handleArrayChange("categories", event.target.value)
						}
						value={enteredValues.categories[0].name}
						type="text"
						placeholder="Categories"
						required
					/>
					<input
						id="designers"
						className="mb-4 rounded-0 border-0 p-2"
						onChange={(event) =>
							handleArrayChange("designers", event.target.value)
						}
						value={enteredValues.designers[0].name}
						type="text"
						placeholder="Designers"
						required
					/>
					<button
						className="text-white border-0 rounded-0 p-0 fs-3 fw-bold"
						id="submitButton"
						variant="primary"
						type="submit"
					>
						Submit
					</button>
				</form>
				{statusCode !== 0 && statusCode !== 201 && (
					<div className={styles.responseWrapper}>
						<h3>Unable to post data</h3>
						<p>{`Status Code: ${statusCode}`}</p>
					</div>
				)}
				{fetchSucess && (
					<div className={styles.responseWrapper}>
						<h3>Sucessful request</h3>
					</div>
				)}
			</section>
		</main>
	);
}
