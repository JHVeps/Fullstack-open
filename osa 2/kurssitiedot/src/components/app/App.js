import { data } from "../../data/data";
import Course from "../course/Course";

const App = () => {
  const course = data;
  return (
    <div className="App">
      <Course course={course} />
    </div>
  );
};

export default App;
