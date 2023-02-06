import React from "react";

const Weather = (props) => {
  const { capital } = props;

  console.log("capital: ", capital);

  return <h3>Weather in {capital}</h3>;
};

export default Weather;
