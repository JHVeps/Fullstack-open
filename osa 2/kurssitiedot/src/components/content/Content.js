import React from "react";
import Part from "../part/Part";

const Content = (props) => {
  console.log("Content props: ", props);
  return (
    <div>
      {props.parts.map((part) => (
        <Part part={part.name} exercises={part.exercises} key={part.name} />
      ))}
    </div>
  );
};

export default Content;
