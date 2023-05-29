import { useState, useEffect } from "react";
import blogService from "./services/blogs";
import { useDispatch } from "react-redux";
import Notification from "./components/notifications/Notification";
import LoginForm from "./components/loginform/LoginForm";
import Blog from "./components/blog/Blog";
import BlogForm from "./components/blogform/BlogForm";
import { setMessage } from "./features/notificationSlice";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [fetcher, setFetcher] = useState(false);
  const [showBlogForm, setShowBlogForm] = useState(false);
  const dispatch = useDispatch();
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
      dispatch(setMessage(`Added ${blogObject.title}`));
      setShowBlogForm(!showBlogForm);
      setTimeout(() => {
        dispatch(setMessage(null));
      }, 5000);
    } catch (exception) {
      console.log("Error", exception.response.data);
      dispatch(setMessage(`Error: ${exception.response.data.error}`));
      setTimeout(() => {
        dispatch(setMessage(null));
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
      dispatch(setMessage(`Error: ${exception.response.data.error}`));
      setTimeout(() => {
        dispatch(setMessage(null));
      }, 5000);
    }
  };

  if (!user) {
    return (
      <div className="app">
        <h2>blogs</h2>
        <Notification />
        <h2>Login</h2>
        <LoginForm setUser={setUser} />
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
      <Notification />
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
            user={user}
            addLike={() => addLike(blog.id)}
            fetcher={fetcher}
            setFetcher={setFetcher}
          />
        ))}
    </div>
  );
};

export default App;
