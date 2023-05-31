import axios from "axios";
const baseUrl = "/api/users";

export const getAllUsers = async () => {
  try {
    const response = await axios.get(baseUrl);
    console.log("response.data: ", response.data);
    return response.data;
  } catch (error) {
    console.log("error", error.response.status);
    throw error.response.data;
  }
};
