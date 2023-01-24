import { data } from "../../data/data";
import Course from "../course/Course";

const App = () => {
  const course = data;
  return (
    <div className="App">
      {course.map((courses) => (
        <Course course={courses} key={courses.id} />
      ))}
    </div>
  );
};

export default App;
