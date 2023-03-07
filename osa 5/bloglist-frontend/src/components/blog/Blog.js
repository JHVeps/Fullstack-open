import { useState } from "react";
import blogServices from "../../services/blogs";
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
    user,
    blog,
    fetcher,
    setFetcher,
    addLike,
    setNotificationMessage,
    setErrorNotificationMessage,
  } = props;

  //Commented out for 5.15 assignment to work. Same addLike comes as props.
  // const addLike = async (event) => {
  //   event.preventDefault();
  //   try {
  //     const blogObject = {
  //       title: blog.title,
  //       author: blog.author,
  //       url: blog.url,
  //       likes: blog.likes + 1,
  //     };
  //     await blogServices.update(blog.id, blogObject);
  //     setFetcher(!fetcher);
  //     setNotificationMessage(`Liked "${blogObject.title}"!`);
  //     setTimeout(() => {
  //       setNotificationMessage(null);
  //     }, 5000);
  //   } catch (exception) {
  //     console.log("Error", exception.response.data);
  //     setErrorNotificationMessage(exception.response.data);
  //     setTimeout(() => {
  //       setErrorNotificationMessage(null);
  //     }, 5000);
  //   }
  // };

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

  const toggleShowAllInfo = (event) => {
    event.preventDefault();
    setShowAllInfo(!showAllInfo);
  };

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
          {user.id === blog.user.id ? (
            <li>
              <button className="delete__button" type="button" onClick={remove}>
                remove
              </button>
            </li>
          ) : null}
        </ul>
      )}
    </div>
  );
};

export default Blog;
