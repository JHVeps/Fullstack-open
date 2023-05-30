import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../../features/notificationSlice";
import { createBlog } from "../../features/blogsSlice";

const BlogForm = ({ setSortedBlogs, showBlogForm, setShowBlogForm }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const dispatch = useDispatch();

  const token = useSelector((state) => {
    console.log("token: ", state.userInState.token);
    return state.userInState.token;
  });
  const addBlog = async (event) => {
    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    };
    try {
      event.preventDefault();
      dispatch(createBlog(newBlog, token));
      dispatch(setMessage(`Added "${newTitle}"!`));
      setShowBlogForm(!showBlogForm);
      setTimeout(() => {
        dispatch(setMessage(null));
      }, 5000);
      setNewTitle("");
      setNewAuthor("");
      setNewUrl("");
    } catch (exception) {
      console.log("Exception:", exception);
      console.log("Exception:", exception.response.data);
      dispatch(setMessage(exception.response.data));
      setTimeout(() => {
        dispatch(setMessage(null));
      }, 5000);
    }
  };

  return (
    <div className="blogForm__container">
      <h2>Create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            id="title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="title..."
          />
        </div>
        <div>
          author:
          <input
            id="author"
            value={newAuthor}
            onChange={(e) => setNewAuthor(e.target.value)}
            placeholder="author..."
          />
        </div>
        <div>
          url:
          <input
            id="url"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            placeholder="url..."
          />
        </div>
        <div>
          <button id="create-button" className="create__button" type="submit">
            create
          </button>
        </div>
        <div>
          <button
            className="cancel__button"
            type="button"
            onClick={() => setShowBlogForm(!showBlogForm)}
          >
            cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
