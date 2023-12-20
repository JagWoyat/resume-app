import styles from "./Title.module.css";
import { Link } from "react-router-dom";
import icon from "./../../assets/icon.svg";
import Icon from "../common/Icon";

export default function Title() {
  return (
    <Link className={styles.nameWrapper} to="/">
      <Icon className={styles.buttonIcon} src={icon} />
      <h1>Resume App</h1>
    </Link>
  );
}
