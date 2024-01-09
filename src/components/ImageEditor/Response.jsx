import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import styles from "./ImageUploader.module.css";
import classes from "./ImageEditor.module.css";

// const API_URL = "/api/image/";
const API_URL = "http://localhost:4000/image/";

export default function Response() {
  const [image, setImage] = useState();

  const params = useParams();

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(API_URL + params.path + "?", {
          responseType: "arraybuffer",
        });

        const blob = new Blob([response.data], {
          type: response.headers["content-type"],
        });
        setImage(URL.createObjectURL(blob));
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage();
  }, []);

  const handleDownload = () => {
    if (!params.path) return;
    const link = document.createElement("a");
    link.href = API_URL + params.path;
    link.download = params.path;
    link.click();
  };

  return (
    <section className={classes.Wrapper}>
      <div className={styles.UploaderWrapper}>
        {image ? <img src={image} alt="response image" /> : <p>Loading...</p>}
        <div className={classes.ResponseDiv}>
          <Link to="/image-editor">
            <button className={styles.UploadButton}>Return</button>
          </Link>
          <button className={styles.UploadButton} onClick={handleDownload}>
            Download
          </button>
        </div>
      </div>
    </section>
  );
}
