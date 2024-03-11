import { Fragment, useEffect, useState } from "react";
import styles from "./BoardGamesBrowser.module.css";
import { sliceWords } from "../../util/boardGames";
import { Link, useNavigate } from "react-router-dom";
import { useBG_APIContext } from "../../routes/BoardGamesView";

const HeadTitles = [
	{ apiHandle: "Name", name: "Name" },
	{ apiHandle: "Description", name: "Description" },
	{ apiHandle: "Rating", name: "Rating" },
	{ apiHandle: "MinPlayers", name: "Minimum Players" },
	{ apiHandle: "MaxPlayers", name: "Maxiumum Players" },
	{ apiHandle: "PlayingTime", name: "Playing Time" },
	{ apiHandle: "Year", name: "Year" },
	{ apiHandle: "Categories", name: "Categories", returnsObject: true },
	{ apiHandle: "Designers", name: "Designers", returnsObject: true },
];

const PAGE_SIZE = 25;

export default function BoardGamesBrowser() {
	const [boardGames, setBoardGames] = useState(null);
	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(1);
	const [orderBy, setOrderBy] = useState("none"); // none, default, desc
	const [orderTarget, setOrderTarget] = useState("");

	const API_URL = useBG_APIContext();

	const navigate = useNavigate();

	useEffect(() => {
		setLoading(true);
		async function fetchData() {
			let URL = API_URL + "/BoardGames?";
			if (page > 1) {
				URL = URL + `$skip=${(page - 1) * PAGE_SIZE}&`;
			}
			if (orderTarget !== "" && orderBy !== "none") {
				if (orderBy === "default") {
					URL = URL + `orderby=${orderTarget}`;
				} else if (orderBy === "desc") {
					URL = URL + `orderby=${orderTarget} desc`;
				}
			}
			const res = await fetch(URL);
			if (!res.ok) {
				return;
			}
			const bgs = await res.json();
			setBoardGames(bgs);
			setLoading(false);
		}

		fetchData();
	}, [page, orderBy, orderTarget]);

	function getOrderArrow(apiHandle) {
		let char = "";
		if (apiHandle === orderTarget) {
			if (orderBy === "default") {
				char = "\u2191";
			} else if (orderBy === "desc") {
				char = "\u2193";
			}
		}
		return char;
	}

	return (
		<section>
			{!loading ? (
				<>
					{boardGames && (
						<div>
							<table className={styles.table}>
								<thead>
									<tr>
										{HeadTitles.map((obj) => (
											<th
												className={styles.tableHead}
												onClick={() => {
													if (!obj.returnsObject) {
														if (orderTarget !== obj.apiHandle) {
															setOrderBy("default");
														} else {
															setOrderBy((prevValue) => {
																if (prevValue === "none") {
																	return "default";
																} else if (prevValue === "default") {
																	return "desc";
																} else if (prevValue === "desc") {
																	return "none";
																}
															});
														}
														setOrderTarget(obj.apiHandle);
													}
												}}
												key={obj.apiHandle}
											>
												{obj.name}{" "}
												<span style={{ fontSize: "1.5rem" }}>
													{getOrderArrow(obj.apiHandle)}
												</span>
											</th>
										))}
									</tr>
								</thead>
								{boardGames.length > 0 && (
									<tbody>
										{boardGames.map((boardGame) => (
											<tr key={boardGame.id}>
												<td
													onClick={() => {
														navigate(`/board-games/boardGameID${boardGame.id}`);
													}}
												>
													{boardGame.name}
												</td>
												<td
													onClick={() => {
														navigate(`/board-games/boardGameID${boardGame.id}`);
													}}
												>
													{sliceWords(boardGame.description, 30) + " ..."}
												</td>
												<td
													onClick={() => {
														navigate(`/board-games/boardGameID${boardGame.id}`);
													}}
												>
													{boardGame.rating}
												</td>
												<td
													onClick={() => {
														navigate(`/board-games/boardGameID${boardGame.id}`);
													}}
												>
													{boardGame.minPlayers}
												</td>
												<td
													onClick={() => {
														navigate(`/board-games/boardGameID${boardGame.id}`);
													}}
												>
													{boardGame.maxPlayers}
												</td>
												<td
													onClick={() => {
														navigate(`/board-games/boardGameID${boardGame.id}`);
													}}
												>
													{boardGame.playingTime}
												</td>
												<td
													onClick={() => {
														navigate(`/board-games/boardGameID${boardGame.id}`);
													}}
												>
													{boardGame.year}
												</td>
												<td>
													{boardGame.categories.map((category) => (
														<Link
															onClick={() => {
																navigate(
																	`/board-games/categoryID${category.id}`
																);
															}}
															key={category.id}
														>{`${category.name} `}</Link>
													))}
												</td>
												<td>
													{boardGame.designers.map((designer) => (
														<Link
															onClick={() => {
																navigate(
																	`/board-games/designerID${designer.id}`
																);
															}}
															key={designer.id}
														>{`${designer.name} `}</Link>
													))}
												</td>
												{/* <td>
                    <ActionButton movieData={boardGame} />
                  </td> */}
											</tr>
										))}
									</tbody>
								)}
							</table>
							<div className={styles.pageSelectorWrapper}>
								<button
									disabled={page === 1}
									onClick={() => setPage((prevPage) => prevPage - 1)}
								>
									&lt;
								</button>
								<div>{page}</div>
								<button
									disabled={boardGames.length < PAGE_SIZE}
									onClick={() => setPage((prevPage) => prevPage + 1)}
								>
									&gt;
								</button>
							</div>
						</div>
					)}
				</>
			) : (
				<div>
					<p>Loading...</p>
				</div>
			)}

			{/* {boardGames && (
        <>
          <ul className={styles.navbar}>
            {Object.keys(boardGames[0]).map((key) => (
              <li key={key}>{key}</li>
            ))}
          </ul>
          <ul>
            {boardGames.map((entity) => {
              {
                Object.entries(entity).map((key, value) => {
                  key.map((value) => <li key={key}>{value}</li>);
                  //   <li key={`${key[0]} ${value}`}>{key[1]}</li>;
                });
              }
              //   Object.values(entity).map((value) => (
              //     <li key={value}>{value}</li>
              //   ));
            })}
          </ul>
        </>
      )} */}
		</section>
	);
}
