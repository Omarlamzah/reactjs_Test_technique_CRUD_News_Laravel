import axios from "axios";

const setBearerToken = (token) => {
  

   axios.defaults.withCredentials=true

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
 
  };
  

export default setBearerToken