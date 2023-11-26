import React from "react";
import AppOverview from "../components/AppOverview/AppOverview";
import bg from "../assets/maxim-hopman-fiXLQXAhCfk-unsplash.jpg";
import Background from "../components/common/Background";

const data = {
  name: "Cryptocurrency App",
  description: (
    <p>
      Application utilizing{" "}
      <a href="https://developers.coinranking.com/api">Coinranking API</a> to
      display information about user's chosen cryptocurrencies. You can explore
      list of the biggest cryptocurrencies by market cap and check individual
      profiles of them, where you can add them to the list of favorites. App
      also supports adding custom cryptocurrencies to the list of favorites. All
      saved cryptocurrencies all saved in the browser.
    </p>
  ),
  tools: ["React", "TypeScript", "React Router", "Styled Components", "Redux"],
  link: "https://elegant-dasik-a33ddd.netlify.app/",
};

export default function CryptoView() {
  return (
    <main>
      <Background background={bg} />
      <AppOverview data={data} />
    </main>
  );
}
