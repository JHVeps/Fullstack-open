import React from "react";
import { Link } from "react-router-dom";

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
          <>
            <p key={country.flag}>
              {country.name.common}

              <Link
                style={{ textDecoration: "none" }}
                to={`/country/${country.name.common.toLocaleLowerCase()}`}
              >
                <button>SHOW</button>
              </Link>
            </p>
          </>
        ))}
    </>
  );
};

export default Countries;
