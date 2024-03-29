import { createSlice } from "@reduxjs/toolkit";
import {
  getAllBlogs,
  createNewBlog,
  createNewComment,
  updateBlog,
  removeBlog,
} from "../services/blogs";

const initialState = [];

const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload);
    },
    setBlogs(state, action) {
      return action.payload;
    },
  },
});

export const { appendBlog, appendComment, setBlogs } = blogsSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await getAllBlogs();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (content, token) => {
  return async (dispatch) => {
    const newBlog = await createNewBlog(content, token);
    dispatch(appendBlog(newBlog));
  };
};

export const createComment = (id, comment) => {
  return async (dispatch) => {
    await createNewComment(id, comment);
    const blogs = await getAllBlogs();
    dispatch(setBlogs(blogs));
  };
};

export const likeBlog = (data, token) => {
  return async (dispatch) => {
    const likedBlog = {
      ...data.updatedBlog,
      likes: data.updatedBlog.likes + 1,
    };
    await updateBlog(data.id, likedBlog, token);
    const blogs = await getAllBlogs();
    const updatedBlogs = blogs.map((blog) =>
      blog.id !== data.updatedBlog.id ? blog : likedBlog
    );
    dispatch(setBlogs(updatedBlogs));
  };
};

export const deleteBlog = (id, token) => {
  return async (dispatch) => {
    await removeBlog(id, token);
    const blogs = await getAllBlogs();
    const filteredBlogs = blogs.filter((blog) => blog.id !== id);
    dispatch(setBlogs(filteredBlogs));
  };
};

export default blogsSlice.reducer;
