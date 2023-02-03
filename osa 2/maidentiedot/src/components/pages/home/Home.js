import React, { useState, useEffect } from "react";
import countryServices from "../../../services/country.services";
import Header from "../../header/Header";
import Search from "../../search/Search";
import Countries from "../../countries/Countries";

const Home = () => {
  const [countries, setCountries] = useState(null);
  const [countryForSearch, setCountryForSearch] = useState("");

  useEffect(() => {
    countryServices.getAll().then((countries) => {
      setCountries(countries);
    });
  }, []);

  return (
    <div>
      <Header header="Countries information" />
      <Search
        countryForSearch={countryForSearch}
        setCountryForSearch={setCountryForSearch}
      />
      <Countries countries={countries} countryForSearch={countryForSearch} />
    </div>
  );
};

export default Home;
