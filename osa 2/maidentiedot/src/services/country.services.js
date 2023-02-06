import axios from "axios";

const baseUrl = "https://restcountries.com/v3.1";

const getAll = () => {
  const request = axios.get(`${baseUrl}/all`);
  return request.then((response) => response.data);
};

//Not used atm
// const getCountryByName = (name) => {
//   const request = axios.get(`${baseUrl}/name/${name}`);
//   return request.then((response) => response.data);
// };

const exportedObject = {
  getAll,
  // getCountryByName,
};

export default exportedObject;
