import { Box } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginForm from "./components/views/loginform/LoginForm";
import Home from "./components/views/home/Home";
import Users from "./components/views/users/Users";
import User from "./components/views/user/User";
import Blog from "./components/views/blog/Blog";

const App = () => {
  const appStyle = { bgcolor: "#2c2c2c" };
  return (
    <Box sx={appStyle}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/home" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:userId" element={<User />} />
          <Route path="/blogs/:blogId" element={<Blog />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
};

export default App;
