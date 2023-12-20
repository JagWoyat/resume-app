import { useState } from "react";
import styles from "./Image.module.css";

export default function Image({ ...props }) {
  const [status, setStatus] = useState("loading");

  return (
    <>
      <div>
        <div className={styles.placeholder} />
        <img
          loading="lazy"
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("failed")}
          style={
            status === "loading"
              ? { opacity: 0, transition: "opacity 1s ease-out" }
              : { opacity: 1, transition: "opacity 1s ease-out" }
          }
          {...props}
        />
      </div>
    </>
  );
}
