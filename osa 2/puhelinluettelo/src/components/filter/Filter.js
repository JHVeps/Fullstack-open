import React from "react";

const Filter = (props) => {
  return (
    <div>
      filter shown with:
      <input
        value={props.searchText}
        onChange={(e) => props.setSearchText(e.target.value)}
      />
    </div>
  );
};

export default Filter;
