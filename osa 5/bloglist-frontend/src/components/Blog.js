import { useState } from "react";
import "./Blog.css";

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
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
            likes {blog.likes} <button type="button">like</button>
          </li>
          <li>{blog.user.name}</li>
        </ul>
      )}
    </div>
  );
};

export default Blog;
