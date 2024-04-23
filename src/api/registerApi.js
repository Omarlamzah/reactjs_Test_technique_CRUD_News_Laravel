import axios from "axios";
import { backendUrl } from "../globalvar";
import getCSRFToken from "../utlis/csrf";

export const registerApi =async (userData)=>{
     await getCSRFToken();
    const response = await axios.post(`${backendUrl}api/register`, userData);
    return response;
    }
