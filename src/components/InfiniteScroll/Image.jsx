import { useState } from "react";
import styles from "./Image.module.css";

export default function Image({
  width,
  height,
  hover = false,
  className = "",
  ...props
}) {
  const [status, setStatus] = useState("loading");

  return (
    <>
      <div
        style={{ width: "100%", height: height }}
        className={`${styles.placeholder} ${hover && styles.hover}`}
        width={width}
        height={height}
      />
      <img
        loading="lazy"
        onLoad={() => setStatus("loaded")}
        onError={() => setStatus("failed")}
        style={
          status === "loading"
            ? {
                opacity: 0,
                transition: "opacity 0.5s ease-out",
                height: `${height}`,
              }
            : {
                opacity: 1,
                transition: "opacity 0.5s ease-out",
                height: `${height}`,
              }
        }
        width={width}
        height={height}
        className={`${className} ${styles.image} ${hover && styles.imageHover}`}
        {...props}
      />
    </>
  );
}
