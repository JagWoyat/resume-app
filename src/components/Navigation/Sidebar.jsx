import styles from "./Sidebar.module.css";
import { NavLink, useLocation } from "react-router-dom";
import Title from "./Title";
import { Fragment, useEffect, useState } from "react";
import Button from "../common/Button";
import icon from "./../../assets/Monochrome-list-icon.svg";
import Icon from "../common/Icon";

const WIDTH_BREAKPOINT = 1000;

const NAV_ITEMS = [
	{
		title: "Weather App",
		link: "/weather-app",
		sublinks: null,
	},
	{
		title: "Cryptocurrency App",
		link: "/crypto-app",
		sublinks: null,
	},
	{
		title: "Image Editor with Go",
		link: "/image-editor",
		sublinks: null,
	},
	{
		title: "Image Viewer",
		link: "/scroll",
		sublinks: null,
	},
	{
		title: "Board Game Browser (.NET)",
		link: "/board-games",
		sublinks: [
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
				title: "Secret login page",
				link: "/board-games/login",
			},
		],
	},
];

export default function Sidebar() {
	const [smallScreen, setSmallScreen] = useState(false);
	const [openNav, setOpenNav] = useState(false);

	const location = useLocation();

	useEffect(() => {
		const handleResize = () => {
			setSmallScreen(window.innerWidth <= WIDTH_BREAKPOINT);
		};
		window.addEventListener("resize", handleResize);
		handleResize();

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	function handleClick() {
		setOpenNav((prevState) => {
			return !prevState;
		});
	}

	const navContent = (
		<>
			{NAV_ITEMS.map((item) => (
				<Fragment key={item.link}>
					<NavLink
						className={({ isActive, isPending }) =>
							isPending
								? styles.routeLinkPending
								: isActive
								? styles.routeLinkActive
								: styles.routeLink
						}
						to={item.link}
						onClick={() => {
							if (item.sublinks === null) {
								handleClick();
							}
						}}
					>
						<h2>{item.title}</h2>
					</NavLink>
					{item.sublinks !== null &&
						location.pathname.startsWith("/board-games") && (
							<>
								{item.sublinks.map((sublink) => (
									<NavLink
										className={({ isActive, isPending }) =>
											isPending
												? styles.routeLinkPending
												: isActive
												? styles.routeLinkActive
												: styles.routeLink
										}
										to={sublink.link}
										key={sublink.link}
										onClick={handleClick}
									>
										<h3>{sublink.title}</h3>
									</NavLink>
								))}
							</>
						)}
				</Fragment>
			))}
		</>
	);

	return (
		<>
			{smallScreen ? (
				<>
					<header className={styles.headerSmall}>
						<div className={styles.navbarFlex}>
							<Title />
							<Button
								Icon={<Icon className={styles.buttonIcon} src={icon} />}
								onClick={handleClick}
								className={styles.sidebarOpen}
							/>
						</div>
					</header>
					<nav
						style={openNav ? { translate: "0" } : { translate: "-100%" }}
						className={`${styles.wrapper} ${styles.wrapperSmall}`}
					>
						{navContent}
					</nav>
				</>
			) : (
				<header className={`${styles.wrapper} ${styles.wrapperBig}`}>
					<div>
						<Title />
						<hr />
					</div>
					<nav>{navContent}</nav>
				</header>
			)}
		</>
	);
}
