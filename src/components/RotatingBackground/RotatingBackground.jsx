import styles from "./RotatingBackground.module.css";
// import icon from "../../assets/icon.svg";

export default function RotatingBackground({ background }) {
	return (
		<section>
			<div className={styles.Background}>
				{/* <div style={{ left: "400px" }} className={styles.Circle}>
					<img src={icon} />
				</div> */}
			</div>
		</section>
	);
}
