import React from "react";

const Filter = (props) => {
  const { nameForSearch, setNameForSearch } = props;
  return (
    <div>
      filter shown with:
      <input
        value={nameForSearch}
        onChange={(e) => setNameForSearch(e.target.value)}
      />
    </div>
  );
};

export default Filter;
