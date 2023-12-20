import AppOverview from "../components/AppOverview/AppOverview";
import bg from "../assets/wolfgang-hasselmann-bR_-gllg7Bs-unsplash.jpg";
import Background from "../components/common/Background";

const data = {
  name: "Weather App",
  description: (
    <p>
      Application utilizing{" "}
      <a href="https://openweathermap.org/api">OpenWeather</a> to display
      information about user's chosen city's weather. You can explore list of
      the biggest cryptocurrencies by market cap and check individual profiles
      of them, where you can add them to the list of favorites. App also
      supports adding custom cryptocurrencies to the list of favorites. All
      saved cryptocurrencies all saved in the browser.
    </p>
  ),
  tools: ["React", "React Router", "Redux"],
  link: "https://wondrous-mochi-33061b.netlify.app/",
};

export default function WeatherView() {
  return (
    <main>
      <Background background={bg} />
      <AppOverview data={data} />
    </main>
  );
}
