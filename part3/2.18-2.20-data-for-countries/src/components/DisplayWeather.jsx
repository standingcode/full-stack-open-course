import GetWeatherForLatLong from "../services/Weather";

const DisplayWeather = ({ weather, capital }) => {
  if (weather == null) {
    return <div></div>;
  }

  return (
    <>
      <h1>Weather in {capital}</h1>
      <div>Temperature {weather.main.temp} Celcius</div>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        width="200"
      />
      <div>Wind {weather.wind.speed} m/s</div>
    </>
  );
};

export default DisplayWeather;
