import { useState } from "react";
import blogServices from "../services/blogs";
import "./Blog.css";

const Blog = (props) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const {
    blog,
    fetcher,
    setFetcher,
    setNotificationMessage,
    setErrorNotificationMessage,
  } = props;

  const addLike = async (event) => {
    event.preventDefault();
    try {
      const blogObject = {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes + 1,
      };
      await blogServices.update(blog.id, blogObject);
      setFetcher(!fetcher);
      setNotificationMessage(`Liked "${blogObject.title}"!`);
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

  const remove = async (event) => {
    event.preventDefault();
    if (window.confirm(`Delete ${blog.title} ?`)) {
      try {
        await blogServices.remove(blog.id);
        setFetcher(!fetcher);
        setNotificationMessage(`Deleted "${blog.title}"!`);
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
    }
  };

  const [showAllInfo, setShowAllInfo] = useState(false);
  return (
    <div style={blogStyle}>
      {!showAllInfo ? (
        <ul className="blog__info">
          <li>
            {blog.title} by: {blog.author}
            <button
              className="showInfo__button"
              type="button"
              onClick={() => setShowAllInfo(!showAllInfo)}
            >
              view
            </button>
          </li>
        </ul>
      ) : (
        <ul className="blog__info">
          <li>
            {blog.title} by: {blog.author}
            <button
              className="showInfo__button"
              type="button"
              onClick={() => setShowAllInfo(!showAllInfo)}
            >
              hide
            </button>
          </li>
          <li>{blog.url}</li>
          <li>
            likes {blog.likes}
            <button className="like__button" type="button" onClick={addLike}>
              like
            </button>
          </li>
          <li>{blog.user.name}</li>
          <li>
            <button className="delete__button" type="button" onClick={remove}>
              remove
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Blog;
