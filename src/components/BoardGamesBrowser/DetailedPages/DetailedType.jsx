import { useEffect, useState } from "react";
import styles from "./DetailedType.module.css";
import { useNavigate } from "react-router-dom";
import { useBG_APIContext } from "../../../routes/BoardGamesView";

export default function DetailedType({ type, id }) {
	const [details, setDetails] = useState();

	const { API_URL, setRefresh } = useBG_APIContext();

	const navigate = useNavigate();

	useEffect(() => {
		setDetails(null);
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

	return (
		<section className={styles.typeView}>
			{!details ? (
				<p>Loading...</p>
			) : (
				<>
					<h2>{`${type}: ${details.name}`}</h2>
					<h3>Board Games:</h3>
					<ul>
						{details.boardGames.map((boardGame) => (
							<li
								onClick={() => {
									navigate(`/board-games/boardGameID${boardGame.id}`);
								}}
								key={boardGame.name}
							>
								{boardGame.name}
							</li>
						))}
					</ul>
				</>
			)}
		</section>
	);
}
