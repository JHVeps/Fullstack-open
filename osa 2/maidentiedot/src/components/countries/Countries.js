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
