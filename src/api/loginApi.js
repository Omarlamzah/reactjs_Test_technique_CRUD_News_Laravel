import axios from "axios";
import getCSRFToken from "../utlis/csrf.js";
 import { backendUrl } from "../globalvar.js";

export const loginApi = async (credentials)=>{
    await getCSRFToken();
    const response = await axios.post(`${backendUrl}api/login`, credentials);
      
    return  response;
}
