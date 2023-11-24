import React from "react";
import styles from "./Sidebar.module.css";
import { Link, NavLink } from "react-router-dom";
import Title from "./Title";

export default function Sidebar() {
  return (
    <header className={styles.wrapper}>
      <div>
        <Title />
        <hr />
      </div>
      <nav>
        <NavLink className={styles.routeLink} to="/weather-app">
          <h2>Weather App</h2>
        </NavLink>
        <NavLink className={styles.routeLink} to="/crypto-app">
          <h2>Cryptocurrency App</h2>
        </NavLink>
      </nav>
    </header>
  );
}
