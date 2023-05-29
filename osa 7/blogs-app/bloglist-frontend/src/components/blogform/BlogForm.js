import React, { useState } from "react";
const BlogForm = (props) => {
  const { showBlogForm, setShowBlogForm, createBlog } = props;

  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    });

    setNewTitle("");
    setNewAuthor("");
    setNewUrl("");
  };

  //Commented out for assignment 5.16 implementation to work

  // const addBlog = async (event) => {
  //   event.preventDefault();

  //   try {
  //     const blogObject = {
  //       title: newTitle,
  //       author: newAuthor,
  //       url: newUrl,
  //     };
  //     await blogServices.create(blogObject);
  //     setFetcher(!fetcher);
  //     setNotificationMessage(`Added ${blogObject.title}`);
  //     setNewTitle("");
  //     setNewAuthor("");
  //     setNewUrl("");
  //     setShowBlogForm(!showBlogForm);
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
