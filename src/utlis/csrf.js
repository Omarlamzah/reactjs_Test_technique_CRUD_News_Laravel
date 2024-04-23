import axios from "axios";
import { backendUrl } from "../globalvar";

const getCSRFToken = async () => {
  try {

    axios.defaults.withCredentials = true;
     axios.defaults.withXSRFToken = true;
     const response = await axios.get(`${backendUrl}sanctum/csrf-cookie`);
    console.log(response);
    console.log("response fro crf token");


   } catch (error) {
    
    console.error('Error fetching CSRF token:', error);
    throw error; // You might want to handle the error in the calling code
  }
};

export default getCSRFToken;
