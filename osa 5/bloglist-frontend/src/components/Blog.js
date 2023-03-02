import { useState } from "react";
import blogServices from "../services/blogs";
import "./Blog.css";

const Blog = ({
  blog,
  fetcher,
  setFetcher,
  setNotificationMessage,
  setErrorNotificationMessage,
}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  // const [newTitle, setNewTitle] = useState("");
  // const [newAuthor, setNewAuthor] = useState("");
  // const [newUrl, setNewUrl] = useState("");
  // const [newLikes, setNewLikes] = useState("");

  const addLike = async (event) => {
    event.preventDefault();
    try {
      const blogObject = {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes + 1,
      };
      const blogObj = await blogServices.update(blog.id, blogObject);
      setFetcher(!fetcher);
      console.log("blogObj", blogObj);
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

  const [showAllInfo, setShowAllInfo] = useState(false);
  return (
    <div style={blogStyle}>
      {!showAllInfo ? (
        <ul className="blog__info">
          <li>
            {blog.title} {blog.author}
            <button type="button" onClick={() => setShowAllInfo(!showAllInfo)}>
              view
            </button>
          </li>
        </ul>
      ) : (
        <ul className="blog__info">
          <li>
            {blog.title} {blog.author}
            <button type="button" onClick={() => setShowAllInfo(!showAllInfo)}>
              hide
            </button>
          </li>
          <li>{blog.url}</li>
          <li>
            likes {blog.likes}
            <button type="button" onClick={addLike}>
              like
            </button>
          </li>
          <li>{blog.user.name}</li>
        </ul>
      )}
    </div>
  );
};

export default Blog;
