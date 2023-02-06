import axios from "axios";

const weatherUrl = process.env.REACT_APP_OPEN_WEATHER_MAP_URL;
const api_key = process.env.REACT_APP_API_KEY;

const getCurrentWeather = (lat, long) => {
  const request = axios.get(
    `${weatherUrl}lat=${lat}&lon=${long}&appid=${api_key}&units=metric`
  );
  return request.then((response) => response.data);
};

const exportedObject = {
  getCurrentWeather,
};

export default exportedObject;
