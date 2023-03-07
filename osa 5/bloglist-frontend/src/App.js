import { useState, useEffect } from "react";
import blogService from "./services/blogs";
import Notification from "./components/notifications/Notification";
import ErrorNotification from "./components/notifications/ErrorNotification";
import LoginForm from "./components/loginform/LoginForm";
import Blog from "./components/blog/Blog";
import BlogForm from "./components/blogform/BlogForm";

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

  //createBlog is here because of assignment 5.16 implementation.
  const createBlog = async (blogObject) => {
    try {
      await blogService.create(blogObject);
      setFetcher(!fetcher);
      setNotificationMessage(`Added ${blogObject.title}`);
      setShowBlogForm(!showBlogForm);
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    } catch (exception) {
      console.log("Error", exception.response.data);
      setErrorNotificationMessage(exception.response.data);
      setTimeout(() => {
        setErrorNotificationMessage(null);
      }, 5000);
    }
  };

  //addLike is here because of assignment 5.15 implementation.
  const addLike = async (id) => {
    try {
      const blogObject = blogs.find((b) => b.id === id);
      const newBlogObject = {
        ...blogObject,
        likes: blogObject.likes + 1,
      };
      await blogService.update(blogObject.id, newBlogObject);
      setFetcher(!fetcher);
    } catch (exception) {
      console.log("Error", exception.response.data);
      setErrorNotificationMessage(exception.response.data);
      setTimeout(() => {
        setErrorNotificationMessage(null);
      }, 5000);
    }
  };

  if (!user) {
    return (
      <div className="app">
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
    <div className="app">
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
          <BlogForm
            createBlog={createBlog}
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
            addLike={() => addLike(blog.id)}
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
