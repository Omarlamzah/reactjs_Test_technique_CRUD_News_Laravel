import axios from "axios";
import getCSRFToken from "../../utlis/csrf";
import { backendUrl } from "../../globalvar";

export const findcategoriesApi =async (name)=>{
     await getCSRFToken();
    const response = await axios.get(`${backendUrl}api/findcategories/${name}`);
    return response;
    }
