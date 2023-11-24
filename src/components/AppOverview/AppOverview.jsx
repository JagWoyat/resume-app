import React from "react";
import Icon from "../common/Icon";

export default function AppOverview() {
  return (
    <section>
      <div>
        <h3>Cryptocurrency App</h3>
        <p>
          Application utilizing{" "}
          <a href="https://developers.coinranking.com/api">Coinranking API</a>{" "}
          to display information about user's chosen cryptocurrencies. You can
          explore list of the biggest cryptocurrencies by market cap and check
          individual profiles of them, where you can add them to the list of
          favorites. App also supports adding custom cryptocurrencies to the
          list of favorites. All saved cryptocurrencies all saved in the
          browser.
        </p>
        <p>
          App was build with these tools:
          <ul>
            <li>React</li>
            <li>TypeScript</li>
            <li>React Router</li>
            <li>Styled Components</li>
            <li>Redux</li>
          </ul>
        </p>
      </div>
      <div>
        <div>Carousel with images</div>
        <a href="https://elegant-dasik-a33ddd.netlify.app/">
          <label>App is hosted on Netlify</label>
          <Icon type="home" />
        </a>
      </div>
    </section>
  );
}
