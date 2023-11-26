import React from "react";
import styles from "./Title.module.css";
import { Link } from "react-router-dom";
import icon from "./../../assets/add.svg";
import Icon from "../common/Icon";

export default function Title() {
  return (
    <Link className={styles.nameWrapper} as={Link} to="/">
      <Icon className={styles.buttonIcon} src={icon} />
      <h1>CryptoTracker</h1>
    </Link>
  );
}
