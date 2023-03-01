import { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import blogService from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");

  useEffect(() => {
    const getBlogs = async () => {
      const blogs = await blogService.getAll();
      setBlogs(blogs.data);
    };
    getBlogs();

    return () => {};
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
        <h2>Login</h2>
        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          setUser={setUser}
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
      <p>
        {user.username} logged in
        <button onClick={() => logout()}>logout</button>
      </p>
      <h2>create new</h2>
      <BlogForm
        user={user}
        setBlogs={setBlogs}
        newTitle={newTitle}
        setNewTitle={setNewTitle}
        newAuthor={newAuthor}
        setNewAuthor={setNewAuthor}
        newUrl={newUrl}
        setNewUrl={setNewUrl}
      />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
