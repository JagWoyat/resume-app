import styles from "./InfiniteScroll.module.css";

export default function BorderImage({
	shift,
	image,
	chunkSize,
	imagesArr,
	changeImage,
	handleChange,
	translateRate,
}) {
	const shiftDirection = shift === 1 ? "right" : "left";

	let style;

	if (changeImage != "") {
		if (changeImage != shiftDirection) {
			style = { opacity: 0 };
		} else {
			if (changeImage === "left") {
				style = {
					opacity: 1,
					translate: translateRate,
				};
			}
			if (changeImage === "right") {
				style = { opacity: 1, translate: `-${translateRate}` };
			}
		}
	} else {
		style = { opacity: 0, translate: "0" };
	}

	let borderImage = "";
	let newInnerIndex = image.inner + shift;
	if (newInnerIndex >= chunkSize) {
		newInnerIndex = 0;
		let newOuterIndex = image.outer + 1;
		if (newOuterIndex < CHUNK_COUNT) {
			borderImage = imagesArr[newOuterIndex][newInnerIndex].src;
		}
	} else if (newInnerIndex < 0) {
		newInnerIndex = chunkSize - 1;
		let newOuterIndex = image.outer - 1;
		if (newOuterIndex >= 0) {
			borderImage = imagesArr[newOuterIndex][newInnerIndex].src;
		}
	} else {
		borderImage = imagesArr[image.outer][newInnerIndex].src;
	}

	return (
		<>
			{borderImage != "" ? (
				<img
					className={`${styles.imageModal} ${
						(changeImage === "left" || changeImage === "right") && styles.slide
					}`}
					src={borderImage}
					style={style}
				/>
			) : (
				<div style={{ position: "relative", width: "33%" }} />
			)}
			<button
				className={`${styles.button} ${
					shiftDirection === "left" ? styles.left : styles.right
				}`}
				onClick={() => {
					handleChange(shiftDirection);
				}}
				disabled={borderImage === "" ? true : false}
			>
				{shiftDirection === "left" ? <span>&lt;</span> : <span>&gt;</span>}
			</button>
		</>
	);
}
