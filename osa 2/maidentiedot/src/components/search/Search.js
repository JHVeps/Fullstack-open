import React from "react";

const Search = (props) => {
  const { countryForSearch, setCountryForSearch } = props;
  return (
    <div>
      find countries:
      <input
        value={countryForSearch}
        onChange={(e) => setCountryForSearch(e.target.value)}
      />
    </div>
  );
};

export default Search;
