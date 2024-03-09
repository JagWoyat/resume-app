import React, { Fragment, useEffect, useState } from "react";
import { sliceWords } from "../../../util/boardGames";
import styles from "./DetailedBoardGame.module.css";
import { useNavigate } from "react-router-dom";
import { useBG_APIContext } from "../../../routes/BoardGamesView";

export default function DetailedBoardGame({ type, id }) {
	const [details, setDetails] = useState();
	const [showDescription, setShowDescription] = useState(false);
	const [description, setDescription] = useState("");

	const API_URL = useBG_APIContext();

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

	function getRatingColor(rating) {
		let color = "#3939db";

		if (rating > 7.5) {
			color = "#0e8f0e";
		}
		if (rating < 5) {
			color = "#a31414";
		}

		return color;
	}

	return (
		<div className={styles.boardGameView}>
			{!details ? (
				<p>Loading...</p>
			) : (
				<>
					<section className={styles.boardGameCard}>
						<div>Id:{details.id}</div>
						<div className={styles.titleWrapper}>
							<div
								style={{ color: `${getRatingColor(details.rating)}` }}
								className={styles.rating}
							>
								<p>{Math.round(details.rating * 10) / 10}</p>
							</div>
							<h2>
								{details.name} <span>({details.year})</span>
							</h2>
						</div>
						<div className={styles.infoWrapper}>
							<div>
								<h3>
									{details.minPlayers}-{details.maxPlayers} Players
								</h3>
							</div>
							<div>
								<h3>{details.playingTime} Min</h3>
								<p>Playing Time</p>
							</div>
						</div>
						<div className={styles.linksWrapper}>
							<div>
								<h3>
									Designers:{" "}
									{details.designers.map((designer) => (
										<Fragment key={designer.name}>
											<span
												className={styles.link}
												onClick={() => {
													navigate(`/board-games/designerID${designer.id}`);
												}}
											>
												{designer.name}
											</span>
											<span style={{ textDecoration: "none" }}> </span>
										</Fragment>
									))}
								</h3>
							</div>
							<div>
								<h3>
									Categories:{" "}
									{details.categories.map((category) => (
										<Fragment key={category.name}>
											<span
												className={styles.link}
												onClick={() => {
													navigate(`/board-games/categoryID${category.id}`);
												}}
											>
												{category.name}
											</span>
											<span style={{ textDecoration: "none" }}> </span>
										</Fragment>
									))}
								</h3>
							</div>
						</div>
					</section>
					<article className={styles.descriptionWrapper}>
						<h2>Description</h2>
						<br />
						<p>{details.description}</p>
					</article>
				</>
			)}
		</div>
	);
}
