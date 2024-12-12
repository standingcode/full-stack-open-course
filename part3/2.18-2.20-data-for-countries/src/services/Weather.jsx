import axios from "axios";
const weatherAPIKey = import.meta.env.VITE_SOME_KEY;
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?";

const GetWeatherForLatLong = (lat, long) => {
  return axios
    .get(`${baseUrl}lat=${lat}&lon=${long}&units=metric&appid=${weatherAPIKey}`)
    .then((response) => response.data);
};

export default GetWeatherForLatLong;
