import React, { useEffect, useRef, useState } from "react";
import styles from "./Navbar.module.css";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useBG_APIContext } from "../../routes/BoardGamesView";
import { getWindowSize } from "../../util/util";

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
		path: "games",
	},
	{
		name: "Designers",
		path: "designers",
	},
	{
		name: "Categories",
		path: "categories",
	},
];

const WIDTH_BREAKPOINT = 1439;

export default function Navbar() {
	const navigate = useNavigate();
	const location = useLocation();

	const [searchInput, setSearchInput] = useState("");
	const [APIPath, setAPIPath] = useState(DATA_TYPES[0].path);
	const [path, setPath] = useState(location.pathname);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);

	const { API_URL, setRefresh } = useBG_APIContext();

	const lastChange = useRef();
	const [windowSize, setWindowSize] = useState(getWindowSize());

	const [inputFocus, setInputFocus] = useState(false);
	const [inputDropdown, setInputDropdown] = useState(false);

	useEffect(() => {
		if (searchInput !== "") {
			setLoading(true);
			async function fetchData() {
				let path = "/BoardGames";
				if (APIPath === "designers") {
					path = "/Designers";
				}
				if (APIPath === "categories") {
					path = "/Categories";
				}
				let URL =
					API_URL + path + `/Search:${searchInput}?$top=5&$orderby=FilterValue`;
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

	useEffect(() => {
		function handleResize() {
			setWindowSize(getWindowSize);
		}
		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	});

	useEffect(() => {
		setPath(location.pathname);
	}, [location]);

	function handleFocusChange(value) {
		setTimeout(() => {
			setInputFocus(value);
			setInputDropdown(value);
		}, 100);
	}

	function handleChange(event) {
		if (!lastChange.current) {
			clearTimeout(lastChange.current);
		}

		lastChange.current = setTimeout(() => {
			lastChange.current = null;
			setSearchInput(event.target.value);
		}, 500);

		if (event.target.value === "") {
			setInputDropdown(false);
		} else {
			setInputDropdown(true);
		}
	}

	function handleSubmit(event) {
		event.preventDefault();

		// let URL = API_URL + APIPath + `/Search:${searchInput}`;
		setRefresh(true);
		navigate(`/board-games/${APIPath}-${searchInput}`);
	}

	return (
		<nav className={styles.boardGameNav}>
			<div className={styles.navWrapper}>
				<h2>Board Games</h2>
				<form className={styles.searchForm} onSubmit={(e) => handleSubmit(e)}>
					<div className={styles.searchInput}>
						<input
							onChange={(e) => handleChange(e)}
							onFocus={() => setInputFocus(true)}
							onBlur={() => handleFocusChange(false)}
							placeholder="Search"
						/>
						<button className={styles.submitButton} type="submit">
							<label>Submit</label>
						</button>
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
					<label>Type:</label>
					<select
						value={APIPath}
						onChange={(event) => {
							setAPIPath(event.target.value);
						}}
					>
						{DATA_TYPES.map((type) => {
							return (
								<option value={type.path} key={type.path}>
									{type.name}
								</option>
							);
						})}
					</select>
				</form>
			</div>
			<div className={styles.links}>
				{windowSize.innerWidth > WIDTH_BREAKPOINT ? (
					<>
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
					</>
				) : (
					<select
						value={path}
						onChange={(event) => {
							setPath(event.target.value);
							navigate(event.target.value);
						}}
					>
						{LINKS.map((type) => {
							return (
								<option value={type.link} key={type.link}>
									{type.title}
								</option>
							);
						})}
					</select>
				)}
			</div>
		</nav>
	);
}
