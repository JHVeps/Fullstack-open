import React from "react";
import Country from "../country/Country";

const Countries = (props) => {
  const { countries, countryForSearch } = props;
  const rowsPerPage = 10;

  if (!countries) {
    return <h1>Loading...</h1>;
  }

  if (countryForSearch === "") {
    return <p>Too many matches, specify another filter</p>;
  }

  return (
    <>
      {countries
        .filter((country) => {
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
          <div key={country.flag}>
            <Country
              name={country.name.common}
              capital={country.capital}
              area={country.area}
              languages={country.languages}
              flags={country.flags}
              capitalInfo={country.capitalInfo}
            />
          </div>
        ))}
    </>
  );
};

export default Countries;
