import React, { useState, useEffect } from "react";
import countryServices from "../../../services/country.services";
import { useParams } from "react-router-dom";

const Country = () => {
  const { name } = useParams();
  const [countryData, setCountryData] = useState(null);

  useEffect(() => {
    countryServices.getCountryByName(name).then((data) => {
      setCountryData(data);
    });
  }, [name]);

  if (!countryData) {
    return null;
  }

  console.log("Country data: ", countryData);

  return (
    <>
      {countryData.map((country) => (
        <div key={country.flag}>
          <h1>{country.name.common}</h1>
          <>
            {country.capital.map((cityName) => (
              <h3 key={cityName}>{cityName}</h3>
            ))}
          </>
          <p>Area: {country.area}</p>
          <h3>languages:</h3>
          <p>
            {Object.values(country.languages).map((language) => (
              <li key={language}>{language}</li>
            ))}
          </p>
          <img style={{ height: 70 }} src={country.flags.png} alt="..." />
        </div>
      ))}
    </>
  );
};

export default Country;
