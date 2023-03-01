import { useState, useEffect } from "react";
import blogService from "./services/blogs";
import Notification from "./components/notifications/Notification";
import ErrorNotification from "./components/notifications/ErrorNotification";
import LoginForm from "./components/LoginForm";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [errorNotificationMessage, setErrorNotificationMessage] =
    useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      setBlogs(blogs);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  if (!user) {
    return (
      <div>
        <h2>blogs</h2>
        <Notification message={notificationMessage} />
        <ErrorNotification message={errorNotificationMessage} />
        <h2>Login</h2>
        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          setUser={setUser}
          setNotificationMessage={setNotificationMessage}
          setErrorNotificationMessage={setErrorNotificationMessage}
        />
      </div>
    );
  }
  const logout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    window.location.reload();
  };

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notificationMessage} />
      <ErrorNotification message={errorNotificationMessage} />
      <p>
        {user.username} logged in
        <button onClick={() => logout()}>logout</button>
      </p>
      <h2>create new</h2>
      <BlogForm
        blogs={blogs}
        setBlogs={setBlogs}
        newTitle={newTitle}
        setNewTitle={setNewTitle}
        newAuthor={newAuthor}
        setNewAuthor={setNewAuthor}
        newUrl={newUrl}
        setNewUrl={setNewUrl}
        setNotificationMessage={setNotificationMessage}
        setErrorNotificationMessage={setErrorNotificationMessage}
      />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
