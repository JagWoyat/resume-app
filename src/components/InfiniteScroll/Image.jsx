import { useState } from "react";
import styles from "./Image.module.css";

export default function Image({ width, height, ...props }) {
  const [status, setStatus] = useState("loading");

  return (
    <>
      <div
        style={{ width: "100%", height: height, margin: "0.5rem" }}
        className={styles.placeholder}
        width={width}
        height={height}
      />
      <img
        loading="lazy"
        onLoad={() => setStatus("loaded")}
        onError={() => setStatus("failed")}
        style={
          status === "loading"
            ? { opacity: 0, transition: "opacity 0.5s ease-out" }
            : { opacity: 1, transition: "opacity 0.5s ease-out" }
        }
        width={width}
        height={height}
        {...props}
      />
    </>
  );
}
