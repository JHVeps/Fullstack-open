import React from "react";

const Countries = (props) => {
  const { countries, countryForSearch } = props;
  const rowsPerPage = 10;

  console.log("country for search:", countryForSearch);

  if (countryForSearch === "") {
    return <p>Too many matches, specify another filter</p>;
  }

  return (
    <>
      {countries
        .filter((country) => {
          if (
            countryForSearch.toLowerCase() === country.name.common.toLowerCase()
          ) {
            return (
              <>
                <h1>{country.name.common}</h1>
                <p>
                  {country.capital.map((cityName) => (
                    <li key={cityName}>{cityName}</li>
                  ))}
                  }
                </p>
                <p>area {country.area}</p>
                <h4>languages</h4>
                {/* <p>
                  {country.languages.map((language) => (
                    <li key={language}>{language}</li>
                  ))}
                  }
                </p> */}
                <img style={{ height: 50 }} src={country.flags.png} alt="..." />
              </>
            );
          }
          if (
            country.name.common
              .toLocaleLowerCase()
              .includes(countryForSearch.toLocaleLowerCase())
          ) {
            return country;
          }
          return null;
        })
        .slice()
        .slice(0, rowsPerPage)

        .map((country) => (
          <p key={country.flag}>{country.name.common}</p>
        ))}
    </>
  );
};

export default Countries;
