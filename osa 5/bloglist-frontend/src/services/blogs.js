import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  try {
    const res = await axios(baseUrl);
    // console.log(res.data);
    return { data: res.data, status: res.status };
  } catch (error) {
    alert(error);
    return;
  }
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  try {
    const res = await axios.post(baseUrl, newObject, config);
    // console.log(token);
    return { data: res.data, status: res.status };
  } catch (error) {
    alert(error);
    return;
  }
};

const exportedObject = {
  getAll,
  create,
  setToken,
};

export default exportedObject;
