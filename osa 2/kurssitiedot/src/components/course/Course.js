import React from "react";
import Header from "../header/Header";
import Content from "../content/Content";

const Course = (props) => {
  return (
    <div className="course">
      <Header name={props.course.name} />
      <Content parts={props.course.parts} />
    </div>
  );
};

export default Course;
