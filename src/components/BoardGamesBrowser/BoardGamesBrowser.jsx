import { Fragment, useEffect, useState } from "react";
import styles from "./BoardGamesBrowser.module.css";
import { sliceWords } from "../../util/boardGames";
import { Link, useNavigate } from "react-router-dom";
import { useBG_APIContext } from "../../routes/BoardGamesView";

const HeadTitles = [
	"Name",
	"Description",
	"Rating",
	"Minimum Players",
	"Maxiumum Players",
	"Playing Time",
	"Year",
	"Categories",
	"Designers",
];

export default function BoardGamesBrowser() {
	const [boardGames, setBoardGames] = useState(null);

	const API_URL = useBG_APIContext();

	const navigate = useNavigate();

	useEffect(() => {
		async function fetchData() {
			const res = await fetch(API_URL + "/BoardGames");
			if (!res.ok) {
				return;
			}
			const bgs = await res.json();
			setBoardGames(bgs);
		}

		fetchData();
	}, []);

	return (
		<section>
			{boardGames && (
				<table className={styles.table}>
					<thead>
						<tr>
							{HeadTitles.map((title) => (
								<th key={title}>{title}</th>
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
													navigate(`/board-games/categoryID${category.id}`);
												}}
												key={category.id}
											>{`${category.name} `}</Link>
										))}
									</td>
									<td>
										{boardGame.designers.map((designer) => (
											<Link
												onClick={() => {
													navigate(`/board-games/designerID${designer.id}`);
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
