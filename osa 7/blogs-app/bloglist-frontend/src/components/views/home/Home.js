import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initializeBlogs } from "../../../features/blogsSlice";
import BlogForm from "../../blogform/BlogForm";
import Blog from "../../blog/Blog";
import Banner from "../../banner/Banner";
import { Box, Button } from "@mui/material";

const Home = () => {
  const dispatch = useDispatch();
  const [showBlogForm, setShowBlogForm] = useState(false);
  const blogs = useSelector((state) => {
    return state.blogsInState;
  });

  const switchBlogFormState = () => {
    setShowBlogForm(!showBlogForm);
  };

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

  console.log("state.blogsInState: ", blogs);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  const homeStyle = {
    p: 10,
    margin: 5,
    borderRadius: 2,
    bgcolor: "#bada55",
  };

  const buttonStyle = { mt: 2, mb: 2 };

  return (
    <Box sx={homeStyle}>
      <Banner />
      <Button
        sx={buttonStyle}
        variant="contained"
        color="success"
        size="large"
        onClick={switchBlogFormState}
      >
        create new
      </Button>

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
    </Box>
  );
};

export default Home;
