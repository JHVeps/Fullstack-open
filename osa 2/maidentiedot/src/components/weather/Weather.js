import React, { useState, useEffect } from "react";
import weatherServices from "../../services/weather.services";

const Weather = (props) => {
  const URL = process.env.REACT_APP_ICON_URL;
  const { capital, capitalInfo } = props;
  const [weather, setWeather] = useState(null);
  const lat = capitalInfo.latlng[0];
  const long = capitalInfo.latlng[1];

  useEffect(() => {
    if (!weather) {
      weatherServices.getCurrentWeather(lat, long).then((weather) => {
        setWeather(weather);
      });
    }
  }, [weather]);

  if (!weather) {
    return <h1>Loading...</h1>;
  }

  const iconUrl = `${URL}${weather.weather[0].icon}@2x.png`;

  return (
    <div>
      <h3>
        Weather in {capital} is {weather.weather[0].main}
      </h3>
      <p>temperature {weather.main.temp}</p>
      <img style={{ height: 200 }} src={iconUrl} alt="..." />
      <p>wind {weather.wind.speed} m/s</p>
    </div>
  );
};

export default Weather;
