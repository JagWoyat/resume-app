import { useEffect, useState } from "react";
import styles from "./BoardGamesBrowser.module.css";
import { useNavigate } from "react-router-dom";

const HeadTitles = ["Name", "Board Game Count"];

const API_URL = "/api";
// const API_URL = "http://98.71.35.179/api/";

export default function CategoriesBrowser() {
	const [categories, setCategories] = useState(null);

	const navigate = useNavigate();

	useEffect(() => {
		async function fetchData() {
			const res = await fetch(API_URL + "/Categories");
			if (!res.ok) {
				return;
			}
			const bgs = await res.json();
			setCategories(bgs);
		}
		fetchData();
	}, []);

	return (
		<section>
			{categories && (
				<table className={styles.table}>
					<thead>
						<tr>
							{HeadTitles.map((title) => (
								<th key={title}>{title}</th>
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
			)}
		</section>
	);
}
