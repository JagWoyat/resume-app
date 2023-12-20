import { useState } from "react";
import styles from "./Carousel.module.css";
import icon from "../../assets/crypto-app-screen.jpg";

export default function Carousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const items = [
    {
      title: "1",
      icon: "./crypto-app-screen.jpg",
    },
    {
      title: "2",
      icon: "./crypto-app-screen.jpg",
    },
    {
      title: "3",
      icon: "./crypto-app-screen.jpg",
    },
  ];
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
              <div className={styles.carousel_item} style={{ width: "100%" }}>
                <img className={styles.carousel_img} src={icon} />
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
