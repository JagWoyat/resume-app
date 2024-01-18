import Icon from "../common/Icon";
import styles from "./AppOverview.module.css";
import Carousel from "./Carousel";
import Button from "../common/Button";

export default function AppOverview({ data }) {
  return (
    <section
      style={{ backgroundImage: data.background }}
      className={styles.sectionWrapper}
    >
      <h3>{data.name}</h3>
      <div className={styles.mainWrapper}>
        <div className={styles.descriptionWrapper}>
          {data.description}
          <div>
            <h4>App was build with these tools:</h4>
            <ul>
              {data.tools.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <a target="_blank" className={styles.center} href={data.link}>
            <Button
              target="_blank"
              Icon={<Icon type="home" />}
              mode="filled"
              size="big"
            >
              App is hosted on Netlify
            </Button>
          </a>
        </div>
        <Carousel items={data.items} />
      </div>
    </section>
  );
}
