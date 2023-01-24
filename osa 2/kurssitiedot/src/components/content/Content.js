import React from "react";
import Part from "../part/Part";

const Content = (props) => {
  const total = props.parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <div className="content">
      {props.parts.map((part) => (
        <Part part={part.name} exercises={part.exercises} key={part.name} />
      ))}
      <b>total of {total} exercises</b>
    </div>
  );
};

export default Content;
