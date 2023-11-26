import React, { useState } from "react";
import styles from "./Carousel.module.css";
import icon from "../../assets/crypto-app-screen.jpg";

export default function Carousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const items = [
    {
      title: "Baseball",
      description:
        "Baseball is a bat-and-ball sport played between two teams of nine players each, taking turns batting and fielding. The game occurs over the course of several plays, with each play generally beginning when a player on the fielding team, called the pitcher.",
      icon: "./crypto-app-screen.jpg",
    },
    {
      title: "Walking",
      description:
        "Walking (also known as ambulation) is one of the main gaits of terrestrial locomotion among legged animals. Walking is typically slower than running and other gaits. ",
      icon: "./crypto-app-screen.jpg",
    },
    {
      title: "Weights",
      description:
        "Weightlifting generally refers to activities in which people lift weights, often in the form of dumbbells or barbells. People lift various kinds of weights for a variety of different reasons.",
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
              <div className={styles.carousel_item} style={{ width: "600px" }}>
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
