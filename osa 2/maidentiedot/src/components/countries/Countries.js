import React from "react";
import Country from "../pages/country/Country";

const Countries = (props) => {
  const { countries, countryForSearch } = props;

  const rowsPerPage = 10;

  console.log("countries: ", countries);
  console.log("country for search:", countryForSearch);

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
          <>
            <p key={country.flag}>
              <Country
                name={country.name.common}
                capital={country.capital}
                area={country.area}
                languages={country.languages}
                flags={country.flags}
              />

              {/* <Link
                style={{ textDecoration: "none" }}
                to={`/country/${country.name.common.toLocaleLowerCase()}`}
              >
                <button>SHOW</button>
              </Link> */}
            </p>
          </>
        ))}
    </>
  );
};

export default Countries;
