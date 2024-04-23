import axios from "axios";
import { getCookie } from "../../utlis/cookies";
import getCSRFToken from "../../utlis/csrf";
import { backendUrl } from "../../globalvar";

 
export const createNewApi = async (news)=>{
    console.log(news)
    const token = getCookie("token");
if (token) {

  axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` };
  axios.defaults.withCredentials=true
}
    await getCSRFToken();
    const response = await axios.post(`${backendUrl}api/createnews`, news);

    return response;
    }
