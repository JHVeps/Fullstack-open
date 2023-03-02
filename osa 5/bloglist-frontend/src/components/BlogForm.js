import React, { useState } from "react";
import blogServices from "../services/blogs";
const BlogForm = (props) => {
  const {
    blogs,
    setBlogs,
    setNotificationMessage,
    setErrorNotificationMessage,
    showBlogForm,
    setShowBlogForm,
  } = props;

  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const addBlog = async (event) => {
    event.preventDefault();
    try {
      const blogObject = {
        title: newTitle,
        author: newAuthor,
        url: newUrl,
      };
      const blogObj = await blogServices.create(blogObject);
      setBlogs(blogs.concat(blogObj));
      setNotificationMessage(`Added ${blogObject.title}`);
      setNewTitle("");
      setNewAuthor("");
      setNewUrl("");
      setShowBlogForm(!showBlogForm);
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

  return (
    <form onSubmit={addBlog}>
      <div>
        title:
        <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
      </div>
      <div>
        author:
        <input
          value={newAuthor}
          onChange={(e) => setNewAuthor(e.target.value)}
        />
      </div>
      <div>
        url:
        <input value={newUrl} onChange={(e) => setNewUrl(e.target.value)} />
      </div>
      <div>
        <button type="submit">create</button>
      </div>
      <div>
        <button type="button" onClick={() => setShowBlogForm(!showBlogForm)}>
          cancel
        </button>
      </div>
    </form>
  );
};

export default BlogForm;
