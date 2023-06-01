import axios from "axios";
const baseUrl = "/api/blogs";

export const getAllBlogs = async () => {
  try {
    const response = await axios.get(baseUrl);
    console.log("response.data: ", response.data);
    return response.data;
  } catch (error) {
    console.log("error", error.response.status);
    throw error.response.data;
  }
};

export const createNewBlog = async (newObject, token) => {
  const newToken = `Bearer ${token}`;
  try {
    const config = {
      headers: { Authorization: newToken },
    };

    const response = await axios.post(baseUrl, newObject, config);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createNewComment = async (id, newComment) => {
  const url = `${baseUrl}/${id}/comments`;
  try {
    const response = await axios.post(url, newComment);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateBlog = async (id, newObject, token) => {
  const newToken = `Bearer ${token}`;
  const config = {
    headers: { Authorization: newToken },
  };
  const response = await axios.put(`${baseUrl}/${id}`, newObject, config);
  return response.data;
};

export const removeBlog = async (id, token) => {
  const newToken = `Bearer ${token}`;
  const config = {
    headers: { Authorization: newToken },
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};
