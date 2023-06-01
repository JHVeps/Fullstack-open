import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initializeBlogs } from "../../../features/blogsSlice";
import BlogForm from "../../blogform/BlogForm";
import Blog from "../../blog/Blog";
import Banner from "../../banner/Banner";

const Home = () => {
  const dispatch = useDispatch();

  const [showBlogForm, setShowBlogForm] = useState(false);
  const blogs = useSelector((state) => {
    return state.blogsInState;
  });
  const notification = useSelector((state) => {
    return state.notification;
  });

  const switchBlogFormState = () => {
    setShowBlogForm(!showBlogForm);
  };

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

  console.log("state.blogsInState: ", blogs);
  console.log("state.notification: ", notification);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  return (
    <div>
      <Banner />
      <button type="button" onClick={switchBlogFormState}>
        create new
      </button>

      {showBlogForm && (
        <>
          <BlogForm
            showBlogForm={showBlogForm}
            setShowBlogForm={setShowBlogForm}
          />
        </>
      )}
      {sortedBlogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default Home;
