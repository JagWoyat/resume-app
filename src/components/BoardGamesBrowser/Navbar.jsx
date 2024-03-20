import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useBG_APIContext } from "../../routes/BoardGamesView";

const LINKS = [
	{
		title: "Main",
		link: "/board-games/about",
	},
	{
		title: "Board Games",
		link: "/board-games/games",
	},
	{
		title: "Categories",
		link: "/board-games/categories",
	},
	{
		title: "Designers",
		link: "/board-games/designers",
	},
	{
		title: "Login",
		link: "/board-games/login",
	},
];

const DATA_TYPES = [
	{
		name: "Board Games",
		path: "/BoardGames",
	},
	{
		name: "Designers",
		path: "/Designers",
	},
	{
		name: "Categories",
		path: "/Categories",
	},
];

export default function Navbar() {
	const [searchInput, setSearchInput] = useState("");
	const [path, setPath] = useState(DATA_TYPES[0].path);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);

	const { API_URL, setRefresh } = useBG_APIContext();

	const navigate = useNavigate();

	const [inputFocus, setInputFocus] = useState(false);
	const [inputDropdown, setInputDropdown] = useState(false);

	useEffect(() => {
		if (searchInput !== "") {
			setLoading(true);
			async function fetchData() {
				let URL = API_URL + path + `/Search:${searchInput}?$top=5`;
				const res = await fetch(URL);
				if (!res.ok) {
					return;
				}
				const resData = await res.json();
				setData(resData);
				setLoading(false);
			}

			fetchData();
		}
	}, [searchInput]);

	function handleFocusChange(value) {
		setTimeout(() => {
			setInputFocus(false);
			setInputDropdown(false);
		}, 100);
	}

	function handleChange(event) {
		setSearchInput(event.target.value);
		if (event.target.value === "") {
			setInputDropdown(false);
		} else {
			setInputDropdown(true);
		}
	}

	return (
		<nav className={styles.boardGameNav}>
			<div className={styles.navWrapper}>
				<h2>Board Games</h2>
				<form className={styles.searchForm}>
					<div className={styles.searchInput}>
						<input
							onChange={(e) => handleChange(e)}
							onFocus={() => setInputFocus(true)}
							onBlur={() => handleFocusChange(false)}
							value={searchInput}
							placeholder="Search"
						/>
						{/* <label>Submit</label> */}
						<div className={!inputDropdown ? styles.ulTestowe : ""}>
							{!loading ? (
								<ul>
									{data.length > 0 ? (
										<>
											{" "}
											{data.map((obj) => (
												<li
													className={styles.searchResult}
													key={obj.id}
													onClick={() => {
														setRefresh(true);
														navigate(`/board-games/boardGameID${obj.id}`);
													}}
												>
													{obj.name}
												</li>
											))}
										</>
									) : (
										<li>No results</li>
									)}
								</ul>
							) : (
								<ul>
									<li>Loading</li>
								</ul>
							)}
						</div>
					</div>
					{/* <label>Type:</label>
					<select
						value={path}
						onChange={(event) => setPath(event.target.value)}
					>
						{DATA_TYPES.map((type) => {
							return (
								<option value={type.path} key={type.path}>
									{type.name}
								</option>
							);
						})}
					</select> */}
				</form>
			</div>
			<div className={styles.links}>
				{LINKS.map((page) => {
					return (
						<NavLink
							className={({ isActive, isPending }) =>
								isPending
									? styles.routeLinkPending
									: isActive
									? styles.routeLinkActive
									: styles.routeLink
							}
							to={page.link}
							key={page.title}
						>
							{page.title}
						</NavLink>
					);
				})}
			</div>
		</nav>
	);
}
