import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initializeBlogs } from "../../features/blogsSlice";
import BlogForm from "../blogform/BlogForm";
import Blog from "../blog/Blog";
import Banner from "../banner/Banner";
import { Link } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();

  const [showBlogForm, setShowBlogForm] = useState(false);
  const blogs = useSelector((state) => {
    console.log("state.blogsInState: ", state.blogsInState);
    return state.blogsInState;
  });
  const notification = useSelector((state) => {
    console.log("state.notification: ", state.notification);
    return state.notification;
  });

  const userInState = useSelector((state) => {
    console.log("state.userInState: ", state.userInState);
    return state.userInState;
  });

  const switchBlogFormState = () => {
    setShowBlogForm(!showBlogForm);
  };

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

  console.log("state.blogsInState: ", blogs);
  console.log("state.notification: ", notification);
  console.log("state.userInState: ", userInState);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  return (
    <div>
      <Banner />
      <button type="button" onClick={switchBlogFormState}>
        add new
      </button>
      <button type="button">
        <Link
          style={{
            textDecoration: "none",
          }}
          to="/users"
        >
          users
        </Link>
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
        <Blog key={blog.id} blog={blog} user={userInState.user} />
      ))}
    </div>
  );
};

export default Home;
