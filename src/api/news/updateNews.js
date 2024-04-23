import axios from "axios";
import { backendUrl } from "../../globalvar";
import { getCookie } from "../../utlis/cookies";

export const updateNewsApi = async ({ id, news }) => {
  try {
    const token = getCookie("token");
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axios.defaults.withCredentials = true;
    }

    const response = await axios.put(`${backendUrl}api/updatenews/${id}`, news);
    return response.data; // Return response data
  } catch (error) {
    // Handle error
    console.error("Error updating news:", error);
    throw error; // Rethrow error to be handled by caller
  }
};
