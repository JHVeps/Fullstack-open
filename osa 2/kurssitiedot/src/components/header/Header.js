import React from "react";

const Header = (props) => {
  console.log("Header props: ", props);
  return <h1>{props.name}</h1>;
};

export default Header;
