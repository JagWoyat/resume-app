import AppOverview from "../components/AppOverview/AppOverview";
import bg from "../assets/wolfgang-hasselmann-bR_-gllg7Bs-unsplash.jpg";
import placeholder from "../assets/weather-placeholder.jpg";
import Background from "../components/common/Background";

import weather1 from "../assets/weather-app1.png";
import weather2 from "../assets/weather-app2.png";
import weather3 from "../assets/weather-app3.png";

const data = {
  name: "Weather App",
  description: (
    <p>
      Application utilizing{" "}
      <a href="https://openweathermap.org/api">OpenWeather</a> to display
      information about current and forecasted weather for user's chosen city.
      Typing in name of the city gives a list of relevant options. Choosing one,
      fetches weather data for next 5 days with 3 hour interval.
    </p>
  ),
  tools: ["React", "React Router", "Redux"],
  link: "https://wondrous-mochi-33061b.netlify.app/",
  items: [
    {
      id: "1",
      icon: weather1,
    },
    {
      id: "2",
      icon: weather2,
    },
    {
      id: "3",
      icon: weather3,
    },
  ],
};

export default function WeatherView() {
  return (
    <main>
      <Background placeholder={placeholder} background={bg} />
      <AppOverview data={data} />
    </main>
  );
}
