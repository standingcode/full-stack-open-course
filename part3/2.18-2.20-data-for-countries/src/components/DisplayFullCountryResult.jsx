import DisplayWeather from "./DisplayWeather";
import { useState, useEffect } from "react";
import GetWeatherForLatLong from "../services/Weather";

const DisplayFullCountryResult = ({ country }) => {
  const [weatherInfo, setWeatherInfo] = useState(null);

  useEffect(() => {
    GetWeatherForLatLong(
      country.capitalInfo.latlng[0],
      country.capitalInfo.latlng[1]
    )
      .then((data) => {
        console.log(data);
        setWeatherInfo(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h2>
        {country.name.common} ({country.name.official})
      </h2>

      <div>Capital {country.capital[0]}</div>
      <div>Area {country.area} km2</div>

      <h2>languages:</h2>
      <p>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </p>
      <img src={country.flags.svg} width="200" />
      <DisplayWeather weather={weatherInfo} capital={country.capital[0]} />
    </div>
  );
};

export default DisplayFullCountryResult;
