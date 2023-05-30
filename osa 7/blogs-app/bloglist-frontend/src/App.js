import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./features/userSlice";
import { initializeBlogs } from "./features/blogsSlice";
import Notification from "./components/notifications/Notification";
import LoginForm from "./components/loginform/LoginForm";
import BlogForm from "./components/blogform/BlogForm";
import Blog from "./components/blog/Blog";

const App = () => {
  const dispatch = useDispatch();
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [fetcher, setFetcher] = useState(false);
  const blogs = useSelector((state) => {
    console.log("state.blogsInState: ", state.blogsInState);
    return state.blogsInState;
  });
  const notification = useSelector((state) => {
    console.log("state.notification: ", state.notification);
    return state.notification;
  });

  const userInState = useSelector((state) => {
    console.log("state.userInState: ", state.userInState);
    return state.userInState;
  });

  const switchBlogFormState = () => {
    setShowBlogForm(!showBlogForm);
  };

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);

      const userState = {
        userInfo: user,
        token: user.token,
      };

      dispatch(setUser(userState));
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

  console.log("state.blogsInState: ", blogs);
  console.log("state.notification: ", notification);
  console.log("state.userInState: ", userInState);

  if (
    !userInState.user ||
    !userInState.user.userInfo ||
    !userInState.user.userInfo.username
  ) {
    return (
      <div className="app">
        <h2>blogs</h2>
        <Notification />
        <h2>Login</h2>
        <LoginForm />
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
      {userInState.user && (
        <p>
          {userInState.user.userInfo.username} logged in
          <button
            className="login__button"
            type="button"
            onClick={() => logout()}
          >
            logout
          </button>
        </p>
      )}
      <button type="button" onClick={switchBlogFormState}>
        add new
      </button>
      {showBlogForm && (
        <>
          <BlogForm
            showBlogForm={showBlogForm}
            setShowBlogForm={setShowBlogForm}
            fetcher={fetcher}
            setFetcher={setFetcher}
          />
        </>
      )}
      {sortedBlogs.map((blog) => (
        <Blog key={blog.id} blog={blog} user={userInState.user} />
      ))}
    </div>
  );
};

export default App;
