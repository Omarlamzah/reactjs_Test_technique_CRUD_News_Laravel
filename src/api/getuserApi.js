import axios from "axios";
import { backendUrl } from "../globalvar";
import { getCookie } from "../utlis/cookies";
 

export const getuserApi =async ()=>{
    
const token = getCookie("token");
if (token) {

  axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` };
  axios.defaults.withCredentials=true
}
const response = await axios.get(`${backendUrl}api/user`);
return response;
}