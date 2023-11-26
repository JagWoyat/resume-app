import React from "react";
import Icon from "../common/Icon";
import styles from "./AppOverview.module.css";
import Carousel from "./Carousel";

export default function AppOverview({ data }) {
  return (
    <section
      style={{ backgroundImage: data.background }}
      className={styles.sectionWrapper}
    >
      <h3>{data.name}</h3>
      <div className={styles.mainWrapper}>
        <div>
          {data.description}
          <div>
            <h4>App was build with these tools:</h4>
            <ul>
              {data.tools.map((item) => (
                <li>{item}</li>
              ))}
            </ul>
          </div>
          <a className={styles.linkToApp} href={data.link}>
            <label>App is hosted on Netlify</label>
            <Icon type="home" />
          </a>
        </div>
        <div className={styles.carouselWrapper}>
          <Carousel />
        </div>
      </div>
    </section>
  );
}
