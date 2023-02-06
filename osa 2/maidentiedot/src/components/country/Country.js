import React, { useState } from "react";
import Weather from "../weather/Weather";

const Country = (props) => {
  const { name, capital, area, languages, flags, capitalInfo } = props;
  const [showInfo, setShowInfo] = useState(false);

  const handleShowInfo = () => {
    setShowInfo(!showInfo);
  };

  return (
    <div>
      <div>
        {name} <button onClick={handleShowInfo}>SHOW</button>
      </div>

      {showInfo && (
        <div>
          <h1>{name}</h1>
          <>
            {capital.map((cityName) => (
              <h3 key={cityName}>{cityName}</h3>
            ))}
          </>
          <p>Area: {area}</p>
          <h3>languages:</h3>
          <p>
            {Object.values(languages).map((language) => (
              <li key={language}>{language}</li>
            ))}
          </p>
          <img style={{ height: 70 }} src={flags.png} alt="..." />
          <>
            {capital.map((cityName) => (
              <div key={cityName}>
                <Weather capital={cityName} capitalInfo={capitalInfo} />
              </div>
            ))}
          </>
        </div>
      )}
    </div>
  );
};

export default Country;
