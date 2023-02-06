import axios from "axios";

const baseUrl = process.env.REACT_APP_REST_COUNTRIES_URL;

const getAll = () => {
  const request = axios.get(`${baseUrl}/all`);
  return request.then((response) => response.data);
};

const exportedObject = {
  getAll,
};

export default exportedObject;
