import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../../features/notificationSlice";
import { deleteBlog, likeBlog } from "../../features/blogsSlice";

import "./Blog.css";

const Blog = ({ user, blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  const dispatch = useDispatch();
  const [showAllInfo, setShowAllInfo] = useState(false);

  const token = useSelector((state) => {
    console.log("token: ", state.userInState.token);
    return state.userInState.token;
  });

  const addLike = async (event) => {
    event.preventDefault();
    try {
      const data = { id: blog.id, updatedBlog: blog };
      dispatch(likeBlog(data, token));
      dispatch(setMessage(`Liked "${blog.title}"!`));
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

  const remove = async (event) => {
    event.preventDefault();
    if (window.confirm(`Delete ${blog.title} ?`)) {
      try {
        dispatch(deleteBlog(blog.id, token));
        dispatch(setMessage(`Deleted "${blog.title}"!`));
        setTimeout(() => {
          dispatch(setMessage(null));
        }, 5000);
      } catch (exception) {
        console.log("Error", exception.response.data.error);
        dispatch(setMessage(`Error: ${exception.response.data.error}`));
        setTimeout(() => {
          dispatch(setMessage(null));
        }, 5000);
      }
    }
  };

  const toggleShowAllInfo = (event) => {
    event.preventDefault();
    setShowAllInfo(!showAllInfo);
  };

  if (!blog || !user) {
    return null;
  }

  return (
    <div className="blog" style={blogStyle}>
      {!showAllInfo ? (
        <ul className="blog__info">
          <li>
            {blog.title} by: {blog.author}
            <button
              className="showInfo__button"
              type="button"
              onClick={toggleShowAllInfo}
            >
              view
            </button>
          </li>
        </ul>
      ) : (
        <ul className="blog__info">
          <li id="titleAndAuthor">
            {blog.title} by: {blog.author}
            <button
              className="showInfo__button"
              type="button"
              onClick={() => setShowAllInfo(!showAllInfo)}
            >
              hide
            </button>
          </li>
          <li id="url">{blog.url}</li>
          <li id="likes">
            likes {blog.likes}
            <button className="like__button" type="button" onClick={addLike}>
              like
            </button>
          </li>
          <li id="user">{blog.user.name}</li>
          {user && blog && (
            <li>
              <button className="delete__button" type="button" onClick={remove}>
                remove
              </button>
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Blog;
