import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ImageUploader.module.css";

const API_URL = "/go/image?";
// const API_URL = "http://localhost:4000/image";

export default function ImageUploader({ title, request }) {
	const [image, setImage] = useState();
	const [imagePreview, setImagePreview] = useState(null);
	const [dragActive, setDragActive] = useState(false);
	const inputRef = useRef(null);

	const mirHorRef = useRef(null);
	const mirVerRef = useRef(null);
	const grayscaleRef = useRef(null);
	const heightRef = useRef(null);
	const widthRef = useRef(null);

	const [resize, setResize] = useState(false);

	let navigate = useNavigate();

	const onFileChange = (event) => {
		const file = event.target.files[0];

		if (file) {
			setImage(file);
			const reader = new FileReader();

			reader.onload = (e) => {
				setImagePreview(e.target.result);
			};

			reader.readAsDataURL(file);
		}
	};

	const removeImg = () => {
		setImage(undefined);
		setImagePreview(null);
	};

	const handleDrag = (event) => {
		event.preventDefault();
		event.stopPropagation();
		if (event.type === "dragenter" || event.type === "dragover") {
			setDragActive(true);
		} else if (event.type === "dragleave") {
			setDragActive(false);
		}
	};

	const handleDrop = function (event) {
		event.preventDefault();
		event.stopPropagation();
		setDragActive(false);

		const file = event.dataTransfer?.files[0];

		if (file) {
			const reader = new FileReader();

			reader.onload = (event) => {
				setImagePreview(event.target?.result);
			};

			reader.readAsDataURL(file);
		}
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		let formData = new FormData();

		if (!image) return;
		formData.append("image", image);
		formData.append("name", "random-name");

		if (mirHorRef) {
			const mirHor = mirHorRef.current.checked;
			formData.append("mirrored_h", mirHor);
		}
		if (mirVerRef) {
			const mirVer = mirVerRef.current.checked;
			formData.append("mirrored_v", mirVer);
		}
		if (grayscaleRef) {
			const grayscale = grayscaleRef.current.checked;
			formData.append("grayscale", grayscale);
		}
		if (resize) {
			const height = parseInt(heightRef.current.value, 10);
			const width = parseInt(widthRef.current.value, 10);
			formData.append("height", height);
			formData.append("width", width);
		}

		// console.log(formData);
		const url = API_URL;
		const requestOptions = {
			method: "POST",
			body: formData,
		};
		request("loading");
		fetch(url, requestOptions)
			.then((response) => response.json())
			.then((responseJSON) => {
				request("done");
				navigate("/image-editor/" + responseJSON.name);
			})
			.catch((error) => {
				request("error");
				console.log("Form submit error", error);
			});
	};

	const handleClick = () => {
		if (inputRef.current) {
			inputRef.current.click();
		}
	};

	return (
		<section className={styles.UploaderWrapper}>
			<div>
				<h1>{title}</h1>
				<a
					target="_blank"
					href="https://github.com/JagWoyat/image-editor-go-rest-api"
				>
					Backend Github page
				</a>
			</div>

			{imagePreview ? (
				<form
					className={styles.Form}
					onDragEnter={handleDrag}
					onSubmit={handleSubmit}
				>
					<button className={styles.RemoveImgButton} onClick={removeImg}>
						X
					</button>
					<img
						src={imagePreview}
						alt="SelectedImage"
						style={{ maxWidth: "100%" }}
					/>
					<fieldset className={styles.Fieldset}>
						<legend>Modifiers</legend>
						<label>
							<input type="checkbox" ref={mirHorRef} />
							Mirror horizontally
						</label>
						<label>
							<input type="checkbox" ref={mirVerRef} />
							Mirror vertically
						</label>
						<label>
							<input type="checkbox" ref={grayscaleRef} />
							Turn to Grayscale
						</label>
						<label>
							<input
								type="checkbox"
								checked={resize}
								onChange={(e) => setResize(e.target.checked)}
							/>
							Resize image
						</label>
						{resize && (
							<>
								<p>Leave value at 0 to keep aspect ratio</p>
								<label>
									Width:
									<input type="number" defaultValue="0" ref={widthRef} />
								</label>
								<label>
									Height:
									<input type="number" defaultValue="0" ref={heightRef} />
								</label>
							</>
						)}
					</fieldset>
					<button
						className={styles.UploadButton}
						type="submit"
						onClick={handleSubmit}
					>
						Upload a file
					</button>

					<input
						ref={inputRef}
						style={{ display: "none" }}
						type="file"
						id="image-input"
					/>
				</form>
			) : (
				<form
					className={styles.Form}
					onDragEnter={handleDrag}
					onSubmit={handleSubmit}
				>
					<label
						className={`${styles.Label} ${
							dragActive ? styles.LabelActive : styles.LabelDefault
						}`}
						htmlFor="image-input"
					>
						<input
							ref={inputRef}
							style={{ display: "none" }}
							type="file"
							id="image-input"
							onChange={onFileChange}
						/>
						<div>
							<p>Drag and drop your file here or</p>
							<button onClick={handleClick} className={styles.UploadButton}>
								Upload a file
							</button>
						</div>
					</label>
					{dragActive && (
						<div
							className={styles.ActiveDropZone}
							onDragEnter={handleDrag}
							onDragLeave={handleDrag}
							onDragOver={handleDrag}
							onDrop={handleDrop}
						></div>
					)}
				</form>
			)}
		</section>

		// <div>
		//   <h1>{title}</h1>
		//   <form onSubmit={handleSubmit}>
		//     <input type="file" onChange={onFileChange} />
		//     <button type="submit">Upload</button>
		//   </form>
		// </div>
	);
}
