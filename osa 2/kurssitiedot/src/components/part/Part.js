import React from "react";

const Part = (props) => {
  return (
    <div className="part">
      <p>
        {props.part} {props.exercises}
      </p>
    </div>
  );
};

export default Part;
