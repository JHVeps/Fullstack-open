import { Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import Country from "../pages/country/Country";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/country/:name" element={<Country />} />
      </Routes>
    </div>
  );
};

export default App;
