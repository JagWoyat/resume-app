import { useEffect, useState } from "react";
import { sliceWords } from "../../util/boardGames";

const API_URL = "/api";
// const API_URL = "http://98.71.35.179/api";

export default function Details({ type, id }) {
	const [details, setDetails] = useState();
	const [showDescription, setShowDescription] = useState(false);
	const [description, setDescription] = useState("");

	useEffect(() => {
		async function fetchData() {
			const res = await fetch(API_URL + `/${type}/${id}`);
			if (!res.ok) {
				return;
			}
			const bgs = await res.json();
			setDetails(bgs);
		}

		fetchData();
	}, []);

	useEffect(() => {
		if (details && type === "BoardGames") {
			if (showDescription) {
				setDescription(details.description);
			} else {
				setDescription(sliceWords(details.description, 100) + " ...");
			}
		}
	}, [showDescription, details]);

	function handleShowDescription() {
		setShowDescription((prevState) => !prevState);
	}

	let content = <div>Undefined</div>;

	if (type === "BoardGames") {
		content = (
			<section>
				{!details ? (
					<p>Loading...</p>
				) : (
					<>
						<h2>{`Board Game: ${details.name}`}</h2>
						<p onClick={handleShowDescription}>{description}</p>
					</>
				)}
			</section>
		);
	}
	if (type === "Categories") {
		content = (
			<section>
				{!details ? (
					<p>Loading...</p>
				) : (
					<>
						<h2>{`Category: ${details.name}`}</h2>
						<h3>Board Games:</h3>
						<ul>
							{details.boardGames.map((boardGame) => (
								<li key={boardGame.name}>{boardGame.name}</li>
							))}
						</ul>
					</>
				)}
			</section>
		);
	}
	if (type === "Designers") {
		content = (
			<section>
				{!details ? (
					<p>Loading...</p>
				) : (
					<>
						<h2>{`Designer: ${details.name}`}</h2>
						<h3>Board Games:</h3>
						<ul>
							{details.boardGames.map((boardGame) => (
								<li key={boardGame.name}>{boardGame.name}</li>
							))}
						</ul>
					</>
				)}
			</section>
		);
	}

	return <>{content}</>;
}
