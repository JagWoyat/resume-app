import { useEffect, useRef } from "react";
import { useState } from "react";
import { generateImages } from "../../util/infiniteScroll";
import styles from "./InfiniteScroll.module.css";
import Image from "./Image";
import Modal from "../common/Modal";
import React from "react";
import BorderImage from "./BorderImage";

const IMAGE_COUNT = 120;
const CHUNK_COUNT = IMAGE_COUNT / 30;

export default function InfiniteScroll() {
	const [imagesArr, setImagesArr] = useState([[{}]]);
	const [loadedChunk, setLoadedChunk] = useState(-1);
	const [changeImage, setChangeImage] = useState("");
	const [chosenImage, setChosenImage] = useState({ outer: 0, inner: 0 });

	const modalRef = useRef();
	const exitButtonRef = useRef();

	function handleClick(outerIndex, innerIndex) {
		setChosenImage({ outer: outerIndex, inner: innerIndex });
		modalRef.current.open();
		exitButtonRef.current.blur();
	}

	function handleExit() {
		modalRef.current.close();
		exitButtonRef.current.blur();
	}

	function handleChange(state) {
		setChangeImage(state);
		setTimeout(() => {
			setChangeImage("");
			if (state === "left") updateIndex(chosenImage.inner - 1);
			if (state === "right") updateIndex(chosenImage.inner + 1);
		}, 500);
	}

	function updateIndex(innerIndex) {
		let newInnerIndex = innerIndex;
		let newOuterIndex = chosenImage.outer;
		if (newInnerIndex >= IMAGE_COUNT / CHUNK_COUNT) {
			newInnerIndex = 0;
			let newOuterIndex = chosenImage.outer + 1;
			if (newOuterIndex >= CHUNK_COUNT) {
				return;
			}
			setChosenImage({ outer: newOuterIndex, inner: newInnerIndex });
			return;
		}
		if (newInnerIndex < 0) {
			newInnerIndex = IMAGE_COUNT / CHUNK_COUNT - 1;
			let newOuterIndex = chosenImage.outer - 1;
			if (newOuterIndex < 0) {
				return;
			}
			setChosenImage({ outer: newOuterIndex, inner: newInnerIndex });
			return;
		}
		setChosenImage({ outer: newOuterIndex, inner: newInnerIndex });
		return;
	}

	useEffect(() => {
		const handleScroll = () => {
			const isAtBottom =
				window.innerHeight + window.scrollY >= document.body.offsetHeight;
			if (isAtBottom) {
				setLoadedChunk((prevState) => {
					return prevState + 1;
				});
			}
		};
		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	useEffect(() => {
		setImagesArr(generateImages(IMAGE_COUNT, CHUNK_COUNT));
		setLoadedChunk(0);
	}, []);

	return (
		<div className={styles.wrapper}>
			{imagesArr.length > 1 && (
				<Modal ref={modalRef}>
					<button
						ref={exitButtonRef}
						onClick={handleExit}
						className={styles.exitModal}
					>
						X
					</button>
					<div className={styles.center}>
						<div className={styles.modalWrapper}>
							<BorderImage
								shift={-1}
								image={chosenImage}
								chunkSize={IMAGE_COUNT / CHUNK_COUNT}
								imagesArr={imagesArr}
								changeImage={changeImage}
								handleChange={handleChange}
							/>
							<div className={styles.imageWrapper}>
								<img
									className={`${styles.imageModal} ${
										(changeImage === "left" || changeImage === "right") &&
										styles.slide
									}`}
									src={imagesArr[chosenImage.outer][chosenImage.inner].src}
									style={
										changeImage === "right"
											? { opacity: 0, translate: "-100%" }
											: changeImage === "left"
											? { opacity: 0, translate: "100%" }
											: { opacity: 1, translate: "0" }
									}
								/>
							</div>
							<BorderImage
								shift={1}
								image={chosenImage}
								chunkSize={IMAGE_COUNT / CHUNK_COUNT}
								imagesArr={imagesArr}
								changeImage={changeImage}
								handleChange={handleChange}
							/>
						</div>
					</div>
				</Modal>
			)}

			<ul className={styles.list}>
				{imagesArr.map((imageSet) => {
					const outerIndex = imagesArr.indexOf(imageSet);
					const display = outerIndex <= loadedChunk;
					return (
						<React.Fragment key={outerIndex}>
							{display && (
								<>
									{imageSet.map((image) => {
										const innerIndex = imageSet.indexOf(image);
										return (
											<li key={innerIndex} className={styles.item}>
												<Image
													onClick={() => handleClick(outerIndex, innerIndex)}
													src={image.src}
													hover
													width={300}
													height={300}
												/>
											</li>
										);
									})}
								</>
							)}
						</React.Fragment>
					);
				})}
			</ul>
		</div>
	);
}
