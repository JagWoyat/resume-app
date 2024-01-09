import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://98.71.35.179:4000/image";

export default function ImageUploader({ title, request }) {
  const [image, setImage] = useState();

  let navigate = useNavigate();

  const onFileChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let formData = new FormData();

    if (!image) return;
    formData.append("image", image);
    formData.append("name", "random-name");
    formData.append("mirrored_h", false);
    formData.append("mirrored_v", true);
    formData.append("height", 0);
    formData.append("width", 900);
    formData.append("grayscale", false);

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

  return (
    <div>
      <h1>{title}</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={onFileChange} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}
