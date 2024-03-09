import { useEffect, useState } from "react";
import styles from "./BoardGamesBrowser.module.css";
import { useNavigate } from "react-router-dom";
import { useBG_APIContext } from "../../routes/BoardGamesView";

const HeadTitles = ["Name", "Board Game Count"];

export default function DesignersBrowser() {
	const [designers, setDesigners] = useState(null);

	const API_URL = useBG_APIContext();

	const navigate = useNavigate();

	useEffect(() => {
		async function fetchData() {
			const res = await fetch(API_URL + "/Designers");
			if (!res.ok) {
				return;
			}
			const bgs = await res.json();
			setDesigners(bgs);
		}
		fetchData();
	}, []);

	return (
		<section>
			{designers && (
				<table className={styles.table}>
					<thead>
						<tr>
							{HeadTitles.map((title) => (
								<th key={title}>{title}</th>
							))}
						</tr>
					</thead>
					{designers.length > 0 && (
						<tbody>
							{designers.map((designer) => (
								<tr
									onClick={() => {
										navigate(`/board-games/designerID${designer.id}`);
									}}
									key={designer.id}
								>
									<td>{designer.name}</td>
									<td>{designer.boardGameCount}</td>
								</tr>
							))}
						</tbody>
					)}
				</table>
			)}
		</section>
	);
}
