import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  const object = { content, votes: 0 };
  const response = await axios.post(baseUrl, object);
  return response.data;
};

const voteAnecdote = async (data, time) => {
  console.log("data: ", data);

  const id = data.id;

  const response = await axios.put(`${baseUrl}/${id}`, data);
  return response.data;
};

const exportedObject = {
  getAll,
  createNew,
  voteAnecdote,
};

export default exportedObject;
