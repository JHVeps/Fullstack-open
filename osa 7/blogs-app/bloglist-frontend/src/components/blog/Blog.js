import { Link } from "react-router-dom";

import "./Blog.css";

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  if (!blog) {
    return null;
  }

  return (
    <div className="blog" style={blogStyle}>
      <ul className="blog__info">
        <li>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </li>
      </ul>
    </div>
  );
};

export default Blog;
