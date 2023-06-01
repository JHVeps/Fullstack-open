import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/loginSlice";
import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import loginService from "../../services/login";
import { setMessage } from "../../features/notificationSlice";
import Notification from "../notifications/Notification";

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

  return (
    <div className="login">
      <h2>blogs</h2>
      <Notification />
      <h2>Login</h2>

      <form className="login__form" onSubmit={handleLogin}>
        <div>
          username
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </div>
  );
};

LoginForm.displayName = "LoginForm";

LoginForm.propTypes = {
  setUser: PropTypes.any,
  setNotificationMessage: PropTypes.any,
  setErrorNotificationMessage: PropTypes.any,
};

export default LoginForm;
