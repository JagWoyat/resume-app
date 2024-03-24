import { useEffect, useState } from "react";
import styles from "./BoardGamesBrowser.module.css";
import { useNavigate } from "react-router-dom";
import { useBG_APIContext } from "../../../routes/BoardGamesView";
import TableHeader from "./TableHeader";
import { fetchData, fetchSearch } from "../../../util/boardGames";

const HeadTitles = [
	{ apiHandle: "Name", name: "Name" },
	{ apiHandle: "BoardGameCount", name: "Board Game Count" },
];

const PAGE_SIZE = 25;

export default function CategoriesBrowser({ searchParam }) {
	const [categories, setCategories] = useState(null);
	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(1);
	const [orderBy, setOrderBy] = useState("none"); // none, default, desc
	const [orderTarget, setOrderTarget] = useState("");

	const { API_URL, setRefresh } = useBG_APIContext();

	const navigate = useNavigate();

	useEffect(() => {
		setLoading(true);
		if (searchParam) {
			(async () => {
				setCategories(
					await fetchSearch(
						API_URL,
						searchParam,
						"Categories",
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
				setCategories(
					await fetchData(
						API_URL,
						"Categories",
						orderTarget,
						orderBy,
						page,
						PAGE_SIZE
					)
				);
			})();
			setLoading(false);
		}

		// setLoading(true);
		// async function fetchData() {
		// 	let URL = API_URL + "/Categories?";
		// 	if (page > 1) {
		// 		URL = URL + `$skip=${(page - 1) * PAGE_SIZE}&`;
		// 	}
		// 	if (orderTarget !== "" && orderBy !== "none") {
		// 		if (orderBy === "default") {
		// 			URL = URL + `orderby=${orderTarget}`;
		// 		} else if (orderBy === "desc") {
		// 			URL = URL + `orderby=${orderTarget} desc`;
		// 		}
		// 	}
		// 	const res = await fetch(URL);
		// 	if (!res.ok) {
		// 		return;
		// 	}
		// 	const bgs = await res.json();
		// 	setCategories(bgs);
		// 	setLoading(false);
		// }

		// fetchData();
	}, [page, orderBy, orderTarget]);

	return (
		<section>
			{!loading ? (
				<>
					{categories && (
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
								{categories.length > 0 && (
									<tbody>
										{categories.map((category) => (
											<tr
												onClick={() => {
													navigate(`/board-games/categoryID${category.id}`);
												}}
												key={category.id}
											>
												<td>{category.name}</td>
												<td>{category.boardGameCount}</td>
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
									disabled={categories.length < PAGE_SIZE}
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
		</section>
	);
}
