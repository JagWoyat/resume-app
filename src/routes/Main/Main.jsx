import React from "react";
import styles from "./Main.module.css";

export default function Main() {
  return (
    <main>
      <section className={styles.introductionWrapper}>
        <h3>Resume App</h3>
      </section>
      <section className={styles.descriptionWrapper}>
        <h3>Description</h3>
      </section>
    </main>
  );
}
