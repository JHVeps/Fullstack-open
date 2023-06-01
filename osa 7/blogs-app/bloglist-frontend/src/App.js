import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginForm from "./components/views/loginform/LoginForm";
import Home from "./components/views/home/Home";
import Users from "./components/views/users/Users";
import User from "./components/views/user/User";
import Blog from "./components/views/blog/Blog";

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/home" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:userId" element={<User />} />
          <Route path="/blogs/:blogId" element={<Blog />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
