import axios from "axios";
const WEATHER_API = import.meta.env.VITE_WEATHER_API;

const baseUrl = "https://api.openweathermap.org/data/2.5/weather?";

const GetWeatherForLatLong = (lat, long) => {
  return axios
    .get(`${baseUrl}lat=${lat}&lon=${long}&units=metric&appid=${WEATHER_API}`)
    .then((response) => response.data);
};

export default GetWeatherForLatLong;
