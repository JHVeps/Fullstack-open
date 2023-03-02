import { useState, useEffect } from "react";
import blogService from "./services/blogs";
import Notification from "./components/notifications/Notification";
import ErrorNotification from "./components/notifications/ErrorNotification";
import LoginForm from "./components/LoginForm";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [fetcher, setFetcher] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [errorNotificationMessage, setErrorNotificationMessage] =
    useState(null);
  const [showBlogForm, setShowBlogForm] = useState(false);

  const switchBlogFormState = () => {
    setShowBlogForm(!showBlogForm);
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      console.log("response: ", blogs);
      setBlogs(blogs);
    });
  }, [fetcher]);

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
        <button
          className="login__button"
          type="button"
          onClick={() => logout()}
        >
          logout
        </button>
      </p>

      <button type="button" onClick={switchBlogFormState}>
        add new
      </button>
      {showBlogForm && (
        <>
          <h2>create new</h2>
          <BlogForm
            blogs={blogs}
            setBlogs={setBlogs}
            fetcher={fetcher}
            setFetcher={setFetcher}
            setNotificationMessage={setNotificationMessage}
            setErrorNotificationMessage={setErrorNotificationMessage}
            showBlogForm={showBlogForm}
            setShowBlogForm={setShowBlogForm}
          />
        </>
      )}
      {blogs
        .sort(function (a, b) {
          return b.likes - a.likes;
        })
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            fetcher={fetcher}
            setFetcher={setFetcher}
            setNotificationMessage={setNotificationMessage}
            setErrorNotificationMessage={setErrorNotificationMessage}
          />
        ))}
    </div>
  );
};

export default App;
