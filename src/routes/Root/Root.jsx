import React from "react";
import styles from "./Root.module.css";
import { Link, NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
// import bitcoin from "../../assets/bitcoin.svg";
// import Icon from "../Icon";

export default function Root() {
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
}
