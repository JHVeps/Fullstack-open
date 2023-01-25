import React from "react";

const Filter = (props) => {
  return (
    <div>
      filter shown with:
      <input
        value={props.nameForSearch}
        onChange={(e) => props.setNameForSearch(e.target.value)}
      />
    </div>
  );
};

export default Filter;
