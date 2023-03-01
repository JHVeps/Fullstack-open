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

      window.location.reload();
      setBlogs(blogs.concat(blogObj.data));
      setNewTitle("");
      setNewAuthor("");
      setNewUrl("");
    } catch (exception) {}
  };

  return (
    <form onSubmit={addBlog}>
      <div>
        name:
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
