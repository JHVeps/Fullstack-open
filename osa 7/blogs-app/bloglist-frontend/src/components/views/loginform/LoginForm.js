import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../../features/loginSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginService from "../../../services/login";
import { setMessage } from "../../../features/notificationSlice";
import Notification from "../../notifications/Notification";
import { Box, Button, TextField, Typography } from "@mui/material";

const LoginForm = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);

      const userState = {
        user: user,
        token: user.token,
      };

      dispatch(setUser(userState));
    }
  }, [dispatch]);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

      dispatch(setUser(user));

      console.log("user id: ", user.id);
      setUsername("");
      setPassword("");
      navigate("/home");
      dispatch(setMessage(`User ${user.username} logged in successfully`));
      setTimeout(() => {
        dispatch(setMessage(null));
      }, 5000);
    } catch (exception) {
      console.log("Error: ", exception.response.data);
      dispatch(setMessage(`Error: ${exception.response.data.error}`));
      setUsername("");
      setPassword("");
      setTimeout(() => {
        dispatch(setMessage(null));
      }, 5000);
    }
  };
  const style = { textAlign: "center", color: "white" };
  const headerStyle = {
    color: "white",
    textAlign: "center",
    p: "10px",
    mt: 5,
    mb: 5,
  };
  const textFieldStyle = { bgcolor: "white", borderRadius: 2, mt: 1, mb: 1 };
  const buttonStyle = { mt: 1, mb: 1, ml: 2 };
  return (
    <Box sx={style}>
      <Typography variant="h3" sx={headerStyle}>
        Blogs app
      </Typography>
      <Notification />
      <Typography variant="h5">Login</Typography>

      <Box component="form" onSubmit={handleLogin}>
        <Box>
          <TextField
            required
            sx={textFieldStyle}
            color="success"
            id="username"
            type="text"
            label="username"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </Box>
        <Box>
          <TextField
            required
            sx={textFieldStyle}
            color="success"
            id="password"
            type="password"
            label="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </Box>
        <Button
          id="login-button"
          sx={buttonStyle}
          size="large"
          variant="contained"
          color="success"
          type="submit"
        >
          login
        </Button>
      </Box>
    </Box>
  );
};

LoginForm.displayName = "LoginForm";

export default LoginForm;
