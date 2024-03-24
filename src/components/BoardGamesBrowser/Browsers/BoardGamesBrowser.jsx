import { Fragment, useEffect, useState } from "react";
import styles from "./BoardGamesBrowser.module.css";
import { fetchData, fetchSearch, sliceWords } from "../../../util/boardGames";
import { Link, useNavigate } from "react-router-dom";
import { useBG_APIContext } from "../../../routes/BoardGamesView";
import TableHeader from "./TableHeader";

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

export default function BoardGamesBrowser({ searchParam }) {
	const [boardGames, setBoardGames] = useState(null);
	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(1);
	const [orderBy, setOrderBy] = useState("none"); // none, default, desc
	const [orderTarget, setOrderTarget] = useState("");
	const [fliter, setFilter] = useState("");

	const { API_URL, setRefresh } = useBG_APIContext();

	const navigate = useNavigate();

	useEffect(() => {
		setLoading(true);
		if (searchParam) {
			(async () => {
				setBoardGames(
					await fetchSearch(
						API_URL,
						searchParam,
						"BoardGames",
						orderTarget,
						orderBy,
						page,
						PAGE_SIZE
					)
				);
			})();
			setLoading(false);
		} else {
			(async () => {
				setBoardGames(
					await fetchData(
						API_URL,
						"BoardGames",
						orderTarget,
						orderBy,
						page,
						PAGE_SIZE
					)
				);
			})();
			setLoading(false);
		}
	}, [page, orderBy, orderTarget]);

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
											<TableHeader
												key={obj.apiHandle}
												obj={obj}
												orderBy={orderBy}
												setOrderBy={setOrderBy}
												orderTarget={orderTarget}
												setOrderTarget={setOrderTarget}
											/>
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
