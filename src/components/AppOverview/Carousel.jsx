import { useState } from "react";
import styles from "./Carousel.module.css";
import Image from "../InfiniteScroll/Image";

export default function Carousel({ items }) {
  const [activeIndex, setActiveIndex] = useState(0);
  function updateIndex(newIndex) {
    if (newIndex < 0) {
      newIndex = items.length - 1;
    } else if (newIndex >= items.length) {
      newIndex = 0;
    }
    setActiveIndex(newIndex);
  }

  return (
    <div>
      <div className={styles.carousel}>
        <button
          className={`${styles.button} ${styles.left}`}
          onClick={() => {
            updateIndex(activeIndex - 1);
          }}
        >
          <span>&lt;</span>
        </button>
        <div
          className={styles.inner}
          style={{ transform: `translate(-${activeIndex * 100}%)` }}
        >
          {items.map((item) => {
            return (
              <div
                key={item.id}
                className={styles.carousel_item}
                style={{ width: "100%" }}
              >
                <Image
                  className={styles.carousel_img}
                  src={item.icon}
                  width="600px"
                  height="400px"
                />
              </div>
            );
          })}
        </div>
        <button
          className={`${styles.button} ${styles.right}`}
          onClick={() => {
            updateIndex(activeIndex + 1);
          }}
        >
          <span>&gt;</span>
        </button>
      </div>
    </div>
  );
}
