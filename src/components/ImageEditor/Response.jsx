import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

const API_URL = "http://98.71.35.179:4000/image/";

export default function Response() {
  const [image, setImage] = useState();

  const params = useParams();

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(API_URL + params.path, {
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
    <>
      <div className="ResponseWrapper Body">
        {image ? <img src={image} alt="response image" /> : <p>Loading...</p>}
        <div className="ResponseDiv">
          <Link to="/">
            <button>Return</button>
          </Link>
          <button onClick={handleDownload}>Download</button>
        </div>
      </div>
    </>
  );
}
