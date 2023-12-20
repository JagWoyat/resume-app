import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Navigation/Sidebar";

export default function Root() {
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
}
