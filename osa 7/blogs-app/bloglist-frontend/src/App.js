import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginForm from "./components/loginform/LoginForm";
import Home from "./components/home/Home";
import Users from "./components/users/Users";

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/home" element={<Home />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
