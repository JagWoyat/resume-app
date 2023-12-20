import styles from "./Main.module.css";

export default function Main() {
  return (
    <div>
      <section className={styles.introductionWrapper}>
        <h3 className={styles.mainTitle}>
          Resume App <span>(in progress)</span>
        </h3>
        <p>I'm an aspiring web developer with focus on React.</p>
        <p>You can find some of my projects on the sidebar</p>
        <h4>
          I'm currently going over React's basics and learing more advanced
          concepts with this course:
        </h4>
        <a href="https://www.udemy.com/course/react-the-complete-guide-incl-redux/">
          <strong>
            React - The Complete Guide 2023 (incl. React Router & Redux)
          </strong>
        </a>
      </section>
    </div>
  );
}
