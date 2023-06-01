import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { setMessage } from "../../../features/notificationSlice";
import { useNavigate } from "react-router-dom";
import {
  likeBlog,
  deleteBlog,
  createComment,
} from "../../../features/blogsSlice";
import Banner from "../../banner/Banner";

import {
  Box,
  Button,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Blog = () => {
  const { blogId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [comment, setComment] = useState("");
  const blogsInState = useSelector((state) => {
    return state.blogsInState;
  });

  const blog = blogsInState.find((blog) => blog.id === blogId);

  console.log("blogs in state: ", blogsInState);
  console.log("blog found from state: ", blog);

  const token = useSelector((state) => {
    console.log("token: ", state.loginState.token);
    return state.loginState.token;
  });

  const addLike = async (event) => {
    event.preventDefault();
    try {
      const data = { id: blog.id, updatedBlog: blog };
      dispatch(likeBlog(data, token));
      dispatch(setMessage(`Liked "${blog.title}"!`));
      setTimeout(() => {
        dispatch(setMessage(null));
      }, 5000);
    } catch (exception) {
      console.log("Error", exception.response.data);
      dispatch(setMessage(`Error: ${exception.response.data.error}`));
      setTimeout(() => {
        dispatch(setMessage(null));
      }, 5000);
    }
  };

  const addComment = async (event) => {
    const newComment = {
      comment: comment,
    };
    try {
      event.preventDefault();
      dispatch(createComment(blogId, newComment));
      dispatch(setMessage(`Added comment: "${comment}"!`));
      setTimeout(() => {
        dispatch(setMessage(null));
      }, 5000);
      setComment("");
    } catch (exception) {
      console.log("Exception:", exception);
      console.log("Exception:", exception.response.data);
      dispatch(setMessage(exception.response.data));
      setTimeout(() => {
        dispatch(setMessage(null));
      }, 5000);
    }
  };

  const remove = async (event) => {
    event.preventDefault();
    if (window.confirm(`Delete ${blog.title} ?`)) {
      try {
        dispatch(deleteBlog(blog.id, token));
        dispatch(setMessage(`Deleted "${blog.title}"!`));
        navigate("/home");
        setTimeout(() => {
          dispatch(setMessage(null));
        }, 5000);
      } catch (exception) {
        console.log("Error", exception.response.data.error);
        dispatch(setMessage(`Error: ${exception.response.data.error}`));
        setTimeout(() => {
          dispatch(setMessage(null));
        }, 5000);
      }
    }
  };

  const style = {
    p: 10,
    margin: 5,
    borderRadius: 2,
    bgcolor: "#bada55",
  };
  const headerStyle = { p: "10px" };
  const textFieldStyle = { bgcolor: "white", borderRadius: 2, mt: 1, mb: 1 };
  const buttonStyle = { mt: 1, mb: 1, ml: 2 };
  return (
    <Box sx={style}>
      <Banner />
      <Typography variant="h4" sx={headerStyle}>
        {blog.title}
      </Typography>
      <Box className="blog__info">
        <List>
          <ListItem id="url">{blog.url}</ListItem>
          <ListItem id="likes">
            likes {blog.likes}
            <Button
              size="small"
              sx={buttonStyle}
              variant="contained"
              endIcon={<FavoriteIcon />}
              color="success"
              type="button"
              onClick={addLike}
            >
              like
            </Button>
          </ListItem>
          <ListItem id="user">added by {blog.user.name}</ListItem>
        </List>
        <Typography variant="h5">comments</Typography>
        <List>
          {blog.comments.map((comment) => (
            <ListItem key={comment.id}>{comment.comment}</ListItem>
          ))}
        </List>
        <Box component="form" onSubmit={addComment}>
          <TextField
            id="comment"
            sx={textFieldStyle}
            value={comment}
            color="success"
            onChange={(e) => setComment(e.target.value)}
            label="comment"
          />
          <Button
            id="create-button"
            sx={buttonStyle}
            variant="contained"
            color="success"
            type="submit"
          >
            add comment
          </Button>
        </Box>
        <Button
          sx={buttonStyle}
          variant="contained"
          startIcon={<DeleteIcon />}
          color="error"
          type="button"
          onClick={remove}
        >
          remove
        </Button>
      </Box>
    </Box>
  );
};

export default Blog;
