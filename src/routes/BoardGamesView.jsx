import { useParams } from "react-router-dom";
import BoardGamesBrowser from "../components/BoardGamesBrowser/BoardGamesBrowser";
import DesignersBrowser from "../components/BoardGamesBrowser/DesignersBrowser";
import CategoriesBrowser from "../components/BoardGamesBrowser/CategoriesBrowser";
import Details from "../components/BoardGamesBrowser/Details";

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
    content = <Details type="Categories" id={params.path.slice(10)} />;
  } else if (params.path.startsWith("designerID")) {
    content = <Details type="Designers" id={params.path.slice(10)} />;
  } else if (params.path.startsWith("boardGameID")) {
    content = <Details type="BoardGames" id={params.path.slice(11)} />;
  }

  return <>{content}</>;
}
