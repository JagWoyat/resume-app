import { useNavigate, useParams } from "react-router-dom";
import BoardGamesBrowser from "../components/BoardGamesBrowser/Browsers/BoardGamesBrowser";
import DesignersBrowser from "../components/BoardGamesBrowser/Browsers/DesignersBrowser";
import CategoriesBrowser from "../components/BoardGamesBrowser/Browsers/CategoriesBrowser";
import DetailedBoardGame from "../components/BoardGamesBrowser/DetailedPages/DetailedBoardGame";
import DetailedType from "../components/BoardGamesBrowser/DetailedPages/DetailedType";
import { createContext, useContext, useEffect, useState } from "react";
import Login from "../components/BoardGamesBrowser/Login";
import UserPage from "../components/BoardGamesBrowser/UserPage";
import AboutPage from "../components/BoardGamesBrowser/AboutPage";
import Navbar from "../components/BoardGamesBrowser/Navbar";

const API_URL = "/api";
// const API_URL = "http://98.71.35.179/api";

const BG_APIContext = createContext();

export function useBG_APIContext() {
	const context = useContext(BG_APIContext);

	if (!context) {
		throw new Error("Couldnt get BoardGame API context");
	}

	return context;
}

export default function BoardGamesView() {
	const [refresh, setRefresh] = useState(false);
	const params = useParams();

	const navigate = useNavigate();

	useEffect(() => {
		if (refresh === true) {
			setRefresh(false);
			navigate(0);
		}
	}, [refresh]);

	let content = <div>Bad request</div>;

	if (params.path.startsWith("games")) {
		content = <BoardGamesBrowser searchParam={params.path.slice(6)} />;
	} else if (params.path.startsWith("designers")) {
		content = <DesignersBrowser searchParam={params.path.slice(10)} />;
	} else if (params.path.startsWith("categories")) {
		content = <CategoriesBrowser searchParam={params.path.slice(11)} />;
	} else if (params.path.startsWith("categoryID")) {
		content = <DetailedType type="Categories" id={params.path.slice(10)} />;
	} else if (params.path.startsWith("designerID")) {
		content = <DetailedType type="Designers" id={params.path.slice(10)} />;
	} else if (params.path.startsWith("boardGameID")) {
		content = (
			<DetailedBoardGame type="BoardGames" id={params.path.slice(11)} />
		);
	} else if (params.path === "login") {
		content = <Login />;
	} else if (params.path === "user") {
		content = <UserPage />;
	} else if (params.path === "about") {
		content = <AboutPage />;
	}

	return (
		<BG_APIContext.Provider value={{ API_URL, setRefresh }}>
			<Navbar />
			{content}
		</BG_APIContext.Provider>
	);
}
