import GetWeatherForLatLong from "../services/Weather";

const DisplayWeather = ({ weather, capital }) => {
  if (weather == null) {
    return <div></div>;
  }

  return (
    <>
      <h1>Weather in {capital}</h1>
      <div>{weather.main.temp}</div>
    </>
  );
};

export default DisplayWeather;
