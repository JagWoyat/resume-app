import { useParams } from "react-router-dom";
import BoardGamesBrowser from "../components/BoardGamesBrowser/BoardGamesBrowser";
import DesignersBrowser from "../components/BoardGamesBrowser/DesignersBrowser";
import CategoriesBrowser from "../components/BoardGamesBrowser/CategoriesBrowser";
import DetailedBoardGame from "../components/BoardGamesBrowser/DetailedPages/DetailedBoardGame";
import DetailedType from "../components/BoardGamesBrowser/DetailedPages/DetailedType";
import { createContext, useContext } from "react";

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
	const params = useParams();

	let content = <div>Bad request</div>;

	if (params.path === "games") {
		content = <BoardGamesBrowser />;
	} else if (params.path === "designers") {
		content = <DesignersBrowser />;
	} else if (params.path === "categories") {
		content = <CategoriesBrowser />;
	} else if (params.path.startsWith("categoryID")) {
		content = <DetailedType type="Categories" id={params.path.slice(10)} />;
	} else if (params.path.startsWith("designerID")) {
		content = <DetailedType type="Designers" id={params.path.slice(10)} />;
	} else if (params.path.startsWith("boardGameID")) {
		content = (
			<DetailedBoardGame type="BoardGames" id={params.path.slice(11)} />
		);
	}

	return (
		<BG_APIContext.Provider value={API_URL}>{content}</BG_APIContext.Provider>
	);
}
