import React from "react";
import blogServices from "../services/blogs";
const BlogForm = (props) => {
  const {
    blogs,
    setBlogs,
    newTitle,
    setNewTitle,
    newAuthor,
    setNewAuthor,
    newUrl,
    setNewUrl,
    setNotificationMessage,
    setErrorNotificationMessage,
  } = props;
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
    </form>
  );
};

export default BlogForm;
