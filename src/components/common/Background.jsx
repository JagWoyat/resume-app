import styles from "./Background.module.css";

export default function Background({ background }) {
  return (
    <section>
      <div className={styles.Background}>
        <img
          src={background}
          alt="Background Image"
          width="100%"
          height="70%"
        />
      </div>
    </section>
  );
}
