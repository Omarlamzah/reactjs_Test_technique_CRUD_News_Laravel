import axios from "axios";
import { backendUrl } from "../../globalvar";
import { getCookie } from "../../utlis/cookies";

export const deleteNewsApi =async (id)=>{
    const token = getCookie("token");
    if (token) {
      axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` };
      axios.defaults.withCredentials=true  
    
    }
    const response = await axios.delete(`${backendUrl}api/deletenews/${id}`);
    return response;
    }
