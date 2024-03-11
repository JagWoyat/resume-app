import { useState } from "react";
import styles from "./Background.module.css";

export default function Background({ background, placeholder }) {
	const [placeholderLoaded, setPlaceholderLoaded] = useState(false);

	function handleLoaded() {
		setTimeout(() => setPlaceholderLoaded(true), 500);
	}

	return (
		<section>
			<div className={styles.Background}>
				{!placeholderLoaded && placeholder && (
					<img src={placeholder} alt="Placeholder" width="100%" height="70%" />
				)}
				<img
					src={background}
					alt="Background Image"
					width="100%"
					height="70%"
					onLoad={handleLoaded}
					style={
						!placeholderLoaded ? { display: "none" } : { display: "block" }
					}
				/>
			</div>
		</section>
	);
}
