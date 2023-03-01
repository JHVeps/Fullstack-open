import React from "react";
import loginService from "../services/login";
import blogServices from "../services/blogs";

const LoginForm = (props) => {
  const {
    setUser,
    username,
    setUsername,
    password,
    setPassword,
    setNotificationMessage,
    setErrorNotificationMessage,
  } = props;

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
      setUsername("");
      setPassword("");
      setNotificationMessage(`User ${user.username} logged in successfully`);
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    } catch (exception) {
      console.log("Error: ", exception.response.data);
      setErrorNotificationMessage(exception.response.data);
      setUsername("");
      setPassword("");
      setTimeout(() => {
        setErrorNotificationMessage(null);
      }, 5000);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
};

export default LoginForm;
