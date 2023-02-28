import axios from "axios";
const baseUrl = "/api/login";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const login = async (credentials) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, credentials, config);
  return response.data;
};

const exportedObject = {
  login,
  setToken,
};

export default exportedObject;
