import React, { useState, forwardRef } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import loginService from "../../services/login";
import blogServices from "../../services/blogs";
import { setMessage } from "../../features/notificationSlice";

const LoginForm = forwardRef((props, ref) => {
  const { setUser } = props;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogServices.setToken(user.token);
      setUser(user);
      console.log("user id: ", user.id);
      setUsername("");
      setPassword("");
      dispatch(setMessage(`User ${user.name} logged in successfully`));
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
    <form className="loginform" onSubmit={handleLogin} ref={ref}>
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
  );
});

LoginForm.displayName = "LoginForm";

LoginForm.propTypes = {
  setUser: PropTypes.any,
  setNotificationMessage: PropTypes.any,
  setErrorNotificationMessage: PropTypes.any,
};

export default LoginForm;
