import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../../features/notificationSlice";
import { createBlog } from "../../features/blogsSlice";
import { Box, Button, TextField, Typography } from "@mui/material";

const BlogForm = ({ setSortedBlogs, showBlogForm, setShowBlogForm }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const dispatch = useDispatch();

  const token = useSelector((state) => {
    console.log("token: ", state.loginState.token);
    return state.loginState.token;
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

  const textFieldStyle = { bgcolor: "white", borderRadius: 2, mt: 1, mb: 1 };
  const buttonStyle = { mt: 1, mb: 1, ml: 2 };
  return (
    <Box component="form" onSubmit={addBlog}>
      <Typography variant="h5">Create new</Typography>
      <Box>
        <TextField
          sx={textFieldStyle}
          color="success"
          id="title"
          label="title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
      </Box>
      <Box>
        <TextField
          sx={textFieldStyle}
          color="success"
          label="author"
          id="author"
          value={newAuthor}
          onChange={(e) => setNewAuthor(e.target.value)}
        />
      </Box>
      <Box>
        <TextField
          sx={textFieldStyle}
          color="success"
          label="url"
          id="url"
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
        />
      </Box>
      <Box>
        <Button
          sx={buttonStyle}
          id="create-button"
          variant="contained"
          color="success"
          type="submit"
        >
          create
        </Button>
        <Button
          sx={buttonStyle}
          variant="contained"
          color="success"
          onClick={() => setShowBlogForm(!showBlogForm)}
        >
          cancel
        </Button>
      </Box>
    </Box>
  );
};

export default BlogForm;
