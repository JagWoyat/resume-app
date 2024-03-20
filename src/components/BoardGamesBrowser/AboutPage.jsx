import React from "react";
import styles from "./AboutPage.module.css";

export default function AboutPage() {
	return (
		<article className={styles.about}>
			<h2>Board Game Browser</h2>
			<p>
				This app allows for interacting with{" "}
				<a
					href="https://github.com/JagWoyat/BoardGameBrowserAPI"
					target="_blank"
				>
					.NET REST API
				</a>
				, that handles data of popular board games. Used database is part of{" "}
				<a
					href="https://www.kaggle.com/datasets/sujaykapadnis/board-games"
					target="_blank"
				>
					Board Game Dataset
				</a>
				.
			</p>
			<br />
			<h3>Backend features</h3>
			<ul>
				<li>SQLite database with many to many relationships</li>
				<li>CRUD operations on Board Game entities</li>
				<li>
					Automatic creation and deletion of unused Designer and Category
					entities
				</li>
				<li>JWT authentication and authorization</li>
				<li>Paging, sorting and searching</li>
				<h4>ToDo</h4>
				<li>Custom requests responses</li>
			</ul>
			<br />
			<h3>Frontend features</h3>
			<ul>
				<li>Fetching and displaying data</li>
				<li>Details pages</li>
				<li>Sorting by type (Categories and Designers excluded) with paging</li>
				<h4>In progress</h4>
				<li>Loging in and handling resulting JWT</li>
				<li>Handling POST, PUT and DELETE requests</li>
				<li>Implement searching</li>
				<li>Error handling</li>
				<li>Navbar</li>
			</ul>
		</article>
	);
}
